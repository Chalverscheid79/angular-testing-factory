// Mock for Angular Router
export class Router {
  navigate = jest.fn();
  navigateByUrl = jest.fn();
  createUrlTree = jest.fn();
  serializeUrl = jest.fn();
  parseUrl = jest.fn();
  isActive = jest.fn();
  url = '/';
  events = {};
}
