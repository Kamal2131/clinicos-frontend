"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { api, WorkflowResult } from "@/lib/api";

interface Workflow {
    id: string;
    name: string;
    description: string;
}

export default function WorkflowsPage() {
    const [workflows, setWorkflows] = useState<Workflow[]>([]);
    const [running, setRunning] = useState<string | null>(null);
    const [result, setResult] = useState<WorkflowResult | null>(null);

    useEffect(() => {
        api.getWorkflows().then((data) => setWorkflows(data.workflows || []));
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

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold">Workflows</h1>
                <p className="text-sm text-gray-500 mt-1">Automation workflows</p>
            </div>

            <div className="grid grid-cols-3 gap-5">
                {workflows.map((workflow) => (
                    <Card key={workflow.id} className="bg-[#15151c] border-gray-800">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base">
                                <span>⚡</span> {workflow.name}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-gray-400">{workflow.description}</p>
                            <Button
                                onClick={() => runWorkflow(workflow.id)}
                                disabled={running === workflow.id}
                                className="w-full bg-purple-600 hover:bg-purple-700"
                            >
                                {running === workflow.id ? "Running..." : "Run Workflow"}
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {result && (
                <Card className="bg-[#15151c] border-gray-800">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-base">
                            Workflow Result
                            <Badge className={result.status === "completed" ? "bg-emerald-500" : "bg-red-500"}>
                                {result.status}
                            </Badge>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {result.steps.map((step, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 bg-[#1c1c26] rounded-lg">
                                    <span className={step.status === "completed" ? "text-emerald-400" : "text-red-400"}>
                                        {step.status === "completed" ? "✓" : "✗"}
                                    </span>
                                    <span className="text-sm">{step.name}</span>
                                </div>
                            ))}
                        </div>
                        <pre className="mt-4 p-4 bg-[#1c1c26] rounded-lg text-xs text-gray-400 overflow-auto">
                            {JSON.stringify(result.summary, null, 2)}
                        </pre>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
