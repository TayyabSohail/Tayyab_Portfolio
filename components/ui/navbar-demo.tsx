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
          <div className="flex w-full items-center gap-6">
            <a
              href="/#home"
              aria-label="Tayyab Sohail — home"
              className="hidden shrink-0 items-center gap-3 font-mono text-xs font-bold uppercase tracking-[0.18em] text-white transition hover:text-emerald-400 sm:flex"
            >
              <span className="text-emerald-400">//</span>
              Tayyab Sohail
            </a>
            <span className="hidden h-5 w-px bg-white/10 sm:block" />
            <NavItems
              items={navItems}
              className="w-full md:justify-end"
              cta={{ name: "Book a Call", link: "/#contact" }}
            />
          </div>
        </NavBody>
      </Navbar>
    </div>
  );
}
