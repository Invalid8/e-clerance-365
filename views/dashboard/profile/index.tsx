"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { UserType } from "@/types";

const Profile = ({ user }: { user: UserType }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>
              {user.firstname.charAt(0)}
              {user.lastname.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-bold">{user.username}</h2>
            <p className="text-muted-foreground">
              {user.firstname} {user.lastname}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-1">
            <h3 className="text-lg font-semibold">About</h3>
            <p className="text-muted-foreground">About you.</p>
          </div>
          <Separator />
          <div className="grid gap-1">
            <h3 className="text-lg font-semibold">Newsletter Performance</h3>
            <div className="grid grid-cols-2 gap-2 text-muted-foreground">
              <div>
                <span className="font-medium">Newsletters Sent:</span>
              </div>
              <div>156</div>
              <div>
                <span className="font-medium">Average Open Rate:</span>
              </div>
              <div>92%</div>
              <div>
                <span className="font-medium">Average Click Rate:</span>
              </div>
              <div>35%</div>
              <div>
                <span className="font-medium">Subscriber Growth:</span>
              </div>
              <div>+18% YoY</div>
            </div>
          </div>
          <Separator />
          <div className="grid gap-1">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <div className="grid grid-cols-2 gap-2 text-muted-foreground">
              <div>
                <span className="font-medium">Email:</span>
              </div>
              <div>{user.email_address}</div>
              <div>
                <span className="font-medium">Phone:</span>
              </div>
              <div>{user.telephone}</div>
              <div>
                <span className="font-medium">Country:</span>
              </div>
              <div>{user.country}</div>
            </div>
          </div>
          <div className="flex gap-4">
            <Button>Update Profile</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Profile;
