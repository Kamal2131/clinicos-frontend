"use client";

import { useEffect, useState } from "react";
import { api, SegmentSummary, WorkflowResult } from "@/lib/api";
import { Users, TrendingUp, Wallet, Brain, Play, RefreshCw, Layers, Zap } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

export default function DashboardPage() {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<SegmentSummary | null>(null);
    const [recentWorkflows, setRecentWorkflows] = useState<WorkflowResult[]>([]);
    const [runningWorkflow, setRunningWorkflow] = useState<string | null>(null);

    // Mock trend data for charts (since the API doesn't return historical trends yet)
    const chartData = [
        { name: "Mon", clients: 140, revenue: 2400 },
        { name: "Tue", clients: 160, revenue: 1398 },
        { name: "Wed", clients: 200, revenue: 9800 },
        { name: "Thu", clients: 278, revenue: 3908 },
        { name: "Fri", clients: 189, revenue: 4800 },
        { name: "Sat", clients: 239, revenue: 3800 },
        { name: "Sun", clients: 349, revenue: 4300 },
    ];

    useEffect(() => {
        async function fetchData() {
            try {
                const [segmentData, workflowData] = await Promise.all([
                    api.getSegmentSummary(),
                    api.getWorkflows() // In a real app, this would be api.getWorkflowHistory
                ]);
                setStats(segmentData);
                setLoading(false);
            } catch (err) {
                console.error("Failed to load dashboard data", err);
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const runWorkflow = async (id: string) => {
        setRunningWorkflow(id);
        try {
            await api.runWorkflow(id);
            // alert("Workflow started successfully!");
        } catch (error) {
            console.error(error);
        } finally {
            setTimeout(() => setRunningWorkflow(null), 1000);
        }
    };

    if (loading) {
        return (
            <div className="flex h-[80vh] items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-t-2 border-primary rounded-full animate-spin" />
                    <p className="text-slate-400 animate-pulse text-sm">Synchronizing with ClinicOS...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                        Dashboard
                    </h1>
                    <p className="text-slate-400 mt-1">
                        Welcome back, here's what's happening today.
                    </p>
                </div>
                <button
                    onClick={() => window.location.reload()}
                    className="p-2 glass-panel rounded-lg hover:bg-white/5 transition-colors text-slate-400 hover:text-white"
                >
                    <RefreshCw className="w-5 h-5" />
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard
                    title="Total Clients"
                    value={stats?.total_clients.toLocaleString() || "0"}
                    trend="+12% from last month"
                    icon={Users}
                    color="blue"
                />
                <StatsCard
                    title="AI Segments"
                    value={Object.keys(stats?.segment_counts || {}).length.toString()}
                    trend="Active classification"
                    icon={Brain}
                    color="purple"
                />
                <StatsCard
                    title="Revenue (Est)"
                    value="$42,500"
                    trend="+8% from last week"
                    icon={Wallet}
                    color="emerald"
                />
                <StatsCard
                    title="Active Journeys"
                    value="12"
                    trend="4 campaigns running"
                    icon={Layers}
                    color="amber"
                />
            </div>

            {/* Main Content Split */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Main Chart Section */}
                <div className="lg:col-span-2 glass-card p-6 h-[400px]">
                    <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-blue-400" />
                        Client Growth
                    </h2>
                    <ResponsiveContainer width="100%" height="85%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="colorClients" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis
                                dataKey="name"
                                stroke="#64748b"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#64748b"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `${value}`}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1e293b',
                                    border: '1px solid #334155',
                                    borderRadius: '8px'
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="clients"
                                stroke="#38bdf8"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorClients)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Quick Actions / Workflows */}
                <div className="glass-card p-6">
                    <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-amber-400" />
                        Quick Actions
                    </h2>
                    <div className="space-y-4">
                        <WorkflowButton
                            id="client_sync"
                            label="Sync Mindbody Clients"
                            description="Fetch new clients & classify with AI"
                            isRunning={runningWorkflow === "client_sync"}
                            onClick={() => runWorkflow("client_sync")}
                        />
                        <WorkflowButton
                            id="reengagement"
                            label="Run Re-engagement"
                            description="Target 'At Risk' clients with offers"
                            isRunning={runningWorkflow === "reengagement"}
                            onClick={() => runWorkflow("reengagement")}
                        />
                        <WorkflowButton
                            id="birthday"
                            label="Process Birthdays"
                            description="Send birthday offers for this month"
                            isRunning={runningWorkflow === "birthday"}
                            onClick={() => runWorkflow("birthday")}
                        />
                    </div>
                </div>

            </div>

            {/* Segments Display */}
            <div className="glass-card p-6">
                <h2 className="text-lg font-semibold mb-4">Live Client Segments</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats && Object.entries(stats.segment_counts).map(([segment, count]) => (
                        <div key={segment} className="bg-white/5 border border-white/5 rounded-lg p-4 flex items-center justify-between">
                            <span className="font-medium text-slate-300 capitalize">{segment.replace('_', ' ')}</span>
                            <span className="bg-white/10 px-2 py-0.5 rounded text-sm font-bold">{count}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Components

function StatsCard({ title, value, trend, icon: Icon, color }: any) {
    const colorClasses: any = {
        blue: "text-blue-400 bg-blue-500/10",
        purple: "text-purple-400 bg-purple-500/10",
        emerald: "text-emerald-400 bg-emerald-500/10",
        amber: "text-amber-400 bg-amber-500/10",
    };

    return (
        <div className="glass-card p-6 relative overflow-hidden group">
            <div className={`absolute top-0 right-0 p-4 opacity-50 transition-transform group-hover:scale-110 ${colorClasses[color].split(" ")[0]}`}>
                <Icon className="w-8 h-8 opacity-20" />
            </div>
            <div>
                <p className="text-sm font-medium text-slate-400">{title}</p>
                <p className="text-2xl font-bold mt-2 text-white">{value}</p>
                <div className="flex items-center gap-1.5 mt-2">
                    <div className={`p-0.5 rounded-full ${colorClasses[color]}`}>
                        <TrendingUp className="w-3 h-3" />
                    </div>
                    <span className="text-[10px] text-slate-400">{trend}</span>
                </div>
            </div>
            {/* Glow effect */}
            <div className={`absolute -bottom-4 -right-4 w-24 h-24 rounded-full blur-3xl opacity-20 pointer-events-none ${colorClasses[color].split(" ")[1].replace("/10", "/30")}`} />
        </div>
    );
}

function WorkflowButton({ label, description, isRunning, onClick }: any) {
    return (
        <button
            onClick={onClick}
            disabled={isRunning}
            className={`
        w-full text-left p-3 rounded-xl border transition-all duration-200 group relative overflow-hidden
        ${isRunning
                    ? 'bg-blue-600/20 border-blue-500'
                    : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'}
      `}
        >
            <div className="flex items-start justify-between relative z-10">
                <div>
                    <p className="font-medium text-sm text-slate-200 group-hover:text-white transition-colors">{label}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{description}</p>
                </div>
                <div className={`p-1.5 rounded-lg transition-colors ${isRunning ? 'bg-blue-500 text-white animate-pulse' : 'bg-white/5 text-slate-400 group-hover:bg-blue-500 group-hover:text-white'}`}>
                    {isRunning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                </div>
            </div>
        </button>
    );
}
