"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/navbar";
import { useState } from "react";

export function NavbarDemo() {
  const navItems = [
    { name: "Home", link: "#home" },
    { name: "About Me", link: "#about" },
    { name: "My Projects", link: "#projects" },
    { name: "Services", link: "#services" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <div className="flex w-full items-center justify-between">
            <div className="flex-1">
              <NavItems items={navItems} />
            </div>
            <div className="flex items-center gap-4">
              {/* Additional buttons/icons can go here */}
            </div>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-lg text-white hover:bg-white/10 rounded-md"
              >
                {item.name}
              </a>
            ))}
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
