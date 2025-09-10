import { 
  createServiceProviderFactory, 
  createCustomServiceProviderMock 
} from './mock-factory';

describe('Mock Factory Public API', () => {
  describe('createServiceProviderFactory', () => {
    it('should create a factory that returns Angular Providers', () => {
      const defaults = {
        getData: jest.fn(() => 'default-data'),
        setData: jest.fn()
      };
      
      const factory = createServiceProviderFactory('TestService', defaults);
      const provider = factory() as any;

      expect(provider.provide).toBe('TestService');
      expect(provider.useValue.getData()).toBe('default-data');
      expect(provider.useValue.setData).toBeDefined();
    });

    it('should apply overrides correctly in factory', () => {
      const defaults = {
        getData: jest.fn(() => 'default'),
        setData: jest.fn()
      };
      
      const factory = createServiceProviderFactory('TestService', defaults);
      const provider = factory({
        getData: jest.fn(() => 'override')
      }) as any;

      expect(provider.useValue.getData()).toBe('override');
      expect(provider.useValue.setData).toBeDefined();
    });

    it('should work with class tokens', () => {
      class TestClass {}
      const defaults = { test: jest.fn(() => 'test') };
      
      const factory = createServiceProviderFactory(TestClass, defaults);
      const provider = factory() as any;
      
      expect(provider.provide).toBe(TestClass);
    });

    it('should handle empty defaults', () => {
      const factory = createServiceProviderFactory('EmptyService', {});
      const provider = factory({
        newMethod: jest.fn(() => 'new')
      }) as any;

      expect(provider.provide).toBe('EmptyService');
      expect(provider.useValue.newMethod()).toBe('new');
    });

    it('should preserve original defaults when no overrides provided', () => {
      const originalGetData = jest.fn(() => 'original');
      const defaults = {
        getData: originalGetData,
        setData: jest.fn()
      };
      
      const factory = createServiceProviderFactory('Service', defaults);
      const provider = factory() as any;

      expect(provider.useValue.getData()).toBe('original');
      expect(provider.useValue.getData).toBe(originalGetData);
    });

    it('should create independent provider instances', () => {
      const defaults = { counter: jest.fn(() => 0) };
      const factory = createServiceProviderFactory('Counter', defaults);
      
      const provider1 = factory({ counter: jest.fn(() => 1) }) as any;
      const provider2 = factory({ counter: jest.fn(() => 2) }) as any;

      expect(provider1.useValue.counter()).toBe(1);
      expect(provider2.useValue.counter()).toBe(2);
      expect(provider1.useValue).not.toBe(provider2.useValue);
    });

    it('should handle complex nested objects in defaults', () => {
      const defaults = {
        config: {
          timeout: 5000,
          retries: 3
        },
        api: {
          get: jest.fn(() => Promise.resolve('data')),
          post: jest.fn(() => Promise.resolve('created'))
        }
      };

      const factory = createServiceProviderFactory('ComplexService', defaults);
      const provider = factory() as any;

      expect(provider.useValue.config.timeout).toBe(5000);
      expect(provider.useValue.api.get).toBeDefined();
    });

    it('should handle symbol tokens', () => {
      const TOKEN = Symbol('TestToken');
      const defaults = { method: jest.fn(() => 'symbol-test') };
      
      const factory = createServiceProviderFactory(TOKEN, defaults);
      const provider = factory() as any;
      
      expect(provider.provide).toBe(TOKEN);
    });

    it('should merge defaults and overrides correctly', () => {
      const defaults = {
        method1: jest.fn(() => 'default1'),
        method2: jest.fn(() => 'default2')
      };

      const factory = createServiceProviderFactory('ConfigService', defaults);
      const provider = factory({
        method1: jest.fn(() => 'override1')
      }) as any;

      expect(provider.useValue.method1()).toBe('override1');
      expect(provider.useValue.method2()).toBe('default2');
    });

    it('should handle factory calls without overrides parameter', () => {
      const defaults = {
        getData: jest.fn(() => 'default-data'),
        setData: jest.fn()
      };
      
      const factory = createServiceProviderFactory('TestService', defaults);
      
      // Test both branches - with and without overrides
      const providerWithoutOverrides = factory() as any; // This tests the default {} branch
      const providerWithOverrides = factory({ getData: jest.fn(() => 'custom') }) as any;
      
      expect(providerWithoutOverrides.useValue.getData()).toBe('default-data');
      expect(providerWithOverrides.useValue.getData()).toBe('custom');
    });

    it('should handle empty overrides object explicitly', () => {
      const defaults = { test: jest.fn(() => 'test') };
      const factory = createServiceProviderFactory('Service', defaults);
      
      // Test explicit empty object vs undefined
      const provider1 = factory({}) as any;
      const provider2 = factory(undefined as any) as any;
      
      expect(provider1.useValue.test()).toBe('test');
      expect(provider2.useValue.test()).toBe('test');
    });
  });

  describe('createCustomServiceProviderMock', () => {
    it('should create one-shot Angular Provider', () => {
      const mockService = { 
        getData: jest.fn(() => 'custom-data'),
        setData: jest.fn()
      };
      
      const provider = createCustomServiceProviderMock('CustomService', mockService) as any;

      expect(provider.provide).toBe('CustomService');
      expect(provider.useValue).toBe(mockService);
      expect(provider.useValue.getData()).toBe('custom-data');
    });

    it('should work with different token types', () => {
      const mockService = { test: jest.fn(() => 'value') };
      
      const stringProvider = createCustomServiceProviderMock('StringToken', mockService) as any;
      expect(stringProvider.provide).toBe('StringToken');
      
      class TestClass {}
      const classProvider = createCustomServiceProviderMock(TestClass, mockService) as any;
      expect(classProvider.provide).toBe(TestClass);
      
      const symbolToken = Symbol('test');
      const symbolProvider = createCustomServiceProviderMock(symbolToken, mockService) as any;
      expect(symbolProvider.provide).toBe(symbolToken);
    });

    it('should create provider with correct structure', () => {
      const mockService = { test: 'value' };
      const provider = createCustomServiceProviderMock('TOKEN', mockService) as any;
      
      expect(typeof provider).toBe('object');
      expect(provider).toHaveProperty('provide');
      expect(provider).toHaveProperty('useValue');
      expect(provider.useValue).toBe(mockService);
    });

    it('should handle complex mock implementations', () => {
      const complexMock = {
        syncMethod: jest.fn(() => 'sync'),
        asyncMethod: jest.fn(() => Promise.resolve('async')),
        property: 'test-value',
        nestedObject: {
          method: jest.fn(() => 'nested')
        }
      };

      const provider = createCustomServiceProviderMock('ComplexService', complexMock) as any;
      
      expect(provider.useValue.syncMethod()).toBe('sync');
      expect(provider.useValue.property).toBe('test-value');
      expect(provider.useValue.nestedObject.method()).toBe('nested');
    });

    it('should handle empty mock implementations', () => {
      const provider = createCustomServiceProviderMock('EmptyService', {}) as any;
      
      expect(provider.provide).toBe('EmptyService');
      expect(provider.useValue).toEqual({});
    });
  });

  describe('Integration Tests', () => {
    it('should work together in Angular TestBed context', () => {
      const factory = createServiceProviderFactory('DataService', {
        load: jest.fn(() => 'factory-data')
      });
      
      const customProvider = createCustomServiceProviderMock('AuthService', {
        isLoggedIn: jest.fn(() => true)
      });
      
      const factoryProvider = factory() as any;
      
      expect(factoryProvider.provide).toBe('DataService');
      expect((customProvider as any).provide).toBe('AuthService');
      expect(factoryProvider.useValue.load()).toBe('factory-data');
      expect((customProvider as any).useValue.isLoggedIn()).toBe(true);
    });

    it('should handle factory with various override scenarios', () => {
      const defaults = {
        method: jest.fn(() => 'default'),
        optional: jest.fn(() => null)
      };

      const factory = createServiceProviderFactory('TestService', defaults);
      
      // Test empty object
      const provider1 = factory({}) as any;
      expect(provider1.useValue.method()).toBe('default');
      
      // Test undefined
      const provider2 = factory(undefined) as any;
      expect(provider2.useValue.method()).toBe('default');
      
      // Test partial override
      const provider3 = factory({ method: jest.fn(() => 'override') }) as any;
      expect(provider3.useValue.method()).toBe('override');
      
      // Test full override
      const provider4 = factory({ 
        method: jest.fn(() => 'full'),
        optional: jest.fn(() => 'modified') as any
      }) as any;
      expect(provider4.useValue.method()).toBe('full');
      expect(provider4.useValue.optional()).toBe('modified');
    });
  });

  describe('Branch Coverage Tests', () => {
    it('should test all conditional paths in createServiceProviderFactory', () => {
      const defaults = { test: jest.fn(() => 'default') };
      const factory = createServiceProviderFactory('BranchTest', defaults);
      
      // Path 1: No overrides (uses default {})
      const provider1 = factory() as any;
      expect(provider1.useValue.test()).toBe('default');
      
      // Path 2: Empty overrides object
      const provider2 = factory({}) as any;
      expect(provider2.useValue.test()).toBe('default');
      
      // Path 3: With overrides
      const provider3 = factory({ test: jest.fn(() => 'override') }) as any;
      expect(provider3.useValue.test()).toBe('override');
      
      // Path 4: Null/undefined overrides (edge case)
      const provider4 = factory(null as any) as any;
      expect(provider4.useValue.test()).toBe('default');
    });

    it('should handle all parameter combinations in createCustomServiceProviderMock', () => {
      // Test various token types and mock combinations
      const stringProvider = createCustomServiceProviderMock('string-token', { method: jest.fn() }) as any;
      expect(stringProvider.provide).toBe('string-token');
      
      const symbolToken = Symbol('symbol-token');
      const symbolProvider = createCustomServiceProviderMock(symbolToken, {}) as any;
      expect(symbolProvider.provide).toBe(symbolToken);
      
      class TestClass {}
      const classProvider = createCustomServiceProviderMock(TestClass, { prop: jest.fn(() => 'value') }) as any;
      expect(classProvider.provide).toBe(TestClass);
      
      const numberProvider = createCustomServiceProviderMock(42, { 
        complex: { 
          nested: jest.fn(() => 'nested') 
        } 
      }) as any;
      expect(numberProvider.provide).toBe(42);
      expect(numberProvider.useValue.complex.nested()).toBe('nested');
    });

    it('should handle unusual parameter patterns for branch coverage', () => {
      // Test with falsy values that might affect branches
      const factory = createServiceProviderFactory('BranchService', { test: jest.fn(() => 'default') });
      
      // Test with null
      const provider1 = factory(null as any) as any;
      expect(provider1.useValue.test()).toBe('default');
      
      // Test with false
      const provider2 = factory(false as any) as any;
      expect(provider2.useValue.test()).toBe('default');
      
      // Test with 0
      const provider3 = factory(0 as any) as any;  
      expect(provider3.useValue.test()).toBe('default');
      
      // Test with empty string
      const provider4 = factory("" as any) as any;
      expect(provider4.useValue.test()).toBe('default');
      
      // Test with NaN
      const provider5 = factory(NaN as any) as any;
      expect(provider5.useValue.test()).toBe('default');
    });

    it('should handle complex token types that may trigger different code paths', () => {
      // Test with various complex token types
      const complexTokens = [
        { complex: 'object' },
        [1, 2, 3],
        new Date(),
        /regex/,
        new Map(),
        new Set(),
        () => 'function'
      ];
      
      complexTokens.forEach(token => {
        const provider = createCustomServiceProviderMock(token, { method: jest.fn() }) as any;
        expect(provider.provide).toBe(token);
        expect(provider.useValue.method).toBeDefined();
      });
    });
  });
});
