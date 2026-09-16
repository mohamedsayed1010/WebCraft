"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import type { CursorVariant } from "@/types";

/**
 * CURSOR STATE
 *
 * A custom cursor is only worth building if it carries information. A blob
 * that follows the pointer is decoration; a cursor that becomes the word
 * "شوف" over a portfolio card has told the visitor what a click will do
 * before they click it. That is the only reason this exists.
 *
 * The provider owns nothing but state. The rendering lives in
 * `components/layout/cursor.tsx`, and the pointer tracking lives there too —
 * keeping the mouse-move subscription out of context is what stops every
 * consumer re-rendering on every frame.
 */

interface CursorContextValue {
  variant: CursorVariant;
  /** Optional label drawn inside the cursor, e.g. "شوف المشروع". */
  label: string;
  setCursor: (variant: CursorVariant, label?: string) => void;
  resetCursor: () => void;
}

const CursorContext = createContext<CursorContextValue | null>(null);

/** Safe in any tree — returns inert setters when no provider is mounted. */
export function useCursor(): CursorContextValue {
  return (
    useContext(CursorContext) ?? {
      variant: "default",
      label: "",
      setCursor: () => {},
      resetCursor: () => {},
    }
  );
}

/**
 * Props to spread onto any element that should change the cursor.
 *
 *   <a {...cursorProps("view", "شوف المشروع")}>…</a>
 *
 * Returns pointer handlers rather than mouse handlers so the state also clears
 * correctly when a touch user taps and the pointer is cancelled — a mouse-only
 * binding leaves the cursor stuck in its hover variant on hybrid devices.
 */
export function useCursorProps() {
  const { setCursor, resetCursor } = useCursor();

  return useCallback(
    (variant: CursorVariant, label?: string) => ({
      onPointerEnter: () => setCursor(variant, label),
      onPointerLeave: () => resetCursor(),
      onPointerCancel: () => resetCursor(),
    }),
    [setCursor, resetCursor],
  );
}

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [label, setLabel] = useState("");

  const setCursor = useCallback((next: CursorVariant, nextLabel = "") => {
    setVariant(next);
    setLabel(nextLabel);
  }, []);

  const resetCursor = useCallback(() => {
    setVariant("default");
    setLabel("");
  }, []);

  const value = useMemo(
    () => ({ variant, label, setCursor, resetCursor }),
    [variant, label, setCursor, resetCursor],
  );

  return (
    <CursorContext.Provider value={value}>{children}</CursorContext.Provider>
  );
}
