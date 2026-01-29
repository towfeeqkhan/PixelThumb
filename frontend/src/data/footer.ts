import type { IFooter } from "../types";

export const footerData: IFooter[] = [
  {
    title: "Pages",
    links: [
      { name: "Home", href: "/" },
      { name: "Generate", href: "/generate" },
      { name: "Recreate", href: "/recreate" },
      { name: "Community", href: "/community" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about-us" },
      { name: "Contact Us", href: "/contact-us" },
      { name: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Terms of Service", href: "/terms-of-service" },
      { name: "Refund Policy", href: "/refund-policy" },
    ],
  },
];
