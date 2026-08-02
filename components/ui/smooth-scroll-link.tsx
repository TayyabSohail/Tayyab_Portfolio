"use client";

import type { MouseEvent, ReactNode } from "react";

type SmoothScrollLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function SmoothScrollLink({
  href,
  children,
  className,
}: SmoothScrollLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const url = new URL(href, window.location.href);
    if (url.pathname !== window.location.pathname || !url.hash) return;

    const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (!target) return;

    event.preventDefault();
    window.history.pushState(null, "", url.href);
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
