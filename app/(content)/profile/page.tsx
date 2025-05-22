"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { PaymentDateChecker } from "@/components/PaymentDateChecker";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function ProfilePage() {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();
  const { data: user, error, isLoading } = useCurrentUser();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  const initials = useMemo(() => {
    if (!user?.full_name) return "??";
    const names = user.full_name.trim().split(" ");
    const initials = names.map((n) => n[0]?.toUpperCase()).slice(0, 2);
    return initials.join("");
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    if ((error as Error).message === "Unauthorized") {
      router.push("/login");
      return null;
    }

    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Failed to load profile: {(error as Error).message}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="flex justify-between items-center px-6 py-4 border-b bg-white shadow-sm">
        <h1 className="text-xl font-semibold">My Profile</h1>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="cursor-pointer">
              <AvatarImage src="" alt={user?.full_name} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                logout();
                toast.success("Logged out successfully");
                router.push("/login");
              }}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-start p-4">
        <div className="w-full max-w-3xl">
          <Card className="p-0">
            <CardContent className="px-4 py-2 flex w-full">
              <div className="flex flex-col w-full">
                <h2 className="text-xl font-bold w-full">Profile details</h2>
                <div className="flex items-center space-x-4 mt-4">
                  <p className="font-semibold">Full Name:</p>
                  <p>{user?.full_name}</p>
                </div>
                <div className="flex items-center space-x-4 mt-1">
                  <p className="font-semibold">Email:</p>
                  <p>{user?.email}</p>
                </div>
                <div className="flex items-center space-x-4 mt-1">
                  <p className="font-semibold">Business Name:</p>
                  <p>{user?.Company?.name ?? "N/A"}</p>
                </div>
              </div>
              <div className="lg:flex w-full justify-end items-center p-4 hidden">
                <Avatar className="cursor-pointer flex place-self-end items-end w-32 h-32">
                  <AvatarImage src="" alt={user?.full_name} sizes="32"/>
                  <AvatarFallback className="font-black text-2xl">{initials}</AvatarFallback>
                </Avatar>
              </div>
            </CardContent>
          </Card>
          <PaymentDateChecker />
        </div>
      </div>
    </div>
  );
}
