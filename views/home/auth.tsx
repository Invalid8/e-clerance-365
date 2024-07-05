"use client";

import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

export default function HomeAuth() {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6 grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Welcome to Your Dashboard
            </h1>
            <p className="max-w-[600px] text-lg">
              Manage your NYSC clearance process and track your progress.
            </p>
          </div>
          <div className="flex justify-center">
            <Image
              src="/placeholder.svg"
              width="600"
              height="400"
              alt="Dashboard"
              className="mx-auto aspect-[3/2] overflow-hidden rounded-xl object-cover sm:w-full"
            />
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6 grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="flex justify-center">
            <Image
              src="/placeholder.svg"
              width="600"
              height="400"
              alt="Document Upload"
              className="mx-auto aspect-[3/2] overflow-hidden rounded-xl object-cover sm:w-full"
            />
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Document Upload
            </h2>
            <p className="max-w-[600px] text-muted-foreground">
              Upload your required documents for NYSC clearance. Our platform
              ensures a secure and streamlined process.
            </p>
            <Button
              color="primary"
              radius="sm"
              className="w-fit"
              as={Link}
              href="/dashboard/upload"
            >
              Upload Documents
            </Button>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Clearance Status
            </h2>
            <p className="max-w-[600px] ">
              Track the status of your NYSC clearance process. Stay informed and
              up-to-date on the progress.
            </p>
            <div className="grid gap-4">
              <div className="flex items-center justify-between bg-primary text-primary-foreground p-4 rounded-lg">
                <div>
                  <h3 className="text-lg font-bold">Document Verification</h3>
                  <p className="">
                    Your documents are currently being verified.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <span className="">In Progress</span>
                </div>
              </div>
              <div className="flex items-center justify-between bg-primary text-primary-foreground p-4 rounded-lg">
                <div>
                  <h3 className="text-lg font-bold">Clearance Approval</h3>
                  <p className="text-muted-foreground">
                    Your clearance is pending approval.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <span className="text-muted-foreground">In Progress</span>
                </div>
              </div>
              <div className="flex items-center justify-between bg-primary text-primary-foreground p-4 rounded-lg">
                <div>
                  <h3 className="text-lg font-bold">Clearance Completed</h3>
                  <p className="text-muted-foreground">
                    Your NYSC clearance process is complete.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <span className="text-muted-foreground">Completed</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <Image
              src="/placeholder.svg"
              width="600"
              height="400"
              alt="Clearance Status"
              className="mx-auto aspect-[3/2] overflow-hidden rounded-xl object-cover sm:w-full"
            />
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6 grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="flex justify-center">
            <Image
              src="/placeholder.svg"
              width="600"
              height="400"
              alt="Notifications"
              className="mx-auto aspect-[3/2] overflow-hidden rounded-xl object-cover sm:w-full"
            />
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Notifications
            </h2>
            <p className="max-w-[600px] text-muted-foreground">
              Stay informed about the latest updates and important notifications
              related to your NYSC clearance.
            </p>
            <div className="grid gap-4">
              <div className="flex items-center justify-between bg-primary text-primary-foreground p-4 rounded-lg">
                <div>
                  <h3 className="text-lg font-bold">Document Verification</h3>
                  <p className="text-muted-foreground">
                    Your documents have been successfully verified.
                  </p>
                </div>
                <div className="text-xs text-muted-foreground">2 days ago</div>
              </div>
              <div className="flex items-center justify-between bg-primary text-primary-foreground p-4 rounded-lg">
                <div>
                  <h3 className="text-lg font-bold">Clearance Approval</h3>
                  <p className="text-muted-foreground">
                    Your NYSC clearance has been approved.
                  </p>
                </div>
                <div className="text-xs text-muted-foreground">1 week ago</div>
              </div>
              <div className="flex items-center justify-between bg-primary text-primary-foreground p-4 rounded-lg">
                <div>
                  <h3 className="text-lg font-bold">Clearance Certificate</h3>
                  <p className="text-muted-foreground">
                    Your NYSC clearance certificate is ready for download.
                  </p>
                </div>
                <div className="text-xs text-muted-foreground">3 days ago</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
