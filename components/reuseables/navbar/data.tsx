export const navlinks: navLinkType[] = [
  {
    to: "/dashboard",
    name: "Dashboard",
  },
  {
    to: "/about",
    name: "About us",
  },
  {
    to: "/faq",
    name: "FAQs",
  },
  {
    to: "/contact",
    name: "Contact us",
  },
];

export type navLinkType = {
  to: string;
  name: string;
  isButton?: boolean;
  func?: (value?: any) => any;
  className?: string;
  forAuth?: boolean;
};
