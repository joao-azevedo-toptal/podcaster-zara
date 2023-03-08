import matchers from "@testing-library/jest-dom/matchers";
import { expect } from "vitest";
import "vitest-localstorage-mock";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
  })),
});

expect.extend(matchers);
