import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";

interface Company {
  name: string;
}

export interface User {
  full_name: string;
  email: string;
  Company: Company;
}

const fetchUser = async (token: string): Promise<User> => {
  const res = await fetch("https://api-dev.quicklyinc.com/auth/user", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (res.status === 401) {
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  const data = await res.json();
  return data.user;
};

export const useCurrentUser = () => {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["currentUser"],
    queryFn: () => fetchUser(token!),
    enabled: !!token,
    retry: false,
  });
};
