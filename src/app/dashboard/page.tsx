"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { TrendingUp, TrendingDown, Users, Crown, AlertTriangle, Clock } from "lucide-react";
import { api, Client } from "@/lib/api";

interface DashboardData {
    totalClients: number;
    segments: Record<string, number>;
    demoMode: boolean;
    clients: Client[];
}

const SEGMENT_COLORS: Record<string, string> = {
    VIP: "#c99545",
    "At-Risk": "#dc2626",
    Lapsed: "#ea580c",
    Regular: "#3b82f6",
    New: "#22c55e",
    "New-High-Potential": "#8b5cf6",
};

// Mock trend data
const trendData = [
    { name: "Mon", clients: 8 },
    { name: "Tue", clients: 9 },
    { name: "Wed", clients: 8 },
    { name: "Thu", clients: 10 },
    { name: "Fri", clients: 10 },
];

export default function Dashboard() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [info, clients, segments] = await Promise.all([
                    api.getInfo(),
                    api.getClients(10),
                    api.getSegmentSummary(),
                ]);

                setData({
                    totalClients: segments.total_clients,
                    segments: segments.segment_counts,
                    demoMode: info.demo_mode,
                    clients,
                });
                setLastUpdated(new Date());
            } catch (err) {
                setError("Failed to connect to backend");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="space-y-8">
                <div className="flex justify-between">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-6 w-24" />
                </div>
                <div className="grid grid-cols-12 gap-5">
                    <Skeleton className="col-span-5 h-40" />
                    <Skeleton className="col-span-4 h-40" />
                    <Skeleton className="col-span-3 h-40" />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 bg-red-500/10 border border-red-500/50 rounded-lg">
                <p className="text-red-400">{error}</p>
                <p className="text-sm text-gray-500 mt-2">API URL: {process.env.NEXT_PUBLIC_API_URL}</p>
            </div>
        );
    }

    const pieData = Object.entries(data?.segments || {}).map(([name, value]) => ({ name, value }));

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
                    <p className="text-sm text-gray-500 mt-1">Multi-location clinic overview</p>
                </div>
                <div className="flex items-center gap-3">
                    {data?.demoMode && (
                        <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/50">Demo Mode</Badge>
                    )}
                    {lastUpdated && (
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Updated {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    )}
                </div>
            </div>

            {/* Stats Grid - Asymmetric */}
            <div className="grid grid-cols-12 gap-5">
                {/* Total Clients - Large */}
                <Card className="col-span-5 bg-[#15151c] border-gray-800 hover:border-gray-700 transition-colors">
                    <CardContent className="pt-6 pb-8">
                        <div className="flex items-center gap-2 mb-3">
                            <Users className="w-4 h-4 text-gray-500" />
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Total Clients</p>
                        </div>
                        <div className="flex items-baseline gap-3">
                            <span className="text-6xl font-bold tracking-tight">{data?.totalClients || 0}</span>
                            <span className="flex items-center gap-1 text-emerald-400 text-sm">
                                <TrendingUp className="w-4 h-4" /> +2 this week
                            </span>
                        </div>
                    </CardContent>
                </Card>

                {/* VIP - Special */}
                <Card className="col-span-4 bg-[#15151c] border-amber-500/30 hover:border-amber-500/50 transition-colors shadow-lg shadow-amber-500/5">
                    <CardContent className="pt-6 pb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <Crown className="w-4 h-4 text-amber-400" />
                            <p className="text-xs text-amber-400 uppercase tracking-wide">VIP Clients</p>
                        </div>
                        <div className="text-5xl font-bold tracking-tight">{data?.segments?.VIP || 0}</div>
                        <p className="text-xs text-gray-500 mt-3">
                            Top: {data?.clients.find(c => c.segment === 'VIP')?.first_name || 'N/A'}
                        </p>
                    </CardContent>
                </Card>

                {/* At Risk - Smaller */}
                <Card className="col-span-3 bg-[#15151c] border-gray-800 hover:border-red-500/30 transition-colors">
                    <CardContent className="pt-5 pb-5">
                        <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="w-4 h-4 text-red-400" />
                            <p className="text-xs text-gray-500 uppercase tracking-wide">At Risk</p>
                        </div>
                        <div className="text-4xl font-bold">{data?.segments?.["At-Risk"] || 0}</div>
                        <p className="text-xs text-red-400 mt-2">Needs attention</p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-12 gap-5">
                {/* Segment Pie Chart */}
                <Card className="col-span-4 bg-[#15151c] border-gray-800">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Segment Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-48">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={40}
                                        outerRadius={70}
                                        paddingAngle={2}
                                        dataKey="value"
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={SEGMENT_COLORS[entry.name] || "#6b7280"} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {pieData.map((entry) => (
                                <div key={entry.name} className="flex items-center gap-1.5 text-xs">
                                    <div className="w-2 h-2 rounded-full" style={{ background: SEGMENT_COLORS[entry.name] }} />
                                    <span className="text-gray-400">{entry.name}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Trend Chart */}
                <Card className="col-span-5 bg-[#15151c] border-gray-800">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Client Trend (This Week)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-48">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={trendData}>
                                    <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip
                                        contentStyle={{ background: '#1c1c26', border: '1px solid #374151', borderRadius: '8px' }}
                                        labelStyle={{ color: '#9ca3af' }}
                                    />
                                    <Line type="monotone" dataKey="clients" stroke="#8b5cf6" strokeWidth={2} dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Stats */}
                <div className="col-span-3 space-y-4">
                    <Card className="bg-[#15151c] border-gray-800">
                        <CardContent className="py-4">
                            <p className="text-xs text-gray-500 uppercase tracking-wide">New This Month</p>
                            <div className="flex items-baseline gap-2 mt-1">
                                <span className="text-2xl font-bold">{data?.segments?.New || 0}</span>
                                <span className="text-xs text-emerald-400">+18%</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-[#15151c] border-gray-800">
                        <CardContent className="py-4">
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Lapsed (120+ days)</p>
                            <div className="flex items-baseline gap-2 mt-1">
                                <span className="text-2xl font-bold">{data?.segments?.Lapsed || 0}</span>
                                <span className="text-xs text-orange-400">Win back</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-[#15151c] border-gray-800">
                        <CardContent className="py-4">
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Regular</p>
                            <div className="flex items-baseline gap-2 mt-1">
                                <span className="text-2xl font-bold">{data?.segments?.Regular || 0}</span>
                                <span className="text-xs text-gray-500">Stable</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Recent Clients */}
            <Card className="bg-[#15151c] border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-sm font-medium">Recent Clients</CardTitle>
                    <span className="text-xs text-gray-500">Last 5</span>
                </CardHeader>
                <CardContent className="space-y-1">
                    {data?.clients.slice(0, 5).map((client, i) => (
                        <div
                            key={client.id}
                            className={`flex items-center justify-between py-3 px-3 rounded-lg transition-colors hover:bg-[#1c1c26] cursor-pointer
                ${i === 0 ? 'bg-[#1c1c26]/50' : ''}
              `}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-medium
                  ${client.segment === 'VIP' ? 'bg-amber-500/20 text-amber-400' : 'bg-[#1c1c26] text-gray-300'}
                `}>
                                    {client.first_name[0]}{client.last_name[0]}
                                </div>
                                <div>
                                    <p className="text-sm font-medium flex items-center gap-1.5">
                                        {client.first_name} {client.last_name}
                                        {client.segment === 'VIP' && <Crown className="w-3 h-3 text-amber-400" />}
                                    </p>
                                    <p className="text-xs text-gray-500">{client.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-gray-400">${client.lifetime_spend.toLocaleString()}</span>
                                {client.segment && (
                                    <Badge
                                        className="text-[10px] text-white border-0"
                                        style={{ background: SEGMENT_COLORS[client.segment] }}
                                    >
                                        {client.segment}
                                    </Badge>
                                )}
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
