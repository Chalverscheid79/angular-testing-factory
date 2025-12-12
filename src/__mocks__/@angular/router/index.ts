// Mock for Angular Router
export class Router {
  navigate = vi.fn();
  navigateByUrl = vi.fn();
  createUrlTree = vi.fn();
  serializeUrl = vi.fn();
  parseUrl = vi.fn();
  isActive = vi.fn();
  url = '/';
  events = {};
}
