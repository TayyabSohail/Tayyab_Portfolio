"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";

interface CountUpProps {
  /** The figure as written, e.g. "100+", "1,000+", "30 days", "3×". */
  value: string;
  /** Seconds the count takes. */
  duration?: number;
  className?: string;
}

/**
 * Splits a figure such as "1,000+" or "30 days" into the text around the
 * number and the number itself, so the number can be counted up while the
 * prefix and suffix stay put.
 */
function parseFigure(value: string) {
  const match = value.match(/^([^\d]*)([\d,]*\.?\d+)(.*)$/);
  if (!match) return null;
  const [, prefix, digits, suffix] = match;
  const decimals = digits.includes(".") ? digits.split(".")[1].length : 0;
  return { prefix, target: Number(digits.replace(/,/g, "")), decimals, suffix };
}

/**
 * A figure that counts up from zero the first time it scrolls into view.
 * Thousands separators and decimals follow the figure as written; with
 * reduced motion the final value shows at once.
 */
export function CountUp({ value, duration = 1.6, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduceMotion = useReducedMotion();

  const figure = parseFigure(value);
  const target = figure?.target ?? 0;
  const decimals = figure?.decimals ?? 0;

  const count = useMotionValue(reduceMotion ? target : 0);
  const text = useTransform(count, (current) =>
    current.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }),
  );

  useEffect(() => {
    if (reduceMotion) {
      count.set(target);
      return;
    }
    if (!inView) return;
    const controls = animate(count, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [count, target, duration, inView, reduceMotion]);

  if (!figure) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {figure.prefix}
      <motion.span className="tabular-nums">{text}</motion.span>
      {figure.suffix}
    </span>
  );
}
