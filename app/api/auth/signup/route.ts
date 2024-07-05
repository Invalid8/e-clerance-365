import { createClient } from "@supabase/supabase-js";
import { hash } from "bcryptjs";
import { generateToken } from "@/lib/jwt";
import { NextApiRequest, NextApiResponse } from "next";
import { StudentType } from "@/types";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_KEY || ""
);

type Response = {
  message: string;
  data?: {
    token: string;
    user: StudentType;
  };
  statusCode: number;
};

export default async function POST(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
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
  } = req.body;

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
    return res
      .status(400)
      .json({ message: "All fields are required", statusCode: 400 });
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

    res.status(201).json({
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
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", statusCode: 500 });
  }
}
