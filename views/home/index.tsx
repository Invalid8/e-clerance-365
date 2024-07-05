"use client";

import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

export default function HomeNoAuth() {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary from-primary to-primary/90">
        <div className="container px-4 md:px-6 grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4 text-primary-foreground">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Streamline Your NYSC Clearance
            </h1>
            <p className="max-w-[600px] text-lg">
              Our e-clearance platform connects students, institutions, and
              NYSC, making the clearance process seamless and efficient.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button
                as={Link}
                href="/dashboard"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary-foreground px-8 text-sm font-medium text-primary shadow transition-colors hover:bg-primary-foreground/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Get Started
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <Image
              src="/placeholder.svg"
              width="600"
              height="400"
              alt="E-Clearance"
              className="mx-auto aspect-[3/2] overflow-hidden rounded-xl object-cover sm:w-full"
            />
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="flex justify-center">
            <Image
              src="/placeholder.svg"
              width="600"
              height="400"
              alt="Student Registration"
              className="mx-auto aspect-[3/2] overflow-hidden rounded-xl object-cover sm:w-full"
            />
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Student Registration
            </h2>
            <p className="max-w-[600px] text-muted-foreground">
              Students can easily create an account and upload their documents
              for NYSC clearance. Our platform ensures a streamlined and secure
              process.
            </p>
            <Button
              as={Link}
              radius="sm"
              className="w-fit"
              href={"/auth/signup"}
              color="primary"
            >
              Register Now
            </Button>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6 grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Institution Verification
            </h2>
            <p className="max-w-[600px] text-muted-foreground">
              Institutions can easily verify student records and update their
              information on the platform. This ensures accurate and up-to-date
              data for the NYSC clearance process.
            </p>
            <Button
              as={Link}
              color="primary"
              radius="sm"
              className="w-fit"
              href="/auth/login?as=institution"
            >
              Login as Institution
            </Button>
          </div>
          <div className="flex justify-center">
            <Image
              src="/placeholder.svg"
              width="600"
              height="400"
              alt="Institution Verification"
              className="mx-auto aspect-[3/2] overflow-hidden rounded-xl object-cover sm:w-full"
            />
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="flex justify-center">
            <Image
              src="/placeholder.svg"
              width="600"
              height="400"
              alt="NYSC Clearance"
              className="mx-auto aspect-[3/2] overflow-hidden rounded-xl object-cover sm:w-full"
            />
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              NYSC Clearance
            </h2>
            <p className="max-w-[600px] text-muted-foreground">
              NYSC can easily access and verify student records through our
              platform, streamlining the clearance process and ensuring
              accuracy.
            </p>
            <Button
              as={Link}
              color="primary"
              className="w-fit"
              radius="sm"
              href="/auth/login?as=nysc"
            >
              Login as NYSC
            </Button>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6 grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              How It Works
            </h2>
            <p className="max-w-[600px] text-muted-foreground">
              Our e-clearance platform simplifies the NYSC clearance process.{" "}
              {"Here's"} how it works:
            </p>
            <div className="grid gap-4">
              <div className="grid grid-cols-[40px_1fr] gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-bold">Student Registration</h3>
                  <p className="text-muted-foreground">
                    Students create an account and upload their documents.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-[40px_1fr] gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-bold">
                    Institution Verification
                  </h3>
                  <p className="text-muted-foreground">
                    Institutions verify student records and update information.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-[40px_1fr] gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  3
                </div>
                <div>
                  <h3 className="text-lg font-bold">NYSC Clearance</h3>
                  <p className="text-muted-foreground">
                    NYSC accesses and verifies student records for clearance.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <Image
              src="/placeholder.svg"
              width="600"
              height="400"
              alt="How It Works"
              className="mx-auto aspect-[3/2] overflow-hidden rounded-xl object-cover sm:w-full"
            />
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 text-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Get Started with E-Clearance
            </h2>
            <p className="max-w-[600px] mx-auto text-muted-foreground">
              Our platform makes the NYSC clearance process seamless and
              efficient. Sign up today to get started.
            </p>
            <Button
              as={Link}
              color="primary"
              radius="sm"
              className="w-fit"
              href="/auth/signup"
            >
              Register Now
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
