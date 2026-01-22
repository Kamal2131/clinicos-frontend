"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Mail, AlertCircle } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
            const res = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                setError("Invalid email or password");
                return;
            }

            const data = await res.json();
            localStorage.setItem("clinicos_token", data.access_token);
            localStorage.setItem("clinicos_user", JSON.stringify(data.user));
            router.push("/");
        } catch {
            setError("Connection failed. Is the server running?");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0e0e12] flex items-center justify-center p-4">
            <Card className="w-full max-w-md bg-[#15151c] border-gray-800">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                        <Lock className="w-6 h-6 text-purple-400" />
                    </div>
                    <CardTitle className="text-2xl font-semibold">
                        Clinic<span className="text-purple-400">OS</span>
                    </CardTitle>
                    <p className="text-sm text-gray-500 mt-1">Sign in to your account</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        {error && (
                            <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 text-red-400" />
                                <span className="text-sm text-red-400">{error}</span>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-xs text-gray-500 uppercase tracking-wide">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@clinicos.com"
                                    className="pl-10 bg-[#1c1c26] border-gray-700"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs text-gray-500 uppercase tracking-wide">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="pl-10 bg-[#1c1c26] border-gray-700"
                                    required
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-purple-600 hover:bg-purple-700"
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </Button>

                        <div className="text-center pt-4 border-t border-gray-800">
                            <p className="text-xs text-gray-500">Demo Credentials</p>
                            <p className="text-xs text-gray-400 mt-1">admin@clinicos.com / admin123</p>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
