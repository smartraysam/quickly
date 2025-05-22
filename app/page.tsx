"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Index = () => {
  const navigate = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate.push("/profile");
    } else {
      navigate.push("/login");
    }
  }, [isAuthenticated, navigate]);
  return null;
};

export default Index;
