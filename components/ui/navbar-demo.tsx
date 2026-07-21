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
          {/* The links centre against the whole bar, not the space left over
              beside the CTA — so they're taken out of flow and the button
              floats above them on the right. */}
          <div className="relative flex w-full items-center justify-end">
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <NavItems
                items={navItems}
                className="pointer-events-auto flex-none text-xs sm:text-sm md:text-base"
              />
            </div>
            <div className="flex items-center gap-4">
              <a
                href="/#contact"
                className="shrink-0 whitespace-nowrap rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-neutral-950 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400 hover:shadow-emerald-500/30 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 focus-visible:outline-hidden sm:px-4 sm:py-2 sm:text-sm"
              >
                Book a Call
              </a>
            </div>
          </div>
        </NavBody>
      </Navbar>
    </div>
  );
}
