import { describe, it, expect, vi } from 'vitest';
import {
  provideHttpClientMock,
  provideRouterMock,
  provideLocationMock,
  provideAngularCommonMocks
} from './angular-common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

describe('Angular Common Presets', () => {
  describe('provideHttpClientMock', () => {
    it('should create HttpClient provider with defaults', () => {
      const provider = provideHttpClientMock() as any;
      
      // Check that it's a valid Angular provider structure
      expect(provider).toHaveProperty('provide');
      expect(provider).toHaveProperty('useValue');
      expect(provider.useValue).toBeDefined();
      expect(provider.useValue.get).toBeDefined();
      expect(provider.useValue.post).toBeDefined();
    });

    it('should apply overrides correctly', () => {
      const mockGet = vi.fn(() => 'custom-response');
      const provider = provideHttpClientMock({
        get: mockGet as any
      }) as any;
      
      expect(provider.useValue.get).toBe(mockGet);
    });

    it('should have all HTTP methods available', () => {
      const provider = provideHttpClientMock() as any;
      const httpMock = provider.useValue;
      
      // Test all HTTP methods exist and are callable
      expect(typeof httpMock.get).toBe('function');
      expect(typeof httpMock.post).toBe('function');
      expect(typeof httpMock.put).toBe('function');
      expect(typeof httpMock.delete).toBe('function');
      expect(typeof httpMock.patch).toBe('function');
      expect(typeof httpMock.head).toBe('function');
      expect(typeof httpMock.options).toBe('function');
      expect(typeof httpMock.request).toBe('function');
    });

    it('should execute default mock implementations', () => {
      const provider = provideHttpClientMock() as any;
      const httpMock = provider.useValue;
      
      // Test that default mocks return observables
      const getResult = httpMock.get();
      const postResult = httpMock.post();
      
      expect(getResult).toBeDefined();
      expect(postResult).toBeDefined();
    });
  });

  describe('provideRouterMock', () => {
    it('should create Router provider with defaults', () => {
      const provider = provideRouterMock() as any;
      
      // Check that it's a valid Angular provider structure
      expect(provider).toHaveProperty('provide');
      expect(provider).toHaveProperty('useValue');
      expect(provider.useValue).toBeDefined();
      expect(provider.useValue.navigate).toBeDefined();
      expect(provider.useValue.navigateByUrl).toBeDefined();
    });

    it('should apply overrides correctly', () => {
      const mockNavigate = vi.fn(() => Promise.resolve(false));
      const provider = provideRouterMock({
        navigate: mockNavigate as any
      }) as any;
      
      expect(provider.useValue.navigate).toBe(mockNavigate);
    });

    it('should have all router methods available', () => {
      const provider = provideRouterMock() as any;
      const routerMock = provider.useValue;
      
      expect(typeof routerMock.navigate).toBe('function');
      expect(typeof routerMock.navigateByUrl).toBe('function');
      expect(typeof routerMock.createUrlTree).toBe('function');
      expect(typeof routerMock.serializeUrl).toBe('function');
      expect(typeof routerMock.parseUrl).toBe('function');
      expect(typeof routerMock.isActive).toBe('function');
    });

    it('should have default router properties', () => {
      const provider = provideRouterMock() as any;
      const routerMock = provider.useValue;
      
      expect(routerMock.events).toBeDefined();
    });

    it('should execute default router implementations', async () => {
      const provider = provideRouterMock() as any;
      const routerMock = provider.useValue;
      
      // Test navigation methods return promises
      const navigateResult = await routerMock.navigate(['/test']);
      const navigateByUrlResult = await routerMock.navigateByUrl('/test');
      
      expect(typeof navigateResult).toBe('boolean');
      expect(typeof navigateByUrlResult).toBe('boolean');
    });
  });

  describe('provideLocationMock', () => {
    it('should create Location provider with defaults', () => {
      const provider = provideLocationMock() as any;
      
      // Check that it's a valid Angular provider structure
      expect(provider).toHaveProperty('provide');
      expect(provider).toHaveProperty('useValue');
      expect(provider.useValue).toBeDefined();
      expect(provider.useValue.back).toBeDefined();
      expect(provider.useValue.forward).toBeDefined();
    });

    it('should apply overrides correctly', () => {
      const mockBack = vi.fn();
      const provider = provideLocationMock({
        back: mockBack as any
      }) as any;
      
      expect(provider.useValue.back).toBe(mockBack);
    });

    it('should have all location methods available', () => {
      const provider = provideLocationMock() as any;
      const locationMock = provider.useValue;
      
      expect(typeof locationMock.back).toBe('function');
      expect(typeof locationMock.forward).toBe('function');
      expect(typeof locationMock.go).toBe('function');
      expect(typeof locationMock.replaceState).toBe('function');
      expect(typeof locationMock.getState).toBe('function');
      expect(typeof locationMock.isCurrentPathEqualTo).toBe('function');
      expect(typeof locationMock.normalize).toBe('function');
      expect(typeof locationMock.prepareExternalUrl).toBe('function');
      expect(typeof locationMock.path).toBe('function');
      expect(typeof locationMock.subscribe).toBe('function');
    });

    it('should execute default location implementations', () => {
      const provider = provideLocationMock() as any;
      const locationMock = provider.useValue;
      
      // Test string methods
      expect(typeof locationMock.normalize('/test')).toBe('string');
      expect(typeof locationMock.prepareExternalUrl('/test')).toBe('string');
      expect(typeof locationMock.path()).toBe('string');
      
      // Test boolean methods
      expect(typeof locationMock.isCurrentPathEqualTo('/test')).toBe('boolean');
      
      // Test subscription method
      const subscription = locationMock.subscribe();
      expect(subscription).toHaveProperty('unsubscribe');
      expect(subscription).toHaveProperty('closed');
    });
  });

  describe('provideAngularCommonMocks', () => {
    it('should return array of all common service providers', () => {
      const providers = provideAngularCommonMocks();
      
      expect(Array.isArray(providers)).toBe(true);
      expect(providers).toHaveLength(3);
      
      // Check that each provider has the right structure
      providers.forEach(provider => {
        expect(provider).toHaveProperty('provide');
        expect(provider).toHaveProperty('useValue');
      });
    });

    it('should contain HttpClient, Router, and Location providers', () => {
      const providers = provideAngularCommonMocks();
      
      // Each provider should have a valid Angular provider structure
      expect(providers).toHaveLength(3);
      expect(providers[0]).toHaveProperty('provide');
      expect(providers[1]).toHaveProperty('provide'); 
      expect(providers[2]).toHaveProperty('provide');
    });

    it('should create independent provider instances', () => {
      const providers1 = provideAngularCommonMocks();
      const providers2 = provideAngularCommonMocks();
      
      // Different instances but same structure
      expect(providers1).not.toBe(providers2);
      expect(providers1).toHaveLength(providers2.length);
    });
  });

  describe('Provider Factory Pattern', () => {
    it('should create new instances with different overrides', () => {
      const provider1 = provideHttpClientMock({ 
        get: vi.fn(() => 'response1') as any 
      }) as any;
      const provider2 = provideHttpClientMock({ 
        get: vi.fn(() => 'response2') as any 
      }) as any;
      
      expect(provider1.useValue.get()).toBe('response1');
      expect(provider2.useValue.get()).toBe('response2');
      expect(provider1.useValue).not.toBe(provider2.useValue);
    });

    it('should preserve default methods when overriding', () => {
      const provider = provideHttpClientMock({
        get: vi.fn(() => 'custom-get') as any
      }) as any;
      
      // Overridden method
      expect(provider.useValue.get()).toBe('custom-get');
      
      // Default methods should still exist
      expect(provider.useValue.post).toBeDefined();
      expect(provider.useValue.put).toBeDefined();
      expect(provider.useValue.delete).toBeDefined();
    });

    it('should handle complex router navigation scenarios', async () => {
      const customNavigate = vi.fn().mockImplementation((commands) => {
        return Promise.resolve(commands.includes('success'));
      });
      
      const provider = provideRouterMock({
        navigate: customNavigate as any
      }) as any;
      
      const routerMock = provider.useValue;
      
      const successResult = await routerMock.navigate(['success']);
      const failResult = await routerMock.navigate(['fail']);
      
      expect(successResult).toBe(true);
      expect(failResult).toBe(false);
      expect(customNavigate).toHaveBeenCalledTimes(2);
    });

    it('should handle location state management', () => {
      let currentState = { page: 1 };
      
      const provider = provideLocationMock({
        getState: vi.fn(() => currentState) as any,
        replaceState: vi.fn((state) => { currentState = { ...currentState, ...state }; }) as any
      }) as any;
      
      const locationMock = provider.useValue;
      
      expect(locationMock.getState()).toEqual({ page: 1 });
      locationMock.replaceState({ page: 2, filter: 'active' });
      expect(locationMock.getState()).toEqual({ page: 2, filter: 'active' });
    });
  });

  describe('provideAngularCommonMocks', () => {
    it('should return array of all common Angular service providers', () => {
      const providers = provideAngularCommonMocks();
      
      expect(Array.isArray(providers)).toBe(true);
      expect(providers).toHaveLength(3);
      
      // Verify that each provider has correct structure
      providers.forEach(provider => {
        expect(provider).toHaveProperty('provide');
        expect(provider).toHaveProperty('useValue');
      });
    });

    it('should include HttpClient provider', () => {
      const providers = provideAngularCommonMocks() as any[];
      const httpProvider = providers.find(p => p.provide === HttpClient);
      
      expect(httpProvider).toBeDefined();
      expect(httpProvider.useValue.get).toBeDefined();
      expect(httpProvider.useValue.post).toBeDefined();
    });

    it('should include Router provider', () => {
      const providers = provideAngularCommonMocks() as any[];
      const routerProvider = providers.find(p => p.provide === Router);
      
      expect(routerProvider).toBeDefined();
      expect(routerProvider.useValue.navigate).toBeDefined();
      expect(routerProvider.useValue.navigateByUrl).toBeDefined();
    });

    it('should include Location provider', () => {
      const providers = provideAngularCommonMocks() as any[];
      const locationProvider = providers.find(p => p.provide === Location);
      
      expect(locationProvider).toBeDefined();
      expect(locationProvider.useValue.back).toBeDefined();
      expect(locationProvider.useValue.forward).toBeDefined();
    });

    it('should create independent instances each call', () => {
      const providers1 = provideAngularCommonMocks() as any[];
      const providers2 = provideAngularCommonMocks() as any[];
      
      // Different provider instances
      expect(providers1).not.toBe(providers2);
      
      // But same structure
      expect(providers1).toHaveLength(providers2.length);
      
      // Each useValue should be different instance
      expect(providers1[0].useValue).not.toBe(providers2[0].useValue);
    });
  });

  describe('Default Mock Function Execution', () => {
    it('should execute all HttpClient default methods', () => {
      const provider = provideHttpClientMock() as any;
      const httpMock = provider.useValue;
      
      // Execute all HTTP methods to ensure they're covered
      expect(httpMock.get()).toBeDefined();
      expect(httpMock.post()).toBeDefined();
      expect(httpMock.put()).toBeDefined();
      expect(httpMock.delete()).toBeDefined();
      expect(httpMock.patch()).toBeDefined();
      expect(httpMock.head()).toBeDefined();
      expect(httpMock.options()).toBeDefined();
      expect(httpMock.request()).toBeDefined();
    });

    it('should execute all Router default methods', async () => {
      const provider = provideRouterMock() as any;
      const routerMock = provider.useValue;
      
      // Execute all router methods to ensure they're covered
      expect(await routerMock.navigate(['test'])).toBe(true);
      expect(await routerMock.navigateByUrl('/test')).toBe(true);
      expect(routerMock.createUrlTree(['test'])).toBeDefined();
      expect(routerMock.serializeUrl('test')).toBe('');
      expect(routerMock.parseUrl('test')).toBeDefined();
      expect(routerMock.isActive('test')).toBe(false);
      expect(routerMock.events).toBeDefined();
    });

    it('should execute all Location default methods', () => {
      const provider = provideLocationMock() as any;
      const locationMock = provider.useValue;
      
      // Execute all location methods to ensure they're covered
      locationMock.back();
      locationMock.forward();
      locationMock.go('/test');
      locationMock.replaceState('/test', 'Test');
      expect(locationMock.getState()).toBeNull();
      expect(locationMock.isCurrentPathEqualTo('/test')).toBe(false);
      expect(locationMock.normalize('/test')).toBe('/test');
      expect(locationMock.prepareExternalUrl('/test')).toBe('/test');
      expect(locationMock.path()).toBe('');
      expect(locationMock.subscribe()).toBeDefined();
    });
  });
});
