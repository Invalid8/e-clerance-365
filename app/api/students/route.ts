import { createClient } from "@supabase/supabase-js";
import { verifyToken } from "@/lib/jwt";
import { NextRequest, NextResponse } from "next/server";
import { StudentType } from "@/types";

import { v4 as uuidv4 } from "uuid";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_KEY || ""
);

type StudentsResponse = {
  message: string;
  data?: Partial<StudentType>[];
  statusCode: number;
};

export async function GET(
  req: NextRequest,
  res: NextResponse<StudentsResponse>
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

    if (!decoded || typeof decoded === "string" || !("role" in decoded)) {
      throw new Error("Invalid token payload");
    }

    const { role } = decoded;

    if (role !== "institution" && role !== "nysc") {
      return NextResponse.json(
        { message: "Forbidden", statusCode: 403 },
        { status: 403 }
      );
    }

    const { data: students, error } = await supabase
      .from("students")
      .select("*");

    if (error) throw error;

    return NextResponse.json(
      {
        data: students,
        message: "Students fetched successfully",
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

type UpdateStudentResponse = {
  message: string;
  data?: Partial<StudentType>;
  statusCode: number;
};

export async function PUT(
  req: NextRequest,
  res: NextResponse<UpdateStudentResponse>
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

    if (!decoded || typeof decoded === "string" || !("role" in decoded)) {
      throw new Error("Invalid token payload");
    }

    const { role } = decoded;

    if (role !== "institution") {
      return NextResponse.json(
        { message: "Forbidden", statusCode: 403 },
        { status: 403 }
      );
    }

    const { id, updateData } = await req.json();

    // Ensure that each student gets a unique tag_id
    updateData.tag_id = uuidv4();

    const { data, error } = await supabase
      .from("students")
      .update(updateData)
      .eq("id", id)
      .single();

    if (error) throw error;

    return NextResponse.json(
      { data, message: "Student updated successfully", statusCode: 200 },
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
