import { createClient } from "@supabase/supabase-js";
import { verifyToken } from "@/lib/jwt";
import { NextRequest, NextResponse } from "next/server";
import { StudentType } from "@/types";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_KEY || ""
);

type ToggleClearanceResponse = {
  message: string;
  data?: Partial<StudentType>;
  statusCode: number;
};

export async function POST(
  req: NextRequest,
  res: NextResponse<ToggleClearanceResponse>
) {
  const token = req.headers.get("Authorization")?.split("Bearer ")[1];

  if (!token) {
    return NextResponse.json(
      { message: "Authorization token is required", statusCode: 401 },
      { status: 401 }
    );
  }

  try {
    const decoded = verifyToken(token);

    if (
      !decoded ||
      typeof decoded === "string" ||
      !("role" in decoded)
    ) {
      throw new Error("Invalid token payload");
    }

    const { role } = decoded;

    if (role !== "nysc") {
      return NextResponse.json(
        { message: "Forbidden", statusCode: 403 },
        { status: 403 }
      );
    }

    const { studentId } = await req.json();

    // Fetch the student to check if they have a tag_id and are verified
    const { data: student, error } = await supabase
      .from("students")
      .select("*")
      .eq("id", studentId)
      .single();

    if (error || !student) {
      return NextResponse.json(
        { message: "Student not found", statusCode: 404 },
        { status: 404 }
      );
    }

    if (!student.tag_id || !student.verified) {
      return NextResponse.json(
        { message: "Student cannot be cleared without tag_id and verification", statusCode: 400 },
        { status: 400 }
      );
    }

    // Toggle the clearance status
    const { data, error: updateError } = await supabase
      .from("students")
      .update({ nysc_cleared: !student.nysc_cleared })
      .eq("id", studentId);

    if (updateError) throw updateError;

    return NextResponse.json(
      { data, message: "Student clearance status updated successfully", statusCode: 200 },
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