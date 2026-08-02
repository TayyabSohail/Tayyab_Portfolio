"use client";

import { useEffect } from "react";

function scrollToHash() {
  const id = window.location.hash.slice(1);
  if (!id) return;

  const target = document.getElementById(decodeURIComponent(id));
  if (!target) return;

  // Wait for the route and client-rendered sections to finish laying out.
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
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
