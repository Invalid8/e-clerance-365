"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const Settings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Newsletter Settings</CardTitle>
        <CardDescription>
          Customize your newsletter settings to better engage your subscribers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-6">
          <div>
            <Label htmlFor="newsletter-name">Newsletter Name</Label>
            <Input id="newsletter-name" placeholder="Enter newsletter name" />
          </div>
          <div>
            <Label htmlFor="newsletter-description">
              Newsletter Description
            </Label>
            <Textarea
              id="newsletter-description"
              placeholder="Enter newsletter description"
              rows={3}
            />
          </div>

          <div className="grid gap-2 md:grid-cols-2 md:gap-4">
            <div>
              <Label htmlFor="newsletter-frequency">Newsletter Frequency</Label>
              <Select defaultValue="weekly">
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="newsletter-template">Newsletter Template</Label>
              <Select defaultValue="default">
                <SelectTrigger>
                  <SelectValue placeholder="Select template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="minimal">Minimal</SelectItem>
                  <SelectItem value="modern">Modern</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-2 md:grid-cols-2 md:gap-4">
            <div>
              <Label htmlFor="newsletter-sender">Newsletter Sender</Label>
              <Input id="newsletter-sender" placeholder="Enter sender name" />
            </div>
            <div>
              <Label htmlFor="newsletter-reply-to">Reply-To Email</Label>
              <Input
                id="newsletter-reply-to"
                placeholder="Enter reply-to email"
                type="email"
              />
            </div>
          </div>
          <div className="grid gap-2 md:grid-cols-2 md:gap-4">
            <div>
              <Label htmlFor="newsletter-subject">Newsletter Subject</Label>
              <Input
                id="newsletter-subject"
                placeholder="Enter newsletter subject"
              />
            </div>
            <div>
              <Label htmlFor="newsletter-preheader">Newsletter Preheader</Label>
              <Input
                id="newsletter-preheader"
                placeholder="Enter newsletter preheader"
              />
            </div>
          </div>
          <div className="grid gap-2 md:grid-cols-2 md:gap-4">
            <div>
              <Label htmlFor="newsletter-list">Mailing List</Label>
              <Select defaultValue="default">
                <SelectTrigger>
                  <SelectValue placeholder="Select mailing list" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="subscribers">Subscribers</SelectItem>
                  <SelectItem value="leads">Leads</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="newsletter-list-segment">List Segment</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Select list segment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subscribers</SelectItem>
                  <SelectItem value="active">Active Subscribers</SelectItem>
                  <SelectItem value="inactive">Inactive Subscribers</SelectItem>
                  <SelectItem value="engaged">Engaged Subscribers</SelectItem>
                  <SelectItem value="unengaged">
                    Unengaged Subscribers
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-2 md:grid-cols-2 md:gap-4">
            <div>
              <Label htmlFor="newsletter-list-size">Mailing List Size</Label>
              <Input
                id="newsletter-list-size"
                placeholder="Enter mailing list size"
                type="number"
              />
            </div>
            <div>
              <Label htmlFor="newsletter-open-rate">Average Open Rate</Label>
              <Input
                id="newsletter-open-rate"
                placeholder="Enter average open rate"
                type="number"
              />
            </div>
          </div>
          <div className="grid gap-2 md:grid-cols-2 md:gap-4">
            <div>
              <Label htmlFor="newsletter-click-rate">Average Click Rate</Label>
              <Input
                id="newsletter-click-rate"
                placeholder="Enter average click rate"
                type="number"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button>Save Changes</Button>
      </CardFooter>
    </Card>
  );
};

export default Settings;
