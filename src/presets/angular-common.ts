/**
 * @fileoverview Angular Common Service Presets
 *
 * @description
 * Ready-to-use Mocks for common Angular Common Services
 * like HttpClient, Router, Location etc.
 */

/* eslint-disable no-undef */

import { vi } from 'vitest';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer, SafeHtml, SafeUrl, SafeResourceUrl, SafeScript, SafeStyle } from '@angular/platform-browser';
import { ElementRef, Provider } from '@angular/core';
import { of, EMPTY } from 'rxjs';
import { createServiceProviderFactory } from '../core/mock-factory';
import { DOCUMENT_TOKEN, WINDOW_TOKEN } from '../types/injection-tokens';

/* ====================================
 * SERVICE DEFAULTS
 * ==================================== */

// Mock ParamMap for ActivatedRoute
const createMockParamMap = (params: Record<string, string | string[]> = {}) => ({
  get: vi.fn((key: string) => params[key]?.toString() || null),
  getAll: vi.fn((key: string) => Array.isArray(params[key]) ? params[key] as string[] : [params[key]?.toString()].filter(Boolean)),
  has: vi.fn((key: string) => Object.prototype.hasOwnProperty.call(params, key)),
  keys: Object.keys(params)
} satisfies Mock<Partial<ParamMap>>);

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
} satisfies Mock<Partial<ActivatedRoute>>;

