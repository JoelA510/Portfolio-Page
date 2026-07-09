import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import {
  installFakeIntersectionObserver,
  resetFakeIntersectionObserver,
} from "./intersectionObserverMock";

afterEach(() => {
  cleanup();
  resetFakeIntersectionObserver();
});

// happy-dom doesn't implement matchMedia; stub it for components that call it
// (theme preference sniffing, reduced-motion checks).
if (!window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList;
}

// happy-dom doesn't implement IntersectionObserver. Install a controllable
// fake (see intersectionObserverMock.ts) so hooks built on it — like
// src/App.tsx's useScrollSpy — are actually exercisable by tests, not just
// silently inert.
installFakeIntersectionObserver();
