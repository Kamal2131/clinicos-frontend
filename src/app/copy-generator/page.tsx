"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Copy, Check, Mail, MessageSquare, Gift } from "lucide-react";
import { api } from "@/lib/api";

const copyTypes = [
    { id: "reengagement", label: "Re-engagement", icon: Mail, description: "Win back lapsed clients" },
    { id: "birthday", label: "Birthday", icon: Gift, description: "Birthday celebration emails" },
    { id: "promotion", label: "Promotion", icon: MessageSquare, description: "Special offers & promotions" },
];

export default function CopyGeneratorPage() {
    const [selectedType, setSelectedType] = useState("reengagement");
    const [generating, setGenerating] = useState(false);
    const [result, setResult] = useState<{ content: string; variants: string[] } | null>(null);
    const [copied, setCopied] = useState(false);

    const handleGenerate = async () => {
        setGenerating(true);
        setResult(null);
        try {
            const data = await api.generateCopy(selectedType);
            setResult({ content: data.content, variants: data.variants });
        } catch (error) {
            console.error("Failed to generate copy:", error);
        } finally {
            setGenerating(false);
        }
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-purple-400" />
                    AI Copy Generator
                </h1>
                <p className="text-sm text-gray-500 mt-1">Generate marketing copy powered by AI</p>
            </div>

            <div className="grid grid-cols-3 gap-6">
                {/* Copy Type Selection */}
                <Card className="col-span-1 bg-[#15151c] border-gray-800">
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">Copy Type</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {copyTypes.map((type) => {
                            const Icon = type.icon;
                            const isSelected = selectedType === type.id;
                            return (
                                <button
                                    key={type.id}
                                    onClick={() => setSelectedType(type.id)}
                                    className={`w-full p-4 rounded-lg text-left transition-all ${isSelected
                                            ? 'bg-purple-500/20 border border-purple-500/50'
                                            : 'bg-[#1c1c26] border border-transparent hover:border-gray-700'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <Icon className={`w-5 h-5 ${isSelected ? 'text-purple-400' : 'text-gray-500'}`} />
                                        <div>
                                            <p className={`font-medium ${isSelected ? 'text-white' : 'text-gray-300'}`}>{type.label}</p>
                                            <p className="text-xs text-gray-500">{type.description}</p>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}

                        <Button
                            onClick={handleGenerate}
                            disabled={generating}
                            className="w-full mt-4 bg-purple-600 hover:bg-purple-700"
                        >
                            {generating ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-4 h-4 mr-2" />
                                    Generate Copy
                                </>
                            )}
                        </Button>
                    </CardContent>
                </Card>

                {/* Generated Copy */}
                <Card className="col-span-2 bg-[#15151c] border-gray-800">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-sm font-medium">Generated Copy</CardTitle>
                        {result && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleCopy(result.content)}
                                className="border-gray-700 hover:bg-gray-800"
                            >
                                {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                                {copied ? 'Copied!' : 'Copy'}
                            </Button>
                        )}
                    </CardHeader>
                    <CardContent>
                        {result ? (
                            <Tabs defaultValue="main">
                                <TabsList className="bg-[#1c1c26] border-gray-800">
                                    <TabsTrigger value="main">Main Copy</TabsTrigger>
                                    {result.variants.map((_, i) => (
                                        <TabsTrigger key={i} value={`variant-${i}`}>Variant {i + 1}</TabsTrigger>
                                    ))}
                                </TabsList>
                                <TabsContent value="main" className="mt-4">
                                    <div className="p-6 bg-[#1c1c26] rounded-lg whitespace-pre-wrap text-gray-300 leading-relaxed">
                                        {result.content}
                                    </div>
                                </TabsContent>
                                {result.variants.map((variant, i) => (
                                    <TabsContent key={i} value={`variant-${i}`} className="mt-4">
                                        <div className="p-6 bg-[#1c1c26] rounded-lg whitespace-pre-wrap text-gray-300 leading-relaxed">
                                            {variant}
                                        </div>
                                    </TabsContent>
                                ))}
                            </Tabs>
                        ) : (
                            <div className="text-center py-16">
                                <Sparkles className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                                <p className="text-gray-500">Select a copy type and click Generate</p>
                                <p className="text-xs text-gray-600 mt-1">AI will create personalized marketing copy</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
