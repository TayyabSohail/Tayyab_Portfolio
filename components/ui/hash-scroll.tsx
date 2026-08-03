"use client";

import { useEffect } from "react";

const NAVBAR_OFFSET = 104;

export function scrollToHash() {
  const id = window.location.hash.slice(1);
  if (!id) return;

  const target = document.getElementById(decodeURIComponent(id));
  if (!target) return;

  // Wait for the route and client-rendered sections to finish laying out.
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      const top = target.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    });
  });
}

export function HashScroll() {
  useEffect(() => {
    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);

    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  return null;
}
