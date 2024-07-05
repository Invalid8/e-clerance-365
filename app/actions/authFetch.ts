"use server";

import { authOptions } from "@/lib";
import { getServerSession } from "next-auth";

type Options = {
  method: "GET" | "DELETE" | "POST" | "PUT" | "PATCH";
  body?: any;
  "Content-Type"?: string;
};

export default async function authFetch<T>(
  url: string,
  options?: Options,
  returnType?: "json" | "blob"
): Promise<T> {
  const session = await getServerSession(authOptions);

  const { method, body, "Content-Type": ContentType } = options ?? {};

  try {
    const headers: Record<string, string> = {
      Authorization: `Bearer ${session?.user?.accessToken}`,
    };

    if (ContentType) {
      headers["Content-Type"] = ContentType;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
      method: method || "GET",
      headers,
      body: body,
    });

    if (!res.ok) {
      const data = await res?.json();
      throw new Error(data?.message || "An Error Occurred");
    }

    if (returnType === "blob") {
      return res as T;
    } else {
      return await res?.json();
    }
  } catch (error: any) {
    throw new Error(error?.message);
  }
}
