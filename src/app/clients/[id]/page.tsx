"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Crown, Mail, Phone, Calendar, MapPin, DollarSign, Clock } from "lucide-react";
import { api, Client } from "@/lib/api";

const SEGMENT_COLORS: Record<string, string> = {
    VIP: "#c99545",
    "At-Risk": "#dc2626",
    Lapsed: "#ea580c",
    Regular: "#3b82f6",
    New: "#22c55e",
    "New-High-Potential": "#8b5cf6",
};

export default function ClientDetailPage() {
    const params = useParams();
    const [client, setClient] = useState<Client | null>(null);
    const [classification, setClassification] = useState<{ segment: string; confidence: number } | null>(null);
    const [loading, setLoading] = useState(true);
    const [classifying, setClassifying] = useState(false);

    useEffect(() => {
        const fetchClient = async () => {
            try {
                const clients = await api.getClients();
                const found = clients.find(c => c.id === params.id);
                if (found) setClient(found);
            } finally {
                setLoading(false);
            }
        };
        fetchClient();
    }, [params.id]);

    const handleClassify = async () => {
        if (!client) return;
        setClassifying(true);
        try {
            const result = await api.classifyClient(client.id);
            setClassification(result.classification);
        } finally {
            setClassifying(false);
        }
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-8 w-48" />
                <div className="grid grid-cols-3 gap-6">
                    <Skeleton className="h-64 col-span-2" />
                    <Skeleton className="h-64" />
                </div>
            </div>
        );
    }

    if (!client) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">Client not found</p>
                <Link href="/clients" className="text-purple-400 hover:underline mt-2 block">
                    ← Back to clients
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Back Button */}
            <Link href="/clients" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Back to clients</span>
            </Link>

            {/* Header */}
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-xl font-bold
            ${client.segment === 'VIP' ? 'bg-amber-500/20 text-amber-400' : 'bg-[#1c1c26] text-gray-300'}
          `}>
                        {client.first_name[0]}{client.last_name[0]}
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold flex items-center gap-2">
                            {client.first_name} {client.last_name}
                            {client.segment === 'VIP' && <Crown className="w-5 h-5 text-amber-400" />}
                        </h1>
                        <p className="text-gray-500">{client.email}</p>
                    </div>
                </div>
                {client.segment && (
                    <Badge className="text-sm px-4 py-1 text-white border-0" style={{ background: SEGMENT_COLORS[client.segment] }}>
                        {client.segment}
                    </Badge>
                )}
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-3 gap-6">
                {/* Main Info */}
                <Card className="col-span-2 bg-[#15151c] border-gray-800">
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">Client Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-4 bg-[#1c1c26] rounded-lg">
                                <Mail className="w-5 h-5 text-gray-500" />
                                <div>
                                    <p className="text-xs text-gray-500">Email</p>
                                    <p className="text-sm">{client.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-[#1c1c26] rounded-lg">
                                <Phone className="w-5 h-5 text-gray-500" />
                                <div>
                                    <p className="text-xs text-gray-500">Phone</p>
                                    <p className="text-sm">{client.phone || 'Not provided'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-[#1c1c26] rounded-lg">
                                <Calendar className="w-5 h-5 text-gray-500" />
                                <div>
                                    <p className="text-xs text-gray-500">Birthday</p>
                                    <p className="text-sm">{client.birth_date || 'Not provided'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-[#1c1c26] rounded-lg">
                                <MapPin className="w-5 h-5 text-gray-500" />
                                <div>
                                    <p className="text-xs text-gray-500">Location</p>
                                    <p className="text-sm">{client.location_id}</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Stats */}
                <div className="space-y-4">
                    <Card className="bg-[#15151c] border-gray-800">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-3 mb-2">
                                <DollarSign className="w-5 h-5 text-emerald-400" />
                                <p className="text-xs text-gray-500 uppercase tracking-wide">Lifetime Spend</p>
                            </div>
                            <p className="text-3xl font-bold text-emerald-400">${client.lifetime_spend.toLocaleString()}</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-[#15151c] border-gray-800">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-3 mb-2">
                                <Clock className="w-5 h-5 text-purple-400" />
                                <p className="text-xs text-gray-500 uppercase tracking-wide">Total Visits</p>
                            </div>
                            <p className="text-3xl font-bold">{client.total_visits}</p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* AI Classification */}
            <Card className="bg-[#15151c] border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-sm font-medium">AI Classification</CardTitle>
                    <Button
                        onClick={handleClassify}
                        disabled={classifying}
                        className="bg-purple-600 hover:bg-purple-700"
                        size="sm"
                    >
                        {classifying ? 'Classifying...' : 'Run Classification'}
                    </Button>
                </CardHeader>
                <CardContent>
                    {classification ? (
                        <div className="flex items-center gap-4">
                            <Badge className="text-sm px-4 py-1 text-white border-0" style={{ background: SEGMENT_COLORS[classification.segment] }}>
                                {classification.segment}
                            </Badge>
                            <span className="text-sm text-gray-500">
                                Confidence: {Math.round(classification.confidence * 100)}%
                            </span>
                        </div>
                    ) : (
                        <p className="text-gray-500 text-sm">Click &quot;Run Classification&quot; to analyze this client with AI</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
