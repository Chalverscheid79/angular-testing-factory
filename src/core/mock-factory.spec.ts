import { createMockService, createMockProvider } from './mock-factory';

interface TestService {
  getData: () => string;
  setData: (data: string) => void;
  getAsync: () => Promise<string>;
}

describe('Mock Factory Core', () => {
  describe('createMockService', () => {
    it('should create type-safe mocks', () => {
      const mockService = createMockService<TestService>({
        getData: jest.fn(() => 'test-data'),
        setData: jest.fn()
      });

      expect(mockService.getData).toBeDefined();
      expect(mockService.setData).toBeDefined();
      expect(mockService.getData!()).toBe('test-data');
    });

    it('should apply overrides correctly', () => {
      const mockService = createMockService<TestService>(
        { getData: jest.fn(() => 'default') },
        { getData: jest.fn(() => 'override') }
      );

      expect(mockService.getData!()).toBe('override');
    });

    it('should handle empty overrides', () => {
      const mockService = createMockService<TestService>({
        getData: jest.fn(() => 'test')
      });

      expect(mockService.getData!()).toBe('test');
    });

    it('should merge all properties from overrides', () => {
      const defaultMocks = {
        getData: jest.fn(() => 'default'),
        setData: jest.fn()
      };
      
      const overrides = {
        getData: jest.fn(() => 'override'),
        getAsync: jest.fn(() => Promise.resolve('async'))
      };

      const mockService = createMockService<TestService>(defaultMocks, overrides);

      expect(mockService.getData!()).toBe('override');
      expect(mockService.setData).toBeDefined();
      expect(mockService.getAsync).toBeDefined();
    });
  });

  describe('createMockProvider', () => {
    it('should create Angular Provider', () => {
      const mockService = { getData: jest.fn(() => 'test') };
      const provider = createMockProvider('TestToken', mockService) as any;

      expect(provider.provide).toBe('TestToken');
      expect(provider.useValue).toBe(mockService);
    });

    it('should work with different token types', () => {
      const mockService = { test: jest.fn() };
      
      // String Token
      const stringProvider = createMockProvider('StringToken', mockService) as any;
      expect(stringProvider.provide).toBe('StringToken');
      
      // Class Token
      class TestClass {}
      const classProvider = createMockProvider(TestClass, mockService) as any;
      expect(classProvider.provide).toBe(TestClass);
      
      // Symbol Token
      const symbolToken = Symbol('test');
      const symbolProvider = createMockProvider(symbolToken, mockService) as any;
      expect(symbolProvider.provide).toBe(symbolToken);
    });

    it('should create provider with correct structure', () => {
      const mockService = { test: 'value' };
      const provider = createMockProvider('TOKEN', mockService) as any;
      
      expect(typeof provider).toBe('object');
      expect(provider).toHaveProperty('provide');
      expect(provider).toHaveProperty('useValue');
    });
  });
});
