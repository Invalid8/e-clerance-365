import { createClient } from "@supabase/supabase-js";
import { hash } from "bcryptjs";
import { generateToken } from "@/lib/jwt";
import { NextApiRequest, NextApiResponse } from "next";
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
  const {
    firstname,
    lastname,
    email,
    phone,
    gender,
    department,
    faculty,
    DOB,
    password,
    sessionIn,
    sessionOut,
  } = await req.json();

  if (
    !firstname ||
    !lastname ||
    !email ||
    !phone ||
    !gender ||
    !department ||
    !faculty ||
    !DOB ||
    !password ||
    !sessionIn ||
    !sessionOut
  ) {
    return NextResponse.json(
      { message: "All fields are required", statusCode: 400 },
      { status: 400 }
    );
  }

  try {
    const hashedPassword = await hash(password, 10);

    const { data, error } = await supabase
      .from("students")
      .insert({
        firstname,
        lastname,
        email,
        telephone: phone,
        gender,
        department,
        faculty,
        DOB,
        password: hashedPassword,
        session_in: sessionIn,
        session_out: sessionOut,
        verified: false,
        tagId: null,
        role: "student",
      })
      .single();

    if (error) {
      throw error;
    }

    const user: StudentType = data;

    const token = generateToken(user);

    await supabase.from("students").update({ token }).eq("id", user?.id);

    NextResponse.json(
      {
        data: {
          token,
          user: {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            telephone: user.telephone,
            gender: user.gender,
            department: user.department,
            faculty: user.faculty,
            DOB: user.DOB,
            session_in: user.session_in,
            session_out: user.session_out,
            verified: user.verified,
            role: user.role,
          },
        },
        message: "User signed up successfully",
        statusCode: 201,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error", statusCode: 500 },
      { status: 500 }
    );
  }
}
