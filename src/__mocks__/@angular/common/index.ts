// Mock for Angular Location
export class Location {
  back = vi.fn();
  forward = vi.fn();
  go = vi.fn();
  replaceState = vi.fn();
  getState = vi.fn();
  isCurrentPathEqualTo = vi.fn();
  normalize = vi.fn();
  prepareExternalUrl = vi.fn();
  path = vi.fn();
  subscribe = vi.fn();
}