// FormBuilder Mock - elegant mit Mock<Partial<FormBuilder>>
// Das ist die RICHTIGE Lösung, die Christian vorgeschlagen hat!
const FORM_BUILDER_DEFAULTS = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  control: vi.fn((formState: any, _validatorOrOpts?: any, _asyncValidator?: any) => ({
    value: Array.isArray(formState) ? formState[0] : formState,
    valid: true,
    invalid: false,
    pending: false,
    disabled: false,
    enabled: true,
    errors: null,
    pristine: true,
    dirty: false,
    touched: false,
    untouched: true,
    parent: null,
    setValue: vi.fn(),
    patchValue: vi.fn(),
    reset: vi.fn(),
    get: vi.fn(),
    markAsTouched: vi.fn(),
    markAsUntouched: vi.fn(),
    markAsDirty: vi.fn(),
    markAsPristine: vi.fn(),
    markAsPending: vi.fn(),
    setErrors: vi.fn(),
    getError: vi.fn(),
    hasError: vi.fn(),
    updateValueAndValidity: vi.fn(),
    setParent: vi.fn(), // KRITISCH: setParent() muss existieren!
    statusChanges: { subscribe: vi.fn() },
    valueChanges: { subscribe: vi.fn() },
    disable: vi.fn(),
    enable: vi.fn(),
    addValidators: vi.fn(),
    removeValidators: vi.fn(),
    clearValidators: vi.fn(),
    addAsyncValidators: vi.fn(),
    removeAsyncValidators: vi.fn(),
    clearAsyncValidators: vi.fn(),
    status: 'VALID',
    getRawValue: vi.fn(),
    defaultValue: undefined
  })),
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  group: vi.fn((controlsConfig: any, _options?: any) => {
    const controls: Record<string, any> = {};
    const value: Record<string, any> = {};
    
    if (controlsConfig) {
      Object.keys(controlsConfig).forEach(key => {
        const config = controlsConfig[key];
        
        if (config && typeof config === 'object' && 'setValue' in config) {
          controls[key] = config;
          value[key] = config.value;
        } else if (Array.isArray(config)) {
          const controlValue = config[0];
          controls[key] = FORM_BUILDER_DEFAULTS.control!(controlValue);
          value[key] = controlValue;
        } else {
          controls[key] = FORM_BUILDER_DEFAULTS.control!(config);
          value[key] = config;
        }
        
        // Stelle sicher, dass setParent verfügbar ist
        if (controls[key] && typeof controls[key].setParent !== 'function') {
          controls[key].setParent = vi.fn();
        }
      });
    }

    return {
      controls,
      value,
      valid: true,
      invalid: false,
      pending: false,
      disabled: false,
      enabled: true,
      errors: null,
      pristine: true,
      dirty: false,
      touched: false,
      untouched: true,
      parent: null,
      setValue: vi.fn(),
      patchValue: vi.fn(),
      reset: vi.fn(),
      get: vi.fn((path: string) => controls[path] || null),
      addControl: vi.fn(),
      removeControl: vi.fn(),
      setControl: vi.fn(),
      contains: vi.fn(),
      markAsTouched: vi.fn(),
      markAsUntouched: vi.fn(),
      markAsDirty: vi.fn(),
      markAsPristine: vi.fn(),
      updateValueAndValidity: vi.fn(),
      setParent: vi.fn(),
      statusChanges: { subscribe: vi.fn() },
      valueChanges: { subscribe: vi.fn() },
      disable: vi.fn(),
      enable: vi.fn(),
      getRawValue: vi.fn(),
      status: 'VALID'
    };
  }),
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  array: vi.fn((controls: any, _validatorOrOpts?: any, _asyncValidator?: any) => ({
    controls: Array.isArray(controls) ? controls : [],
    length: Array.isArray(controls) ? controls.length : 0,
    at: vi.fn(),
    push: vi.fn(),
    insert: vi.fn(),
    removeAt: vi.fn(),
    setControl: vi.fn(),
    setValue: vi.fn(),
    patchValue: vi.fn(),
    reset: vi.fn(),
    value: [],
    valid: true,
    invalid: false,
    pending: false,
    disabled: false,
    enabled: true,
    errors: null,
    pristine: true,
    dirty: false,
    touched: false,
    untouched: true,
    markAsTouched: vi.fn(),
    markAsUntouched: vi.fn(),
    markAsDirty: vi.fn(),
    markAsPristine: vi.fn(),
    updateValueAndValidity: vi.fn(),
    get: vi.fn(),
    clear: vi.fn(),
    statusChanges: { subscribe: vi.fn() },
    valueChanges: { subscribe: vi.fn() },
    disable: vi.fn(),
    enable: vi.fn(),
    getRawValue: vi.fn(),
    status: 'VALID'
  })),
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  record: vi.fn((controls: any, _validatorOrOpts?: any) => ({
    controls: controls || {},
    addControl: vi.fn(),
    removeControl: vi.fn(),
    setControl: vi.fn(),
    contains: vi.fn(),
    setValue: vi.fn(),
    patchValue: vi.fn(),
    reset: vi.fn(),
    value: {},
    valid: true,
    invalid: false,
    pending: false,
    disabled: false,
    enabled: true,
    errors: null,
    pristine: true,
    dirty: false,
    touched: false,
    untouched: true,
    markAsTouched: vi.fn(),
    markAsUntouched: vi.fn(),
    markAsDirty: vi.fn(),
    markAsPristine: vi.fn(),
    updateValueAndValidity: vi.fn(),
    get: vi.fn(),
    statusChanges: { subscribe: vi.fn() },
    valueChanges: { subscribe: vi.fn() },
    disable: vi.fn(),
    enable: vi.fn(),
    getRawValue: vi.fn(),
    status: 'VALID'
  }))
} satisfies Record<keyof Pick<FormBuilder, 'control' | 'group' | 'array' | 'record'>, jest.Mock>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DOM_SANITIZER_DEFAULTS = {
  sanitize: vi.fn((context: any, value: any) => value) as any,
  bypassSecurityTrustHtml: vi.fn((value: string) => ({ __html: value } as SafeHtml)),
  bypassSecurityTrustStyle: vi.fn((value: string) => ({ __style: value } as SafeStyle)),
  bypassSecurityTrustScript: vi.fn((value: string) => ({ __script: value } as SafeScript)),
  bypassSecurityTrustUrl: vi.fn((value: string) => ({ __url: value } as SafeUrl)),
  bypassSecurityTrustResourceUrl: vi.fn((value: string) => ({ __resourceUrl: value } as SafeResourceUrl))
} satisfies Mock<Partial<DomSanitizer>>;

