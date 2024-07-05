"use server";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib";

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

    const data = await res.json();

    if (![200, 204, 201].includes(data?.statusCode)) {
      throw new Error(data?.message || "An Error Occurred");
    }

    if (returnType === "blob") {
      return res as T;
    } else {
      return data;
    }
  } catch (error: any) {
    throw new Error(error?.message);
  }
}
