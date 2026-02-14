"use client";
import { cn } from "../../lib/utils";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import React, { useState, useEffect } from "react";
import { useRef } from "react";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
  isMobile?: boolean;
}
interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 100);
  });

  return (
    <motion.div className={cn("fixed inset-x-0 top-0 z-40 w-full", className)}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{
                visible?: boolean;
                isMobile?: boolean;
              }>,
              { visible, isMobile }
            )
          : child
      )}
    </motion.div>
  );
};

export const NavBody = ({
  children,
  className,
  visible,
  isMobile,
}: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backgroundColor: visible ? "rgba(30, 30, 30, 0.8)" : "black",
        backdropFilter: visible ? "blur(10px)" : "none",
        padding: isMobile
          ? visible
            ? "0.5rem 1rem"
            : "1rem"
          : visible
          ? "0.5rem 1.5rem"
          : "1rem 1.5rem",
        width: isMobile ? (visible ? "85%" : "100%") : visible ? "35%" : "100%",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      className={cn(
        "relative z-[60] mx-auto flex max-w-3xl items-center justify-between rounded-xl transition-all duration-300 border-b border-white/20",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "relative flex flex-1 flex-row items-center justify-center space-x-4 text-sm font-medium text-neutral-300 transition duration-200 lg:flex lg:space-x-4",
        className
      )}
      >
      {items.map((item, idx) => (
        <a
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className="relative px-5 py-2 text-neutral-300"
          key={`link-${idx}`}
          href={item.link}
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-full bg-neutral-800"
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </a>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible ? "0 4px 6px rgba(0, 0, 0, 0.1)" : "none",
        width: visible ? "90%" : "100%",
        padding: visible ? "0.5rem 1rem" : "1rem",
        borderRadius: visible ? "12px" : "0px",
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full flex-col items-center justify-between bg-black/80 px-4 py-2 lg:hidden",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className
      )}
    >
      {children}
    </div>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
)) => {
  const baseStyles =
    "px-6 py-3 rounded-md text-md font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center w-fit";
  const variantStyles = {
    primary: "text-black",
    secondary: "bg-transparent dark:text-white",
    dark: "text-white",
    gradient: "text-white",
  };

  const variantBorders = {
    primary: "bg-[radial-gradient(#0ea5e9_40%,transparent_60%)]",
    secondary: "bg-[radial-gradient(#ffffff_40%,transparent_60%)]",
    dark: "bg-[radial-gradient(#4b5563_40%,transparent_60%)]",
    gradient: "bg-[radial-gradient(#3b82f6_40%,transparent_60%)]",
  };

  const variantBackgrounds = {
    primary: "bg-white",
    secondary: "bg-transparent",
    dark: "bg-black",
    gradient: "bg-gradient-to-b from-blue-500 to-blue-700",
  };

  const variantShadows = {
    primary:
      "shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    secondary: "shadow-none",
    dark: "shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    gradient: "shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
  };

  return (
    <Tag
      href={href || undefined}
      className={cn(
        "relative h-14 w-fit overflow-hidden bg-transparent p-0.5",
        className
      )}
      {...props}
    >
      <div
        className="absolute inset-0"
        style={{
          borderRadius: "0.5rem",
          overflow: "hidden",
        }}
      >
        <MovingBorder duration={3000} rx="0.5rem" ry="0.5rem">
          <div
            className={cn("h-10 w-10 opacity-[0.8]", variantBorders[variant])}
          />
        </MovingBorder>
      </div>

      <div
        className={cn(
          baseStyles,
          variantStyles[variant],
          variantShadows[variant],
          "relative flex h-full w-full items-center justify-center border border-slate-800 antialiased",
          variantBackgrounds[variant]
        )}
        style={{
          borderRadius: "0.5rem",
        }}
      >
        {children}
      </div>
    </Tag>
  );
};

const MovingBorder = ({
  children,
  duration = 3000,
  rx = "0",
  ry = "0",
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  [key: string]: any;
}) => {
  const pathRef = useRef<any>(null);
  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).x
  );
  const y = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).y
  );

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        style={{
          borderRadius: `${rx} ${ry}`,
        }}
        {...otherProps}
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};
