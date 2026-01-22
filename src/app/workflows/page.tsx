"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Zap, Play, CheckCircle, XCircle, Clock, Users, Mail, Gift } from "lucide-react";
import { api, WorkflowResult } from "@/lib/api";

interface Workflow {
    id: string;
    name: string;
    description: string;
}

const workflowIcons: Record<string, typeof Zap> = {
    client_sync: Users,
    reengagement: Mail,
    birthday: Gift,
};

export default function WorkflowsPage() {
    const [workflows, setWorkflows] = useState<Workflow[]>([]);
    const [running, setRunning] = useState<string | null>(null);
    const [result, setResult] = useState<WorkflowResult | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.getWorkflows()
            .then((data) => setWorkflows(data.workflows || []))
            .finally(() => setLoading(false));
    }, []);

    const runWorkflow = async (id: string) => {
        setRunning(id);
        setResult(null);
        try {
            const res = await api.runWorkflow(id);
            setResult(res);
        } finally {
            setRunning(null);
        }
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-8 w-48" />
                <div className="grid grid-cols-3 gap-5">
                    <Skeleton className="h-48" />
                    <Skeleton className="h-48" />
                    <Skeleton className="h-48" />
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
                    <Zap className="w-6 h-6 text-purple-400" />
                    Workflows
                </h1>
                <p className="text-sm text-gray-500 mt-1">Automation workflows for client management</p>
            </div>

            {/* Workflow Cards */}
            <div className="grid grid-cols-3 gap-5">
                {workflows.map((workflow) => {
                    const Icon = workflowIcons[workflow.id] || Zap;
                    const isRunning = running === workflow.id;
                    return (
                        <Card key={workflow.id} className="bg-[#15151c] border-gray-800 hover:border-purple-500/30 transition-colors">
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-3 text-base">
                                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                                        <Icon className="w-5 h-5 text-purple-400" />
                                    </div>
                                    <span>{workflow.name}</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-gray-400">{workflow.description}</p>
                                <Button
                                    onClick={() => runWorkflow(workflow.id)}
                                    disabled={isRunning}
                                    className="w-full bg-purple-600 hover:bg-purple-700"
                                >
                                    {isRunning ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                                            Running...
                                        </>
                                    ) : (
                                        <>
                                            <Play className="w-4 h-4 mr-2" />
                                            Run Workflow
                                        </>
                                    )}
                                </Button>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Result */}
            {result && (
                <Card className="bg-[#15151c] border-gray-800">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-base flex items-center gap-3">
                            Workflow Result: {result.workflow_name}
                            <Badge className={result.status === "completed" ? "bg-emerald-500" : "bg-red-500"}>
                                {result.status}
                            </Badge>
                        </CardTitle>
                        <span className="text-xs text-gray-500">
                            <Clock className="w-3 h-3 inline mr-1" />
                            {new Date(result.completed_at).toLocaleTimeString()}
                        </span>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Steps */}
                        <div className="space-y-2">
                            {result.steps.map((step, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 bg-[#1c1c26] rounded-lg">
                                    {step.status === "completed" ? (
                                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                                    ) : (
                                        <XCircle className="w-5 h-5 text-red-400" />
                                    )}
                                    <span className="text-sm flex-1">{step.name}</span>
                                    <Badge variant="outline" className="text-xs border-gray-700 text-gray-400">
                                        {step.status}
                                    </Badge>
                                </div>
                            ))}
                        </div>

                        {/* Summary */}
                        <div>
                            <h4 className="text-sm font-medium mb-2">Summary</h4>
                            <pre className="p-4 bg-[#1c1c26] rounded-lg text-xs text-gray-400 overflow-auto">
                                {JSON.stringify(result.summary, null, 2)}
                            </pre>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Empty State */}
            {workflows.length === 0 && (
                <div className="text-center py-12">
                    <Zap className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-500">No workflows available</p>
                    <p className="text-xs text-gray-600 mt-1">Connect to backend to see available workflows</p>
                </div>
            )}
        </div>
    );
}
