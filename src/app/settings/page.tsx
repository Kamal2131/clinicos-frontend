"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Settings as SettingsIcon, CheckCircle, XCircle, Server, Database, Mail, Brain, RefreshCw } from "lucide-react";
import { api } from "@/lib/api";

interface SystemInfo {
    demo_mode: boolean;
    integrations: {
        mindbody: string;
        mailchimp: string;
        openai: string;
        supabase: string;
    };
}

export default function SettingsPage() {
    const [info, setInfo] = useState<SystemInfo | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.getInfo().then(setInfo).finally(() => setLoading(false));
    }, []);

    const integrations = [
        { key: "mindbody", label: "Mindbody", icon: Server, description: "Client & appointment data" },
        { key: "mailchimp", label: "Mailchimp", icon: Mail, description: "Email marketing automation" },
        { key: "openai", label: "OpenAI", icon: Brain, description: "AI classification & copy generation" },
        { key: "supabase", label: "Supabase", icon: Database, description: "Data persistence" },
    ];

    if (loading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-8 w-48" />
                <div className="grid grid-cols-2 gap-6">
                    <Skeleton className="h-32" />
                    <Skeleton className="h-32" />
                    <Skeleton className="h-32" />
                    <Skeleton className="h-32" />
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
                    <SettingsIcon className="w-6 h-6 text-gray-400" />
                    Settings
                </h1>
                <p className="text-sm text-gray-500 mt-1">System configuration & integrations</p>
            </div>

            {/* System Status */}
            <Card className="bg-[#15151c] border-gray-800">
                <CardHeader>
                    <CardTitle className="text-sm font-medium">System Status</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-sm">System Online</span>
                        </div>
                        {info?.demo_mode && (
                            <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/50">Demo Mode</Badge>
                        )}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        API: {process.env.NEXT_PUBLIC_API_URL}
                    </p>
                </CardContent>
            </Card>

            {/* Integrations & API Keys */}
            <div>
                <h2 className="text-sm font-medium mb-4">Integrations & Configuration</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {integrations.map((integration) => {
                        const Icon = integration.icon;
                        const status = info?.integrations?.[integration.key as keyof typeof info.integrations] || 'unknown';
                        const isConnected = status === 'connected';
                        const isDemo = status === 'demo';

                        return (
                            <Card key={integration.key} className="bg-[#15151c] border-gray-800">
                                <CardContent className="pt-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isConnected ? 'bg-emerald-500/20' : isDemo ? 'bg-amber-500/20' : 'bg-gray-500/20'
                                                }`}>
                                                <Icon className={`w-5 h-5 ${isConnected ? 'text-emerald-400' : isDemo ? 'text-amber-400' : 'text-gray-400'
                                                    }`} />
                                            </div>
                                            <div>
                                                <p className="font-medium">{integration.label}</p>
                                                <p className="text-xs text-gray-500">{integration.description}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            {isConnected ? (
                                                <Badge variant="outline" className="text-emerald-400 border-emerald-500/20 bg-emerald-500/10">Connected</Badge>
                                            ) : isDemo ? (
                                                <Badge variant="outline" className="text-amber-400 border-amber-500/20 bg-amber-500/10">Demo Mode</Badge>
                                            ) : (
                                                <Badge variant="outline" className="text-gray-400 border-gray-500/20">Inactive</Badge>
                                            )}
                                        </div>
                                    </div>

                                    {/* Mock API Input for Future Clients */}
                                    <div className="space-y-2 pt-2 border-t border-gray-800/50">
                                        <label className="text-[10px] text-gray-500 uppercase tracking-wider">API Configuration</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="password"
                                                value={isConnected ? "************************" : ""}
                                                placeholder={`Enter ${integration.label} API Key`}
                                                disabled={true} // Disabled for demo security
                                                className="flex-1 bg-[#0e0e12] border border-gray-800 rounded text-xs px-2 py-1.5 text-gray-400"
                                            />
                                            <button className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 rounded transition-colors">
                                                Update
                                            </button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>

            {/* Environment */}
            <Card className="bg-[#15151c] border-gray-800">
                <CardHeader>
                    <CardTitle className="text-sm font-medium">Environment</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between py-2 border-b border-gray-800">
                            <span className="text-gray-500">API URL</span>
                            <code className="text-xs bg-[#1c1c26] px-2 py-1 rounded">{process.env.NEXT_PUBLIC_API_URL}</code>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-800">
                            <span className="text-gray-500">Demo Mode</span>
                            <span>{info?.demo_mode ? 'Enabled' : 'Disabled'}</span>
                        </div>
                        <div className="flex justify-between py-2">
                            <span className="text-gray-500">Version</span>
                            <span>1.0.0</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
