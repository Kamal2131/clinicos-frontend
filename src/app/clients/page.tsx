"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { api, Client } from "@/lib/api";

const segmentColors: Record<string, string> = {
    VIP: "bg-amber-500",
    "At-Risk": "bg-red-500",
    Lapsed: "bg-orange-500",
    Regular: "bg-blue-500",
    New: "bg-emerald-500",
    "New-High-Potential": "bg-purple-500",
};

export default function ClientsPage() {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.getClients().then(setClients).finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="text-gray-400">Loading clients...</div>;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold">Clients</h1>
                <p className="text-sm text-gray-500 mt-1">{clients.length} total clients</p>
            </div>

            <Card className="bg-[#15151c] border-gray-800">
                <CardHeader>
                    <CardTitle className="text-sm font-medium">All Clients</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="border-gray-800">
                                <TableHead className="text-gray-500">Name</TableHead>
                                <TableHead className="text-gray-500">Email</TableHead>
                                <TableHead className="text-gray-500 text-center">Visits</TableHead>
                                <TableHead className="text-gray-500 text-right">Lifetime Spend</TableHead>
                                <TableHead className="text-gray-500">Segment</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {clients.map((client) => (
                                <TableRow key={client.id} className="border-gray-800 hover:bg-[#1c1c26]">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-md bg-[#1c1c26] flex items-center justify-center text-xs font-medium">
                                                {client.first_name[0]}{client.last_name[0]}
                                            </div>
                                            <span className="font-medium">{client.first_name} {client.last_name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-gray-400">{client.email}</TableCell>
                                    <TableCell className="text-center">{client.total_visits}</TableCell>
                                    <TableCell className="text-right text-emerald-400">${client.lifetime_spend.toLocaleString()}</TableCell>
                                    <TableCell>
                                        {client.segment && (
                                            <Badge className={`${segmentColors[client.segment]} text-white text-[10px] border-0`}>
                                                {client.segment}
                                            </Badge>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
