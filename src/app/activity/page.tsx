"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Activity as ActivityIcon, Zap, Users, CheckCircle, Clock, AlertCircle, LogIn, Calendar } from "lucide-react";
import { api } from "@/lib/api";

interface ActivityItem {
    id: string;
    type: string;
    title: string;
    description: string;
    status: string;
    timestamp: string;
    user_id?: string;
}

export default function ActivityPage() {
    const [activities, setActivities] = useState<ActivityItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.getActivity(50).then((data) => {
            setActivities(data.activities || []);
        }).finally(() => setLoading(false));
    }, []);

    const getIcon = (type: string) => {
        switch (type) {
            case 'workflow': return Zap;
            case 'sync': return Users;
            case 'login': return LogIn;
            case 'logout': return LogIn;
            case 'schedule': return Calendar;
            default: return ActivityIcon;
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'success': return <CheckCircle className="w-4 h-4 text-emerald-400" />;
            case 'pending': return <Clock className="w-4 h-4 text-amber-400" />;
            case 'error': return <AlertCircle className="w-4 h-4 text-red-400" />;
            default: return null;
        }
    };

    const formatTime = (timestamp: string) => {
        const date = new Date(timestamp);
        const diff = Date.now() - date.getTime();
        const mins = Math.floor(diff / 60000);
        if (mins < 1) return 'Just now';
        if (mins < 60) return `${mins}m ago`;
        const hours = Math.floor(mins / 60);
        if (hours < 24) return `${hours}h ago`;
        return date.toLocaleDateString();
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-8 w-48" />
                <div className="grid grid-cols-4 gap-4">
                    <Skeleton className="h-24" />
                    <Skeleton className="h-24" />
                    <Skeleton className="h-24" />
                    <Skeleton className="h-24" />
                </div>
                <Skeleton className="h-96 w-full" />
            </div>
        );
    }

    const todayCount = activities.filter(a => {
        const date = new Date(a.timestamp);
        const today = new Date();
        return date.toDateString() === today.toDateString();
    }).length;

    const successCount = activities.filter(a => a.status === 'success').length;
    const errorCount = activities.filter(a => a.status === 'error').length;

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
                    <ActivityIcon className="w-6 h-6 text-purple-400" />
                    Activity Log
                </h1>
                <p className="text-sm text-gray-500 mt-1">Recent system activity and workflow runs</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-[#15151c] border-gray-800">
                    <CardContent className="pt-6">
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Today</p>
                        <p className="text-2xl font-bold mt-1">{todayCount}</p>
                        <p className="text-xs text-gray-500">activities</p>
                    </CardContent>
                </Card>
                <Card className="bg-[#15151c] border-gray-800">
                    <CardContent className="pt-6">
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Total</p>
                        <p className="text-2xl font-bold mt-1">{activities.length}</p>
                        <p className="text-xs text-gray-500">logged</p>
                    </CardContent>
                </Card>
                <Card className="bg-[#15151c] border-gray-800">
                    <CardContent className="pt-6">
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Successful</p>
                        <p className="text-2xl font-bold mt-1 text-emerald-400">{successCount}</p>
                        <p className="text-xs text-emerald-400">completed</p>
                    </CardContent>
                </Card>
                <Card className="bg-[#15151c] border-gray-800">
                    <CardContent className="pt-6">
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Errors</p>
                        <p className="text-2xl font-bold mt-1">{errorCount}</p>
                        <p className="text-xs text-gray-500">{errorCount === 0 ? 'all clear' : 'need attention'}</p>
                    </CardContent>
                </Card>
            </div>

            {/* Activity List */}
            <Card className="bg-[#15151c] border-gray-800">
                <CardHeader>
                    <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1">
                    {activities.length === 0 ? (
                        <div className="text-center py-12">
                            <ActivityIcon className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-500">No recent activity</p>
                            <p className="text-xs text-gray-600 mt-1">Activities will appear here as you use the system</p>
                        </div>
                    ) : (
                        activities.map((activity) => {
                            const Icon = getIcon(activity.type);
                            return (
                                <div
                                    key={activity.id}
                                    className="flex items-center justify-between p-4 rounded-lg hover:bg-[#1c1c26] transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-[#1c1c26] flex items-center justify-center">
                                            <Icon className="w-5 h-5 text-purple-400" />
                                        </div>
                                        <div>
                                            <p className="font-medium flex items-center gap-2">
                                                {activity.title}
                                                {getStatusIcon(activity.status)}
                                            </p>
                                            <p className="text-sm text-gray-500">{activity.description}</p>
                                        </div>
                                    </div>
                                    <span className="text-xs text-gray-500">{formatTime(activity.timestamp)}</span>
                                </div>
                            );
                        })
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
