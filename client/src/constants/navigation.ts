import { NavigationItem } from "@/types";



export const navigationItems: NavigationItem[] = [
  {
    title: "HOME",
    href: "/",
    hasDropdown: true,
    dropdownItems: [
      { title: "Home Shop 1", href: "/" },
      { title: "Home Shop 2", href: "/home-2" },
      { title: "Home Shop 3", href: "/home-3" },
      { title: "Home Shop 4", href: "/home-4" },
      { title: "Home RTL Version", href: "/home-rtl" },
  ],
},

  {
    title: "INFO",
    href: "/pages",
    hasDropdown: true,
    dropdownItems: [
      { title: "Size Chart", href: "/pages/size-Chart" },
      { title: "Shipping Policy", href: "/pages/shipping-policy" },
      
      { title: "About", href: "/pages/about" },
    ],
  },
   {
    title: "SHOP",
    href: "/shop",
    
  },
  { title: "WISHLIST", href: "/wishlist" },

  { title: "CONTACT", href: "/Contact" },
];

