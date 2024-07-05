"use server";

import { cookies } from "next/headers";

export async function setToken(token: string, key?: string) {
  const time = 1000 * 60 * 5; // cookie expires in 5min;

  cookies().set(key || "token", token);
}

export async function getToken(key?: string) {
  const token = cookies().get(key || "token");

  return token?.value;
}

export async function destroyToken(key?: string) {
  cookies().delete(key || "token");
}