// Browser API Mocks
const createMockStorage = () => ({
  length: 0,
  clear: vi.fn(),
  getItem: vi.fn(() => null),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  key: vi.fn(() => null)
} satisfies Mock<Partial<Storage>>);

const ELEMENT_REF_DEFAULTS = <T = HTMLElement>(): ElementRef<T> => ({
  nativeElement: {
    focus: vi.fn(),
    blur: vi.fn(),
    click: vi.fn(),
    scrollIntoView: vi.fn(),
    getBoundingClientRect: vi.fn(() => ({
      x: 0, y: 0, width: 0, height: 0,
      top: 0, right: 0, bottom: 0, left: 0,
      toJSON: () => ({})
    }))
  } as any
} satisfies Mock<Partial<ElementRef<T>>>);

const DOCUMENT_DEFAULTS = {
  createElement: vi.fn(() => ({
    setAttribute: vi.fn(),
    getAttribute: vi.fn(),
    appendChild: vi.fn(),
    removeChild: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    click: vi.fn(),
    focus: vi.fn()
  } as any)),
  getElementById: vi.fn(() => null),
  querySelector: vi.fn(() => null),
  querySelectorAll: vi.fn(() => [] as any),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  title: '',
  body: {
    appendChild: vi.fn(),
    removeChild: vi.fn(),
    classList: {
      add: vi.fn(),
      remove: vi.fn(),
      contains: vi.fn(() => false),
      toggle: vi.fn()
    }
  } as any
} satisfies Mock<Partial<Document>>;

const WINDOW_DEFAULTS = {
  navigator: {
    share: vi.fn(),
    clipboard: { 
      writeText: vi.fn(() => Promise.resolve())
    },
    userAgent: 'test-agent'
  } as any,
  open: vi.fn(),
  close: vi.fn(),
  scrollTo: vi.fn(),
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
    reload: vi.fn(),
    assign: vi.fn(),
    replace: vi.fn()
  } as any,
  localStorage: createMockStorage(),
  sessionStorage: createMockStorage(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  alert: vi.fn(),
  confirm: vi.fn(() => true),
  prompt: vi.fn(() => null)
} satisfies Mock<Partial<Window & typeof globalThis>>;

const HTTP_CLIENT_DEFAULTS = {
  get: vi.fn(() => of({})) as any,
  post: vi.fn(() => of({})) as any,
  put: vi.fn(() => of({})) as any,
  delete: vi.fn(() => of({})) as any,
  patch: vi.fn(() => of({})) as any,
  head: vi.fn(() => of({})) as any,
  options: vi.fn(() => of({})) as any,
  request: vi.fn(() => of({})) as any
} satisfies Mock<Partial<HttpClient>>;

const ROUTER_DEFAULTS = {
  navigate: vi.fn(() => Promise.resolve(true)) as any,
  navigateByUrl: vi.fn(() => Promise.resolve(true)) as any,
  createUrlTree: vi.fn(() => ({} as any)) as any,
  serializeUrl: vi.fn(() => '') as any,
  parseUrl: vi.fn(() => ({} as any)) as any,
  isActive: vi.fn(() => false) as any,
  events: EMPTY as any
} satisfies Mock<Partial<Router>>;

const LOCATION_DEFAULTS = {
  back: vi.fn() as any,
  forward: vi.fn() as any,
  go: vi.fn() as any,
  replaceState: vi.fn() as any,
  getState: vi.fn(() => null) as any,
  isCurrentPathEqualTo: vi.fn(() => false) as any,
  normalize: vi.fn((url: string) => url) as any,
  prepareExternalUrl: vi.fn((url: string) => url) as any,
  path: vi.fn(() => '') as any,
  subscribe: vi.fn(() => ({ unsubscribe: vi.fn(), closed: false })) as any
} satisfies Mock<Partial<Location>>;

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
