// A controllable fake IntersectionObserver for tests. happy-dom doesn't
// implement the real thing, and a pure no-op stub (observe/unobserve that
// never invoke their callback) means any hook built on IntersectionObserver
// — like src/App.tsx's useScrollSpy — can never be exercised by a test.
// This one actually tracks observed elements and lets a test simulate
// intersection changes via `.trigger(...)`.
export class FakeIntersectionObserver implements IntersectionObserver {
  static instances: FakeIntersectionObserver[] = [];

  readonly root: Element | Document | null = null;
  readonly rootMargin: string;
  readonly thresholds: ReadonlyArray<number>;
  private callback: IntersectionObserverCallback;
  private elements = new Set<Element>();

  constructor(
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit,
  ) {
    this.callback = callback;
    this.rootMargin = (options?.rootMargin as string) ?? "";
    this.thresholds = Array.isArray(options?.threshold)
      ? (options.threshold as number[])
      : [(options?.threshold as number) ?? 0];
    FakeIntersectionObserver.instances.push(this);
  }

  observe(target: Element) {
    this.elements.add(target);
  }

  unobserve(target: Element) {
    this.elements.delete(target);
  }

  disconnect() {
    this.elements.clear();
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  /** Test-only: simulate one or more observed elements crossing the threshold. */
  trigger(intersections: Array<{ target: Element; isIntersecting: boolean }>) {
    const entries = intersections.map(
      ({ target, isIntersecting }) =>
        ({
          target,
          isIntersecting,
          boundingClientRect: target.getBoundingClientRect(),
          intersectionRatio: isIntersecting ? 1 : 0,
          intersectionRect: target.getBoundingClientRect(),
          rootBounds: null,
          time: 0,
        }) as IntersectionObserverEntry,
    );
    this.callback(entries, this);
  }
}

export function installFakeIntersectionObserver() {
  window.IntersectionObserver =
    FakeIntersectionObserver as unknown as typeof IntersectionObserver;
}

export function resetFakeIntersectionObserver() {
  FakeIntersectionObserver.instances = [];
}
