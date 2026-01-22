"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Crown, ExternalLink } from "lucide-react";
import { api, Client } from "@/lib/api";

const SEGMENT_COLORS: Record<string, string> = {
    VIP: "#c99545",
    "At-Risk": "#dc2626",
    Lapsed: "#ea580c",
    Regular: "#3b82f6",
    New: "#22c55e",
    "New-High-Potential": "#8b5cf6",
};

export default function ClientsPage() {
    const [clients, setClients] = useState<Client[]>([]);
    const [filtered, setFiltered] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [segmentFilter, setSegmentFilter] = useState<string | null>(null);

    useEffect(() => {
        api.getClients().then((data) => {
            setClients(data);
            setFiltered(data);
        }).finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        let result = clients;

        if (search) {
            const s = search.toLowerCase();
            result = result.filter(c =>
                c.first_name.toLowerCase().includes(s) ||
                c.last_name.toLowerCase().includes(s) ||
                c.email.toLowerCase().includes(s)
            );
        }

        if (segmentFilter) {
            result = result.filter(c => c.segment === segmentFilter);
        }

        setFiltered(result);
    }, [search, segmentFilter, clients]);

    const segments = [...new Set(clients.map(c => c.segment).filter(Boolean))];

    if (loading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-10 w-64" />
                <Skeleton className="h-96 w-full" />
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Clients</h1>
                    <p className="text-sm text-gray-500 mt-1">{filtered.length} of {clients.length} clients</p>
                </div>
            </div>

            {/* Search & Filters */}
            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <Input
                        placeholder="Search by name or email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10 bg-[#15151c] border-gray-800 focus:border-purple-500"
                    />
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setSegmentFilter(null)}
                        className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${!segmentFilter ? 'bg-purple-500 text-white' : 'bg-[#1c1c26] text-gray-400 hover:text-white'
                            }`}
                    >
                        All
                    </button>
                    {segments.map((seg) => (
                        <button
                            key={seg}
                            onClick={() => setSegmentFilter(seg === segmentFilter ? null : seg!)}
                            className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${segmentFilter === seg ? 'bg-purple-500 text-white' : 'bg-[#1c1c26] text-gray-400 hover:text-white'
                                }`}
                        >
                            {seg}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <Card className="bg-[#15151c] border-gray-800">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-gray-800 hover:bg-transparent">
                                <TableHead className="text-gray-500 text-xs">Name</TableHead>
                                <TableHead className="text-gray-500 text-xs">Email</TableHead>
                                <TableHead className="text-gray-500 text-xs text-center">Visits</TableHead>
                                <TableHead className="text-gray-500 text-xs text-right">Lifetime Spend</TableHead>
                                <TableHead className="text-gray-500 text-xs">Segment</TableHead>
                                <TableHead className="text-gray-500 text-xs w-10"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filtered.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-12 text-gray-500">
                                        No clients found matching your criteria
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filtered.map((client) => (
                                    <TableRow
                                        key={client.id}
                                        className={`border-gray-800 transition-colors cursor-pointer
                      ${client.segment === 'VIP' ? 'bg-amber-500/5 hover:bg-amber-500/10' : 'hover:bg-[#1c1c26]'}
                    `}
                                    >
                                        <TableCell className="py-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium
                          ${client.segment === 'VIP' ? 'bg-amber-500/20 text-amber-400' : 'bg-[#1c1c26] text-gray-300'}
                        `}>
                                                    {client.first_name[0]}{client.last_name[0]}
                                                </div>
                                                <span className="font-medium flex items-center gap-1.5">
                                                    {client.first_name} {client.last_name}
                                                    {client.segment === 'VIP' && <Crown className="w-3 h-3 text-amber-400" />}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-gray-400 text-sm">{client.email}</TableCell>
                                        <TableCell className="text-center font-medium">{client.total_visits}</TableCell>
                                        <TableCell className="text-right">
                                            <span className={client.lifetime_spend > 5000 ? 'text-emerald-400' : 'text-gray-300'}>
                                                ${client.lifetime_spend.toLocaleString()}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            {client.segment && (
                                                <Badge className="text-[10px] text-white border-0" style={{ background: SEGMENT_COLORS[client.segment] }}>
                                                    {client.segment}
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Link href={`/clients/${client.id}`} className="text-gray-500 hover:text-purple-400 transition-colors">
                                                <ExternalLink className="w-4 h-4" />
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
