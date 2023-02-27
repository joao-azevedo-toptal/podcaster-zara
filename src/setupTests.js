import matchers from "@testing-library/jest-dom/matchers";
import { expect } from "vitest";
import "vitest-localstorage-mock";

expect.extend(matchers);
