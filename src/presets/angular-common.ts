/**
 * @fileoverview Angular Common Service Presets
 *
 * @description
 * Ready-to-use Mocks for common Angular Common Services
 * like HttpClient, Router, Location etc.
 */

/* eslint-disable no-undef */

import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DomSanitizer, SafeHtml, SafeUrl, SafeResourceUrl, SafeScript, SafeStyle } from '@angular/platform-browser';
import { ElementRef, Provider } from '@angular/core';
import { of, EMPTY } from 'rxjs';
import { createServiceProviderFactory } from '../core/mock-factory';
import { DOCUMENT_TOKEN, WINDOW_TOKEN } from '../types/injection-tokens';

/* ====================================
 * SERVICE DEFAULTS
 * ==================================== */

// Mock ParamMap for ActivatedRoute
const createMockParamMap = (params: Record<string, string | string[]> = {}): ParamMap => ({
  get: jest.fn((key: string) => params[key]?.toString() || null),
  getAll: jest.fn((key: string) => Array.isArray(params[key]) ? params[key] as string[] : [params[key]?.toString()].filter(Boolean)),
  has: jest.fn((key: string) => key in params),
  keys: Object.keys(params)
});

const ACTIVATED_ROUTE_DEFAULTS = {
  snapshot: {
    params: {},
    queryParams: {},
    data: {},
    url: [],
    fragment: null,
    paramMap: createMockParamMap(),
    queryParamMap: createMockParamMap(),
    routeConfig: null,
    root: {} as unknown,
    parent: null,
    firstChild: null,
    children: [],
    pathFromRoot: [],
    outlet: 'primary',
    component: null,
    title: undefined
  } as any,
  params: of({}),
  queryParams: of({}),
  data: of({}),
  url: of([]),
  fragment: of(null),
  paramMap: of(createMockParamMap()),
  queryParamMap: of(createMockParamMap()),
  outlet: 'primary',
  component: null,
  title: of(undefined),
  routeConfig: null,
  root: {} as any,
  parent: null,
  firstChild: null,
  children: [],
  pathFromRoot: []
} satisfies Partial<ActivatedRoute>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FORM_BUILDER_DEFAULTS = {
  control: jest.fn((formState: any, validatorOrOpts?: any, asyncValidator?: any) => 
    new FormControl(formState, validatorOrOpts, asyncValidator)) as any,
  group: jest.fn((controlsConfig: any, options?: any) => 
    new FormGroup(controlsConfig, options)) as any,
  array: jest.fn(() => ({} as any)) as any,
  record: jest.fn(() => ({} as any)) as any
} satisfies Partial<FormBuilder>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DOM_SANITIZER_DEFAULTS = {
  sanitize: jest.fn((context: any, value: any) => value) as any,
  bypassSecurityTrustHtml: jest.fn((value: string) => ({ __html: value } as SafeHtml)),
  bypassSecurityTrustStyle: jest.fn((value: string) => ({ __style: value } as SafeStyle)),
  bypassSecurityTrustScript: jest.fn((value: string) => ({ __script: value } as SafeScript)),
  bypassSecurityTrustUrl: jest.fn((value: string) => ({ __url: value } as SafeUrl)),
  bypassSecurityTrustResourceUrl: jest.fn((value: string) => ({ __resourceUrl: value } as SafeResourceUrl))
} satisfies Partial<DomSanitizer>;

// Browser API Mocks
const createMockStorage = (): Storage => ({
  length: 0,
  clear: jest.fn(),
  getItem: jest.fn(() => null),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  key: jest.fn(() => null)
});

const ELEMENT_REF_DEFAULTS = <T = HTMLElement>(): ElementRef<T> => ({
  nativeElement: {
    focus: jest.fn(),
    blur: jest.fn(),
    click: jest.fn(),
    scrollIntoView: jest.fn(),
    getBoundingClientRect: jest.fn(() => ({
      x: 0, y: 0, width: 0, height: 0,
      top: 0, right: 0, bottom: 0, left: 0,
      toJSON: () => ({})
    }))
  } as any
});

