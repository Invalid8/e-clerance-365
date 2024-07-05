import { createClient } from "@supabase/supabase-js";
import { verify } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { StudentType, InstitutionType, NYSCType } from "@/types";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_KEY || ""
);

type ProfileResponse = {
  message: string;
  data?: Partial<StudentType | InstitutionType | NYSCType>;
  statusCode: number;
};

export async function GET(
  req: NextRequest,
  res: NextResponse<ProfileResponse>
) {
  const token = req.headers.get("Authorization")?.split("Bearer ")[1];

  if (!token) {
    return NextResponse.json(
      { message: "Authorization token is required", statusCode: 401 },
      { status: 401 }
    );
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET || "");

    if (typeof decoded === "string" || !("id" in decoded)) {
      throw new Error("Invalid token payload");
    }

    const { id, role } = decoded;

    let user;

    switch (role) {
      case "student":
        user = await supabase
          .from("students")
          .select(
            "id, firstname, lastname, email, gender, department, faculty, DOB, session_in, session_out, role, verified"
          )
          .eq("id", id)
          .single();
        break;
      case "institution":
        user = await supabase
          .from("institutions")
          .select("id, name, email, address, contact_number, role, verified")
          .eq("id", id)
          .single();
        break;
      case "nysc":
        user = await supabase
          .from("nysc")
          .select("id, name, email, contact_number, role, verified")
          .eq("id", id)
          .single();
        break;
      default:
        return NextResponse.json(
          { message: "Invalid role", statusCode: 400 },
          { status: 400 }
        );
    }

    if (!user?.data) {
      return NextResponse.json(
        { message: "User not found", statusCode: 404 },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        data: user.data,
        message: "Profile retrieved successfully",
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
