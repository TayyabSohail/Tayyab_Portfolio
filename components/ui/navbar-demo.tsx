"use client";
import { Navbar, NavBody, NavItems } from "@/components/ui/navbar";

export function NavbarDemo() {
  // Root-relative so the hash targets still resolve from /projects routes.
  // "Book a Call" is deliberately absent here — it renders as a filled CTA
  // beside the list rather than as another muted link.
  const navItems = [
    { name: "Home", link: "/#home" },
    { name: "About", link: "/#about" },
    { name: "Projects", link: "/#projects" },
    { name: "Stack", link: "/#stack" },
  ];

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          {/* Everything sits in one centred flow row — the links and the CTA
              are the same kind of item, the CTA just carries the filled
              treatment. Nothing is absolutely positioned, so nothing overlaps. */}
          <div className="flex w-full items-center justify-center">
            <NavItems
              items={navItems}
              className="w-full md:flex-none"
              cta={{ name: "Book a Call", link: "/#contact" }}
            />
          </div>
        </NavBody>
      </Navbar>
    </div>
  );
}
