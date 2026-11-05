// React 18's types only know the camelCase `fetchPriority`, but React 18 warns
// on it at runtime and doesn't forward it. The lowercase `fetchpriority` reaches
// the DOM unchanged, so we keep it (LCP optimisation, see CLAUDE.md) and teach
// TypeScript about it here. Remove this file once on React 19.
import "react";

declare module "react" {
  interface ImgHTMLAttributes<T> {
    fetchpriority?: "high" | "low" | "auto";
  }
}
