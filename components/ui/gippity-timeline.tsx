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
          <h2 className="text-2xl font-bold bg-white bg-clip-text text-transparent">
            AI-Enhanced Full Stack Engineering
          </h2>
          <p className="text-lg text-neutral-300 dark:text-neutral-300">
            I build{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold">
              full-stack
            </span>{" "}
            applications using frameworks like{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold">
              MERN
            </span>
            ,{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold">
              Next.js
            </span>
            , and{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold">
              TypeScript
            </span>
            . My work bridges{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold">
              frontend
            </span>{" "}
            fluidity with{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold">
              backend
            </span>{" "}
            reliability built for performance and real-world impact.
          </p>
        </div>
      ),
    },
    {
      title: "AI & Generative Systems",
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold bg-white bg-clip-text text-transparent">
            Practical AI, Built for Humans
          </h2>
          <p className="text-lg text-neutral-300 dark:text-neutral-300">
            From{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold">
              RAG-based chatbots
            </span>{" "}
            to{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold">
              GAN synthesis
            </span>{" "}
            and{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold">
              LSTM analysis
            </span>
            , I bring{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold">
              ML
            </span>{" "}
            to life with real-world apps. I work with{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold">
              TensorFlow
            </span>
            ,{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold">
              PyTorch
            </span>
            , and custom-tuned models to deliver human facing AI.
          </p>
        </div>
      ),
    },
    {
      title: "Cloud & DevOps",
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold bg-white bg-clip-text text-transparent">
            Scale with Confidence
          </h2>
          <p className="text-lg text-neutral-300 dark:text-neutral-300">
            I build{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold">
              cloud-native
            </span>{" "}
            systems using{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold">
              AWS
            </span>
            ,{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold">
              GCP
            </span>
            , and{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold">
              Firebase
            </span>
            . With{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold">
              Docker
            </span>
            ,{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold">
              Kubernetes
            </span>
            ,{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold">
              GitHub Actions
            </span>
            , and{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold">
              MLflow
            </span>
            , I ensure systems are fast, reliable, and production ready.
          </p>
        </div>
      ),
    },
    {
      title: "Mindset",
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold bg-white bg-clip-text text-transparent">
            Build. Learn. Ship. Repeat.
          </h2>
          <p className="text-lg text-neutral-300 dark:text-neutral-300">
            Progress comes from shipping fast and staying curious. Whether I'm
            learning a new{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold">
              AI workflow
            </span>{" "}
            or optimizing a{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold">
              backend architecture
            </span>
            , I'm always building one iteration at a time.
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
            className="flex justify-start pt-10 md:pt-20 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-black dark:bg-black flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-neutral-500 dark:bg-neutral-800 border border-neutral-500 dark:border-neutral-700 p-2" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-4xl font-bold text-neutral-500 dark:text-neutral-500">
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
