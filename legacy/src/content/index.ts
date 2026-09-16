/**
 * WEBCRAFT — CONTENT LAYER
 *
 * The single entry point for all site content. Components import from
 * `@/content` and never from the individual modules.
 *
 * That indirection is the whole point of this layer: when content moves to a
 * CMS, these named exports become async functions backed by fetches, and not
 * one component has to change.
 */

export * from "./copy";
export * from "./services";
export * from "./projects";
export * from "./testimonials";
export * from "./process";
export * from "./faq";
export * from "./founder";
export * from "./stats";
export * from "./capabilities";
export * from "./concepts";
