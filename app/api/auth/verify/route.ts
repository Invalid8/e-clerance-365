import { createClient } from "@supabase/supabase-js";
import { verify } from "jsonwebtoken";
import { generateToken, verifyToken } from "@/lib/jwt";
import { StudentType } from "@/types";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_KEY || ""
);

type FetchResponse = {
  message: string;
  data?: {
    token: string;
    user: StudentType;
  };
  statusCode: number;
};

export async function POST(req: NextRequest, res: NextResponse<FetchResponse>) {
  const { token } = await req.json();

  if (!token || typeof token !== "string") {
    return NextResponse.json(
      { message: "Token is required", statusCode: 400 },
      { status: 400 }
    );
  }

  try {
    const decoded = verifyToken(token);

    if (!decoded || typeof decoded === "string" || !("email" in decoded)) {
      throw new Error("Invalid token payload");
    }

    const { email } = decoded;

    const { error } = await supabase
      .from("students")
      .update({ verified: true })
      .eq("email", email)
      .single();

    if (error) {
      throw error;
    }

    const { data } = await supabase
      .from("students")
      .select("*")
      .eq("email", email)
      .single();

    if (!data) {
      return NextResponse.json(
        { message: "User not found", statusCode: 404 },
        { status: 404 }
      );
    }

    const user: StudentType = data;
    const authToken = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return NextResponse.json(
      {
        data: {
          token: authToken,
          user: {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            telephone: user.telephone,
            gender: user.gender,
            department: user.department,
            faculty: user.faculty,
            dob: user.dob,
            session_in: user.session_in,
            session_out: user.session_out,
            verified: user.verified,
            role: user.role,
            tag_id: user.tag_id,
          },
        },
        message: "Account verified successfully",
        statusCode: 200,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error", statusCode: 500 },
      { status: 500 }
    );
  }
}
