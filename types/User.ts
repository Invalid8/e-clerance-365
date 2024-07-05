export type UserType = {
  id: string;
  role: RoleType;
  firstname: string;
  lastname: string;
  telephone: string;
  email: string;
  gender: "Male" | "Female";
  date_created?: string;
  image?: string;
  accessToken?: string;
};

export type StudentType = {
  id: string;
  role: "student";
  firstname: string;
  lastname: string;
  department: string;
  faculty: string;
  DOB: string;
  session_in: string;
  session_out: string;
  telephone: string;
  email: string;
  gender: "Male" | "Female";
  verified: false;
  date_created?: string;
  image?: string;
  accessToken?: string;
};

export type RoleType = "student" | "institution" | "nysc";