const DOCUMENT_DEFAULTS: Partial<Document> = {
  createElement: jest.fn(() => ({
    setAttribute: jest.fn(),
    getAttribute: jest.fn(),
    appendChild: jest.fn(),
    removeChild: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    click: jest.fn(),
    focus: jest.fn()
  } as any)),
  getElementById: jest.fn(() => null),
  querySelector: jest.fn(() => null),
  querySelectorAll: jest.fn(() => [] as any),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  title: '',
  body: {
    appendChild: jest.fn(),
    removeChild: jest.fn(),
    classList: {
      add: jest.fn(),
      remove: jest.fn(),
      contains: jest.fn(() => false),
      toggle: jest.fn()
    }
  } as any
};

const WINDOW_DEFAULTS: Partial<Window & typeof globalThis> = {
  navigator: {
    share: jest.fn(),
    clipboard: { 
      writeText: jest.fn(() => Promise.resolve())
    },
    userAgent: 'test-agent'
  } as any,
  open: jest.fn(),
  close: jest.fn(),
  scrollTo: jest.fn(),
  scrollY: 0,
  scrollX: 0,
  innerWidth: 1024,
  innerHeight: 768,
  location: {
    href: 'http://localhost',
    origin: 'http://localhost',
    pathname: '/',
    search: '',
    hash: '',
    reload: jest.fn(),
    assign: jest.fn(),
    replace: jest.fn()
  } as any,
  localStorage: createMockStorage(),
  sessionStorage: createMockStorage(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  alert: jest.fn(),
  confirm: jest.fn(() => true),
  prompt: jest.fn(() => null)
};

const HTTP_CLIENT_DEFAULTS: Partial<jest.Mocked<HttpClient>> = {
  get: jest.fn(() => of({})) as any,
  post: jest.fn(() => of({})) as any,
  put: jest.fn(() => of({})) as any,
  delete: jest.fn(() => of({})) as any,
  patch: jest.fn(() => of({})) as any,
  head: jest.fn(() => of({})) as any,
  options: jest.fn(() => of({})) as any,
  request: jest.fn(() => of({})) as any
};

const ROUTER_DEFAULTS: Partial<jest.Mocked<Router>> = {
  navigate: jest.fn(() => Promise.resolve(true)) as any,
  navigateByUrl: jest.fn(() => Promise.resolve(true)) as any,
  createUrlTree: jest.fn(() => ({} as any)) as any,
  serializeUrl: jest.fn(() => '') as any,
  parseUrl: jest.fn(() => ({} as any)) as any,
  isActive: jest.fn(() => false) as any,
  events: EMPTY as any
};

const LOCATION_DEFAULTS: Partial<jest.Mocked<Location>> = {
  back: jest.fn() as any,
  forward: jest.fn() as any,
  go: jest.fn() as any,
  replaceState: jest.fn() as any,
  getState: jest.fn(() => null) as any,
  isCurrentPathEqualTo: jest.fn(() => false) as any,
  normalize: jest.fn((url: string) => url) as any,
  prepareExternalUrl: jest.fn((url: string) => url) as any,
  path: jest.fn(() => '') as any,
  subscribe: jest.fn(() => ({ unsubscribe: jest.fn(), closed: false })) as any
};

/* ====================================
 * PUBLIC API: PROVIDER FACTORIES
 * ==================================== */

/** Angular Provider for HttpClient Mock */
export const provideHttpClientMock = createServiceProviderFactory(HttpClient, HTTP_CLIENT_DEFAULTS);

/** Angular Provider for Router Mock */
export const provideRouterMock = createServiceProviderFactory(Router, ROUTER_DEFAULTS);

/** Angular Provider for Location Mock */
export const provideLocationMock = createServiceProviderFactory(Location, LOCATION_DEFAULTS);

/** Angular Provider for ActivatedRoute Mock - Highest Priority */
export const provideActivatedRouteMock = createServiceProviderFactory(ActivatedRoute, ACTIVATED_ROUTE_DEFAULTS);

/** Angular Provider for FormBuilder Mock */
export const provideFormBuilderMock = createServiceProviderFactory(FormBuilder, FORM_BUILDER_DEFAULTS);

/** Angular Provider for DomSanitizer Mock */
export const provideDomSanitizerMock = createServiceProviderFactory(DomSanitizer, DOM_SANITIZER_DEFAULTS);

/* ====================================
 * BROWSER API PROVIDERS
 * ==================================== */

/** ElementRef Mock Provider mit Generic Support */
export function provideElementRefMock<T = HTMLElement>(overrides?: Partial<ElementRef<T>>): Provider {
  const elementRefMock = { ...ELEMENT_REF_DEFAULTS<T>(), ...overrides };
  return { provide: ElementRef, useValue: elementRefMock };
}

/** Document Mock Provider */
export function provideDocumentMock(overrides?: Partial<Document>): Provider {
  const documentMock = { ...DOCUMENT_DEFAULTS, ...overrides };
  return { provide: DOCUMENT_TOKEN, useValue: documentMock };
}

/** Window Mock Provider for Token-based Injection */
export function provideWindowMock(overrides?: Partial<Window & typeof globalThis>): Provider {
  const windowMock = { ...WINDOW_DEFAULTS, ...overrides };
  return { provide: WINDOW_TOKEN, useValue: windowMock };
}

/**
 * Global Window Mock Setup
 * Mocks the global window object for components that access window directly
 * 
 * @param overrides - Custom window properties to override
 * @returns Cleanup function to restore original window
 * 
 * @example
 * ```typescript
 * describe('MyComponent', () => {
 *   let cleanup: () => void;
 *   
 *   beforeEach(() => {
 *     cleanup = setupGlobalWindowMock({
 *       location: { href: 'http://test.com' },
 *       localStorage: mockStorage
 *     });
 *   });
 *   
 *   afterEach(() => {
 *     cleanup();
 *   });
 * });
 * ```
 */
export function setupGlobalWindowMock(overrides?: Partial<Window & typeof globalThis>): () => void {
  const windowMock = { ...WINDOW_DEFAULTS, ...overrides };
  const originalWindow = global.window;
  
  // Mock global window
  (global as any).window = windowMock;
  
  // Also mock globalThis for Node.js environments
  if (typeof globalThis !== 'undefined') {
    Object.defineProperty(globalThis, 'window', {
      value: windowMock,
      writable: true,
      configurable: true
    });
  }
  
  // Return cleanup function
  return () => {
    if (originalWindow) {
      global.window = originalWindow;
    } else {
      delete (global as any).window;
    }
    
    if (typeof globalThis !== 'undefined') {
      delete (globalThis as any).window;
    }
  };
}

/**
 * Combined Window Mock Provider
 * Provides both token-based and global window mocking
 * 
 * @param options - Configuration options
 * @returns Provider array and cleanup function
 * 
 * @example
 * ```typescript
 * describe('MyComponent', () => {
 *   let cleanup: () => void;
 *   
 *   beforeEach(() => {
 *     const result = provideCompleteWindowMock({
 *       overrides: { location: { href: 'http://test.com' } },
 *       mockGlobal: true
 *     });
 *     
 *     TestBed.configureTestingModule({
 *       providers: result.providers
 *     });
 *     
 *     cleanup = result.cleanup;
 *   });
 *   
 *   afterEach(() => {
 *     cleanup?.();
 *   });
 * });
 * ```
 */
export function provideCompleteWindowMock(options?: {
  overrides?: Partial<Window & typeof globalThis>;
  mockGlobal?: boolean;
}): { providers: Provider[]; cleanup?: () => void } {
  const { overrides, mockGlobal = false } = options || {};
  
  const providers = [provideWindowMock(overrides)];
  
  if (mockGlobal) {
    const cleanup = setupGlobalWindowMock(overrides);
    return { providers, cleanup };
  }
  
  return { providers };
}

/* ====================================
 * CONVENIENCE PROVIDERS
 * ==================================== */

/**
 * Angular Core Services Bundle - Alle kritischen Services in einem Provider
 */
export function provideAngularCoreMocks(overrides?: {
  activatedRoute?: any;
  formBuilder?: any;
  domSanitizer?: any;
  elementRef?: any;
  document?: any;
  window?: any;
}): Provider[] {
  return [
    provideActivatedRouteMock(overrides?.activatedRoute),
    provideFormBuilderMock(overrides?.formBuilder),
    provideDomSanitizerMock(overrides?.domSanitizer),
    provideElementRefMock(overrides?.elementRef),
    provideDocumentMock(overrides?.document),
    provideWindowMock(overrides?.window)
  ];
}

/**
 * Convenience Provider for all Angular Common Services (Legacy)
 */
export const provideAngularCommonMocks = (): Provider[] => [
  provideHttpClientMock(),
  provideRouterMock(),
  provideLocationMock()
];
