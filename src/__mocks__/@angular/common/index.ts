// Mock for Angular Location
export class Location {
  back = jest.fn();
  forward = jest.fn();
  go = jest.fn();
  replaceState = jest.fn();
  getState = jest.fn();
  isCurrentPathEqualTo = jest.fn();
  normalize = jest.fn();
  prepareExternalUrl = jest.fn();
  path = jest.fn();
  subscribe = jest.fn();
}
