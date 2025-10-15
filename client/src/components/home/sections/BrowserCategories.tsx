"use client";
import { useState } from "react";
import { ChevronDown, ChevronRight, Menu, Home } from "lucide-react";
import { navigationItems } from "@/constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuItem,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Button } from "../../ui/button";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

export default function BrowseCategories() {
  return (
    <div className="relative flex justify-center md:justify-center lg:justify-end xl:justify-end  ">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="lg"
            className="bg-browser text-browser  flex items-center cursor-pointer font-normal py-4 text-sm font-rubik lg:px-1 xl:px-4"
          >
            <Menu className="w-5 h-5" />
            Browse Categories
            <ChevronDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>

        <AnimatePresence>
          <DropdownMenuContent
            align="start"
            sideOffset={0}
            className="w-64 bg-white "
          >
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="bg-white divide-y overflow-hidden t list-disc space-y-2 "
            >
              {navigationItems.map((item, i) =>
                item.dropdownItems ? (
                  <DropdownMenuSub key={i}>
                    <DropdownMenuSubTrigger className="flex w-full justify-between items-center border-b border-color py-3 px-2">
                      <ul className="list-disc pl-5">
                        <li className="text-sm font-light font-rubik text-muted  cursor-pointer">
                          {item.title}
                        </li>
                      </ul>
                    </DropdownMenuSubTrigger>

                    <DropdownMenuSubContent className="bg-white border-b-3 primary-border">
                      {"group" in item.dropdownItems[0] ? (
                        <div className="grid grid-cols-3 gap-4 p-2 bg-white ">
                          {item.dropdownItems.map((group: any, idx: number) => (
                            <div key={idx}>
                              <p className="font-semibold mb-2">
                                {group.group}
                              </p>
                              <ul className="space-y-2">
                                {group.items.map((sub: any, j: number) => (
                                  <li key={j}>
                                    <Link
                                      href={sub.href}
                                      className=" text-hover text-sm font-light font-rubik text-muted  cursor-pointer"
                                    >
                                      {sub.title}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-2">
                          {item.dropdownItems.map((sub: any, i) => (
                            <DropdownMenuItem key={i} asChild>
                              <Link
                                href={sub.href}
                                className="text-sm font-light font-rubik text-hover text-muted  cursor-pointer "
                              >
                                {sub.title}
                              </Link>
                            </DropdownMenuItem>
                          ))}
                        </div>
                      )}
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                ) : (
                  <DropdownMenuItem
                    key={i}
                    asChild
                    className="flex w-full justify-start items-center border-b border-color py-3 last:border-none"
                  >
                    <Link
                      href={item.href}
                      className="block w-full text-[13px] font-rubik text-hover cursor-pointer"
                    >
                      <ul className="list-disc pl-5">
                      
                        <li className="text-sm font-light font-rubik  text-muted   cursor-pointer">
                          {item.title}
                        </li>
                      </ul>
                    </Link>
                  </DropdownMenuItem>
                )
              )}
            </motion.ul>
          </DropdownMenuContent>
        </AnimatePresence>
      </DropdownMenu>
    </div>
  );
}
