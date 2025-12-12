// Mock for Angular HTTP Client
export class HttpClient {
  get = vi.fn();
  post = vi.fn();
  put = vi.fn();
  delete = vi.fn();
  patch = vi.fn();
  head = vi.fn();
  options = vi.fn();
  request = vi.fn();
}
