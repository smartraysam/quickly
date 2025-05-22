import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";

export interface Company {
  id: number;
  name: string;
  address_line_1: string;
  address_line_2: string | null;
  address_city: string;
  address_state: string;
  address_zip: string;
  address_country: string;
  max_credit_amount: number | null;
  approved: boolean;
  logo_url: string | null;
  default_currency: string;
  createdAt: string;
  updatedAt: string;
  deleted_at: string | null;
}

export interface User {
  id: number;
  full_name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company_id: number;
  CompanyId: number;
  cognito_id: string;
  createdAt: string;
  updatedAt: string;
  deleted_at: string | null;
  roles: string;
  verified: boolean;
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
  const { token, setUser } = useAuth();

  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const user = await fetchUser(token!);
      setUser(user);
      return user;
    },
    enabled: !!token,
    retry: false,
  });
};
