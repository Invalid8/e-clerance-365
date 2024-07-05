import { createClient } from "@supabase/supabase-js";
import { compare } from "bcryptjs";
import { generateToken, generateVerificationToken } from "@/lib/jwt";
import { sendVerificationEmail } from "@/lib/email";
import { NextRequest, NextResponse } from "next/server";
import { StudentType, InstitutionType, NYSCType } from "@/types";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_KEY || ""
);

type SignInPayload = {
  id: string;
  password: string;
  loginAs: "student" | "institution" | "nysc";
};

type SignInResponse = {
  message: string;
  data?: {
    token: string;
    user: Partial<StudentType | InstitutionType | NYSCType>;
  };
  statusCode: number;
};

export async function POST(
  req: NextRequest,
  res: NextResponse<SignInResponse>
) {
  const { id, password, loginAs }: SignInPayload = await req.json();

  if (!id || !password || !loginAs) {
    return NextResponse.json(
      { message: "ID, password, and loginAs are required", statusCode: 400 },
      { status: 400 }
    );
  }

  try {
    let user;

    switch (loginAs) {
      case "student":
        user = await supabase
          .from("students")
          .select("*")
          .eq("email", id)
          .single();
        break;
      case "institution":
        user = await supabase
          .from("institutions")
          .select("*")
          .eq("email", id)
          .single();
        break;
      case "nysc":
        user = await supabase.from("nysc").select("*").eq("email", id).single();
        break;
      default:
        return NextResponse.json(
          { message: "Invalid loginAs role", statusCode: 400 },
          { status: 400 }
        );
    }

    if (!user.data) {
      return NextResponse.json(
        { message: "User not found", statusCode: 404 },
        { status: 404 }
      );
    }

    // Compare passwords
    const passwordMatch = await compare(password, user.data.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Invalid credentials", statusCode: 401 },
        { status: 401 }
      );
    }

    // Check if student is verified
    if (loginAs === "student" && !user.data.verified) {
      const verificationToken = generateVerificationToken(user.data.email);
      await supabase
        .from("students")
        .update({ verification_token: verificationToken })
        .eq("id", user.data.id);

      await sendVerificationEmail(user.data.email, verificationToken);

      return NextResponse.json(
        {
          message: "Account not verified. Verification email has been resent.",
          statusCode: 403,
        },
        { status: 403 }
      );
    }

    // Generate JWT token
    const token = generateToken({
      id: user.data.id,
      email: user.data.email,
      role: user.data.role,
    });

    return NextResponse.json(
      {
        data: {
          token,
          user: {
            id: user.data.id,
            email: user.data.email,
            role: user.data.role,
          },
        },
        message: "User signed in successfully",
        statusCode: 200,
      },
      { status: 200 }
    );
  } catch (error: any) {
    if (error.code === "PGRST100") {
      // Adjust this error code based on the actual error code from supabase
      return NextResponse.json(
        { message: "User already exists", statusCode: 409 },
        { status: 409 }
      );
    }
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error", statusCode: 500 },
      { status: 500 }
    );
  }
}
