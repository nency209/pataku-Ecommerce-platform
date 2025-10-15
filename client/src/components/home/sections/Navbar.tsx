"use client";

import Link from "next/link";
import { useState,useEffect } from "react";
import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";
import { navigationItems } from "@/constants";
import { motion, AnimatePresence } from "framer-motion";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

// ---------- DESKTOP NAVBAR (unchanged) ----------
function DesktopNavbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null; 

  return (
    <nav className="hidden lg:flex lg:px-1 bg-navbar items-center gap-10 py-4 px-8 xl:px-12 transition-all duration-300">
      {navigationItems.map((item, i) => (
        <div key={i} className="relative">
          {item.hasDropdown && Array.isArray(item.dropdownItems) && item.dropdownItems.length > 0 ? (
            <DropdownMenu
              open={openDropdown === item.title}
              onOpenChange={(open) => setOpenDropdown(open ? item.title : null)}
            >
              <DropdownMenuTrigger className="flex items-center gap-1 text-[15px] font-rubik font-light navbar-text navba-text-hover cursor-pointer">
                {item.title} <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>

              <AnimatePresence>
                {openDropdown === item.title && (
                  <DropdownMenuContent asChild>
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="p-2 bg-white space-y-2 w-48"
                    >
                      {item.dropdownItems.map((sub: any, idx: number) => (
                        <DropdownMenuItem key={idx} asChild>
                          <Link
                            href={sub.href}
                            className="block font-light font-rubik text-[13px] text-muted hover:text-black cursor-pointer"
                          >
                            {sub.title}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </motion.div>
                  </DropdownMenuContent>
                )}
              </AnimatePresence>
            </DropdownMenu>
          ) : (
            <Link
              href={item.href}
              className="flex items-center gap-1 text-[15px] font-rubik font-light navbar-text navba-text-hover cursor-pointer"
            >
              {item.title}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}


// ---------- MOBILE NAVBAR (new accordion) ----------
function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <div className="lg:hidden w-full relative ">
      {/* MENU BAR */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-around w-full  text-black px-4 py-4 mx-10 "
      >
        <span className="font-medium">MENU</span>
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* DROPDOWN CONTENT */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-white border border-color shadow-md"
          >
            <ul>
              {navigationItems.map((item, i) => (
                <li key={i} className="border-b border-color">
                  {item.hasDropdown ? (
                    <>
                      <button
                        onClick={() =>
                          setActiveMenu(activeMenu === item.title ? null : item.title)
                        }
                        className="flex justify-between w-full px-3 py-2 text-left text-sm text-muted"
                      >
                        {item.title}
                        {activeMenu === item.title ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                      <AnimatePresence>
                        {activeMenu === item.title && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-gray-100 px-3"
                          >
                            {item.dropdownItems?.map((sub: any, idx: number) => (
                              <Link
                                key={idx}
                                href={sub.href}
                                className="block py-2 text-sm text-muted hover:text-black"
                              >
                                {sub.title}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="block px-3 py-2 text-sm text-muted hover:text-black"
                    >
                      {item.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------- MAIN NAVBAR ----------
export default function Navbar() {
  return (
    <>
      <DesktopNavbar />
      <MobileNavbar />
    </>
  );
}
