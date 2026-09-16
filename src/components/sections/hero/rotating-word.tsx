"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Cycles through what we build. The full list is always present for screen
 * readers (sr-only); only the visual swap is animated, so assistive tech isn't
 * spammed with a live region every two seconds.
 */
export function RotatingWord({ words, interval = 2200 }: { words: string[]; interval?: number }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || words.length < 2) return;
    const id = setInterval(() => setI((v) => (v + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval, reduce]);

  return (
    <span className="relative inline-flex items-center">
      <span className="sr-only">{words.join("، ")}</span>
      <span className="inline-grid overflow-hidden py-[0.15em]">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={words[i]}
            aria-hidden="true"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-110%", opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="col-start-1 row-start-1 whitespace-nowrap text-brand-600"
          >
            {words[i]}
          </motion.span>
        </AnimatePresence>
      </span>
      <span aria-hidden="true" className="ms-1.5 inline-block h-[1.1em] w-[2px] animate-caret bg-brand-600" />
    </span>
  );
}
