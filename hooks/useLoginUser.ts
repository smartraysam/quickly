// hooks/useLoginUser.ts
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

type LoginData = {
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
};

const loginUser = async (data: LoginData): Promise<LoginResponse> => {
  const res = await fetch("https://api-dev.quicklyinc.com/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Login failed");
  }

  return res.json();
};

export function useLoginUser(
  options?: UseMutationOptions<LoginResponse, Error, LoginData>
) {
  return useMutation({
    mutationFn: loginUser,
    ...options,
    onSuccess: (data, variables, context) => {
      // Example: store token temporarily (customize securely for your use case)
      sessionStorage.setItem("auth-token", data.token);
      options?.onSuccess?.(data, variables, context);
    },
  });
}
