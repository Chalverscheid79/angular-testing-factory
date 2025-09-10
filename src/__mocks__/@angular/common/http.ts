// Mock for Angular HTTP Client
export class HttpClient {
  get = jest.fn();
  post = jest.fn();
  put = jest.fn();
  delete = jest.fn();
  patch = jest.fn();
  head = jest.fn();
  options = jest.fn();
  request = jest.fn();
}
