"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export const GippityAITimeline = () => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const data = [
    {
      title: "What I Do",
      content: (
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-white dark:text-white">
            Engineer Scalable Digital Products
          </h1>
          <p className="text-lg text-neutral-300 dark:text-neutral-300">
            I build full-stack applications using modern tools like MERN,
            Next.js, and TypeScript optimized for performance, usability, and
            real-world impact.
          </p>
        </div>
      ),
    },
    {
      title: "Expertise",
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white dark:text-white">
            AI-Integrated, Cloud-Ready Solutions
          </h2>
          <p className="text-lg text-neutral-300 dark:text-neutral-300">
            From responsive UIs to robust backend systems, I specialize in
            creating intelligent, cloud-native applications backed by clean
            architecture and scalable code.{" "}
          </p>
        </div>
      ),
    },
    {
      title: "Mindset",
      content: (
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-white dark:text-white">
            Always Learning, Always Building
          </h1>
          <p className="text-lg text-neutral-300 dark:text-neutral-300">
            Driven by curiosity and a love for technology, I constantly explore
            new tools and AI workflows to stay ahead and push boundaries with
            every project.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div
      className="w-full bg-transparent font-sans md:px-10"
      ref={containerRef}
    >
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-black dark:bg-black flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-neutral-500 dark:bg-neutral-800 border border-neutral-500 dark:border-neutral-700 p-2" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-neutral-500 dark:text-neutral-500">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
