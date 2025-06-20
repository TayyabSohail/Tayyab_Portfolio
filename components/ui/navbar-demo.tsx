"use client";
import { Navbar, NavBody, NavItems } from "@/components/ui/navbar";

export function NavbarDemo() {
  const navItems = [
    { name: "Home", link: "#home" },
    { name: "About", link: "#about" },
    { name: "Projects", link: "#projects" },
    { name: "Services", link: "#services" },
  ];

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <div className="flex w-full items-center justify-between">
            <div className="flex-1">
              <NavItems
                items={navItems}
                className="text-sm md:text-base" // Added responsive text size
              />
            </div>
            <div className="flex items-center gap-4">
              {/* Additional buttons/icons can go here */}
            </div>
          </div>
        </NavBody>
      </Navbar>
    </div>
  );
}
