"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { ClockIcon, CircleCheckIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FormEvent, useEffect, useState } from "react";
import { showNotification } from "@/lib";
import { useSession } from "next-auth/react";
import { StudentType } from "@/types";
import { useRouter } from "next/navigation";

export default function StudentIndex() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session || !session.user) {
    router.push("/auth/login");
  }

  const profile: StudentType = session?.user;

  const [grades, setGrades] = useState<{ session: number; grade: number }[]>(
    []
  );
  const [cgpa, setCgpa] = useState<number>(0.0);

  const [firstname, setFirstname] = useState<string>(profile?.firstname || "");
  const [lastname, setLastname] = useState<string>(profile?.lastname || "");
  const [email, setEmail] = useState<string>(profile?.email || "");
  const [phone, setPhone] = useState<string>(profile?.telephone || "");
  const [gender, setGender] = useState<string>(profile?.gender || "");
  const [DOB, setDOB] = useState<string>(profile?.dob || "");
  const [faculty, setFaculty] = useState<string>(profile?.faculty || "");
  const [department, setDepartment] = useState<string>(
    profile?.department || ""
  );
  const [sessionIn, setSessionIn] = useState<string>(profile?.session_in || "");
  const [sessionOut, setSessionOut] = useState<string>(
    profile?.session_out || ""
  );

  const [institutionVerified] = useState<boolean>(!!profile?.tag_id || false);
  const [isCleared] = useState<boolean>(false);

  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getData() {}

    getData();
  }, []);

  async function handleProfileUpdate(e: FormEvent) {
    e.preventDefault();

    setIsLoading(true);

    showNotification("warn", "bottom-right", undefined, {
      message: "Updating user profile",
    });

    const body = {
      firstname,
      email,
      gender,
      phone,
      department,
      faculty,
      DOB,
      sessionIn,
      sessionOut,
    };

    setIsLoading(false);
  }

  useEffect(() => {
    setIsDisabled(
      !firstname ||
        !email ||
        !gender ||
        !phone ||
        !department ||
        !faculty ||
        !DOB ||
        !sessionIn ||
        !sessionOut
    );
  }, [
    firstname,
    email,
    gender,
    phone,
    department,
    faculty,
    DOB,
    sessionIn,
    sessionOut,
  ]);

  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>
              View and update your personal information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-4xl font-bold">
                {profile?.firstname} {profile?.lastname}
              </div>
              <Avatar className="h-12 w-12">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>
                  {profile?.firstname?.charAt(0)} {profile?.lastname?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="text-sm text-muted-foreground">{email}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Verification Status</CardTitle>
            <CardDescription>
              Check the status of your institutional verification.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-4xl font-bold">
                {institutionVerified ? "Verified" : "Pending"}
              </div>
              {institutionVerified ? (
                <CircleCheckIcon className="h-8 w-8 text-primary" />
              ) : (
                <ClockIcon className="h-8 w-8 text-primary" />
              )}
            </div>
            <div className="text-sm text-muted-foreground">
              {institutionVerified
                ? "Your account is successfully verified"
                : "Your verification is currently pending"}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>NYSC Clearance</CardTitle>
            <CardDescription>
              Check your NYSC clearance update status.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-4xl font-bold">
                {isCleared ? "Cleared" : "Pending"}
              </div>
              {isCleared ? (
                <CircleCheckIcon className="h-8 w-8 text-primary" />
              ) : (
                <ClockIcon className="h-8 w-8 text-primary" />
              )}
            </div>
            <div className="text-sm text-muted-foreground">
              You have {!isCleared && "not"} been cleared by NYSC
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex gap-4 md:flex-row flex-col">
        <Card className="w-full max-w-2xl" id="UserProfile">
          <CardHeader>
            <CardTitle>Student Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              className="grid grid-cols-2 gap-4"
              onSubmit={handleProfileUpdate}
            >
              <div className="grid gap-1">
                <Label>First Name</Label>
                <Input
                  defaultValue={firstname}
                  onChange={(e) => setFirstname(e.currentTarget.value)}
                />
              </div>
              <div className="grid gap-1">
                <Label>Last Name</Label>
                <Input
                  defaultValue={lastname}
                  onChange={(e) => setLastname(e.currentTarget.value)}
                />
              </div>
              <div className="grid gap-1">
                <Label>Email</Label>
                <Input defaultValue={email} disabled={true} readOnly={true} />
              </div>
              <div className="grid gap-1">
                <Label>Phone</Label>
                <Input
                  defaultValue={phone}
                  onChange={(e) => setPhone(e.currentTarget.value)}
                />
              </div>
              <div className="grid gap-1">
                <Label>Gender</Label>
                <Select
                  defaultValue={gender}
                  onValueChange={(e) => setGender(e)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-1">
                <Label>Date of Birth</Label>
                <Input
                  type="date"
                  defaultValue={DOB}
                  onChange={(e) => setDOB(e.currentTarget.value.toString())}
                />
              </div>
              <div className="grid gap-1">
                <Label>Faculty</Label>
                <Input
                  defaultValue={faculty}
                  onChange={(e) => setFaculty(e.currentTarget.value)}
                />
              </div>
              <div className="grid gap-1">
                <Label>Department</Label>
                <Input
                  defaultValue={department}
                  onChange={(e) => setDepartment(e.currentTarget.value)}
                />
              </div>

              <div className="grid gap-1">
                <Label>Session In</Label>
                <Input
                  type="text"
                  defaultValue={sessionIn}
                  onChange={(e) => setSessionIn(e.currentTarget.value)}
                />
              </div>
              <div className="grid gap-1">
                <Label>Session Out</Label>
                <Input
                  type="text"
                  defaultValue={sessionOut}
                  onChange={(e) => setSessionOut(e.currentTarget.value)}
                />
              </div>
              <div className="col-span-2">
                <div className="flex items-center justify-between">
                  <Label>Passport</Label>
                  <Button size="sm">Upload</Button>
                </div>
                <div className="mt-2 rounded-lg border bg-muted p-4">
                  <Image
                    src="/placeholder.svg"
                    width={200}
                    height={200}
                    alt="Passport"
                    className="mx-auto"
                  />
                </div>
              </div>
              <Button
                color="primary"
                radius="sm"
                className="w-fit"
                disabled={isDisabled}
                isLoading={isLoading}
              >
                Update Profile
              </Button>
            </form>
          </CardContent>
        </Card>
        <div className="flex flex-col gap-4">
          <Card className="w-full max-w-2xl h-fit">
            <CardHeader>
              <CardTitle>Grades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-1">
                  <Label>Semester 1</Label>
                  <Input defaultValue="4.0" disabled={true} readOnly={true} />
                </div>
                <div className="grid gap-1">
                  <Label>Semester 2</Label>
                  <Input defaultValue="3.8" disabled={true} readOnly={true} />
                </div>
                <div className="grid gap-1">
                  <Label>Semester 3</Label>
                  <Input defaultValue="4.2" disabled={true} readOnly={true} />
                </div>
                <div className="grid gap-1">
                  <Label>Semester 4</Label>
                  <Input defaultValue="3.9" disabled={true} readOnly={true} />
                </div>
                <div className="grid gap-1">
                  <Label>Semester 5</Label>
                  <Input defaultValue={""} disabled={true} readOnly={true} />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>CGPA</CardTitle>
              <CardDescription>
                Your current cummulated grades point.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-4xl font-bold">{cgpa}</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
