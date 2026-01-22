"use client";

import { useEffect, useState, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

interface User {
    id: string;
    email: string;
    name: string;
    role: string;
}

export function AuthGuard({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const token = localStorage.getItem("clinicos_token");
        const storedUser = localStorage.getItem("clinicos_user");

        if (token && storedUser) {
            setIsAuthenticated(true);
            setUser(JSON.parse(storedUser));
        } else {
            setIsAuthenticated(false);
            if (pathname !== "/login") {
                router.push("/login");
            }
        }
    }, [router, pathname]);

    if (isAuthenticated === null) {
        return (
            <div className="min-h-screen bg-[#0e0e12] flex items-center justify-center">
                <Skeleton className="w-32 h-8" />
            </div>
        );
    }

    if (!isAuthenticated && pathname !== "/login") {
        return null;
    }

    return <>{children}</>;
}

export function useUser() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("clinicos_user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const logout = () => {
        localStorage.removeItem("clinicos_token");
        localStorage.removeItem("clinicos_user");
        window.location.href = "/login";
    };

    return { user, logout };
}
