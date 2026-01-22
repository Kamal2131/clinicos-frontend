"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { api, Client } from "@/lib/api";

interface DashboardData {
  totalClients: number;
  segments: Record<string, number>;
  demoMode: boolean;
  clients: Client[];
}

const segmentColors: Record<string, string> = {
  VIP: "bg-amber-500",
  "At-Risk": "bg-red-500",
  Lapsed: "bg-orange-500",
  Regular: "bg-blue-500",
  New: "bg-emerald-500",
  "New-High-Potential": "bg-purple-500",
};

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      } catch (err) {
        setError("Failed to connect to backend. Is the server running?");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-gray-400">Loading dashboard...</div>;
  }

  if (error) {
    return (
      <div className="p-6 bg-red-500/10 border border-red-500/50 rounded-lg">
        <p className="text-red-400">{error}</p>
        <p className="text-sm text-gray-500 mt-2">
          API URL: {process.env.NEXT_PUBLIC_API_URL}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Multi-location clinic overview</p>
        </div>
        {data?.demoMode && (
          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/50">Demo Mode</Badge>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-5">
        <Card className="col-span-2 bg-[#15151c] border-gray-800">
          <CardContent className="pt-6">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Total Clients</p>
            <div className="text-5xl font-bold mt-2">{data?.totalClients || 0}</div>
          </CardContent>
        </Card>

        <Card className="bg-[#15151c] border-gray-800 border-amber-500/30">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <span>👑</span>
              <p className="text-xs text-amber-400 uppercase tracking-wide">VIP</p>
            </div>
            <div className="text-4xl font-bold">{data?.segments?.VIP || 0}</div>
          </CardContent>
        </Card>

        <Card className="bg-[#15151c] border-gray-800">
          <CardContent className="pt-6">
            <p className="text-xs text-gray-500 uppercase tracking-wide">At Risk</p>
            <div className="text-4xl font-bold mt-2">{data?.segments?.["At-Risk"] || 0}</div>
          </CardContent>
        </Card>
      </div>

      {/* Segments */}
      <div>
        <h2 className="text-sm font-medium mb-4">Segment breakdown</h2>
        <div className="flex flex-wrap gap-2">
          {Object.entries(data?.segments || {}).map(([segment, count]) => (
            <div key={segment} className="flex items-center gap-2 bg-[#1c1c26] rounded-lg px-4 py-2">
              <span className={`w-2 h-2 rounded-full ${segmentColors[segment] || "bg-gray-500"}`} />
              <span className="text-sm text-gray-400">{segment}</span>
              <span className="font-semibold">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Clients */}
      <Card className="bg-[#15151c] border-gray-800">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Recent Clients</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {data?.clients.slice(0, 5).map((client) => (
            <div key={client.id} className="flex items-center justify-between py-3 px-3 rounded-lg hover:bg-[#1c1c26]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-[#1c1c26] flex items-center justify-center text-xs font-medium">
                  {client.first_name[0]}{client.last_name[0]}
                </div>
                <div>
                  <p className="text-sm font-medium">{client.first_name} {client.last_name}</p>
                  <p className="text-xs text-gray-500">{client.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-400">${client.lifetime_spend.toLocaleString()}</span>
                {client.segment && (
                  <Badge className={`${segmentColors[client.segment]} text-white text-[10px] border-0`}>
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
