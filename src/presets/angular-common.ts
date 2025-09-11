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
  get: jest.fn((key: string) => params[key]?.toString() || null),
  getAll: jest.fn((key: string) => Array.isArray(params[key]) ? params[key] as string[] : [params[key]?.toString()].filter(Boolean)),
  has: jest.fn((key: string) => Object.prototype.hasOwnProperty.call(params, key)),
  keys: Object.keys(params)
} satisfies jest.Mocked<Partial<ParamMap>>);

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
} satisfies jest.Mocked<Partial<ActivatedRoute>>;

// FormBuilder Mock - elegant mit jest.Mocked<Partial<FormBuilder>>
// Das ist die RICHTIGE Lösung, die Christian vorgeschlagen hat!
const FORM_BUILDER_DEFAULTS = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  control: jest.fn((formState: any, _validatorOrOpts?: any, _asyncValidator?: any) => ({
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
    setValue: jest.fn(),
    patchValue: jest.fn(),
    reset: jest.fn(),
    get: jest.fn(),
    markAsTouched: jest.fn(),
    markAsUntouched: jest.fn(),
    markAsDirty: jest.fn(),
    markAsPristine: jest.fn(),
    markAsPending: jest.fn(),
    setErrors: jest.fn(),
    getError: jest.fn(),
    hasError: jest.fn(),
    updateValueAndValidity: jest.fn(),
    setParent: jest.fn(), // KRITISCH: setParent() muss existieren!
    statusChanges: { subscribe: jest.fn() },
    valueChanges: { subscribe: jest.fn() },
    disable: jest.fn(),
    enable: jest.fn(),
    addValidators: jest.fn(),
    removeValidators: jest.fn(),
    clearValidators: jest.fn(),
    addAsyncValidators: jest.fn(),
    removeAsyncValidators: jest.fn(),
    clearAsyncValidators: jest.fn(),
    status: 'VALID',
    getRawValue: jest.fn(),
    defaultValue: undefined
  })),
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  group: jest.fn((controlsConfig: any, _options?: any) => {
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
          controls[key].setParent = jest.fn();
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
      setValue: jest.fn(),
      patchValue: jest.fn(),
      reset: jest.fn(),
      get: jest.fn((path: string) => controls[path] || null),
      addControl: jest.fn(),
      removeControl: jest.fn(),
      setControl: jest.fn(),
      contains: jest.fn(),
      markAsTouched: jest.fn(),
      markAsUntouched: jest.fn(),
      markAsDirty: jest.fn(),
      markAsPristine: jest.fn(),
      updateValueAndValidity: jest.fn(),
      setParent: jest.fn(),
      statusChanges: { subscribe: jest.fn() },
      valueChanges: { subscribe: jest.fn() },
      disable: jest.fn(),
      enable: jest.fn(),
      getRawValue: jest.fn(),
      status: 'VALID'
    };
  }),
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  array: jest.fn((controls: any, _validatorOrOpts?: any, _asyncValidator?: any) => ({
    controls: Array.isArray(controls) ? controls : [],
    length: Array.isArray(controls) ? controls.length : 0,
    at: jest.fn(),
    push: jest.fn(),
    insert: jest.fn(),
    removeAt: jest.fn(),
    setControl: jest.fn(),
    setValue: jest.fn(),
    patchValue: jest.fn(),
    reset: jest.fn(),
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
    markAsTouched: jest.fn(),
    markAsUntouched: jest.fn(),
    markAsDirty: jest.fn(),
    markAsPristine: jest.fn(),
    updateValueAndValidity: jest.fn(),
    get: jest.fn(),
    clear: jest.fn(),
    statusChanges: { subscribe: jest.fn() },
    valueChanges: { subscribe: jest.fn() },
    disable: jest.fn(),
    enable: jest.fn(),
    getRawValue: jest.fn(),
    status: 'VALID'
  })),
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  record: jest.fn((controls: any, _validatorOrOpts?: any) => ({
    controls: controls || {},
    addControl: jest.fn(),
    removeControl: jest.fn(),
    setControl: jest.fn(),
    contains: jest.fn(),
    setValue: jest.fn(),
    patchValue: jest.fn(),
    reset: jest.fn(),
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
    markAsTouched: jest.fn(),
    markAsUntouched: jest.fn(),
    markAsDirty: jest.fn(),
    markAsPristine: jest.fn(),
    updateValueAndValidity: jest.fn(),
    get: jest.fn(),
    statusChanges: { subscribe: jest.fn() },
    valueChanges: { subscribe: jest.fn() },
    disable: jest.fn(),
    enable: jest.fn(),
    getRawValue: jest.fn(),
    status: 'VALID'
  }))
} satisfies Record<keyof Pick<FormBuilder, 'control' | 'group' | 'array' | 'record'>, jest.Mock>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DOM_SANITIZER_DEFAULTS = {
  sanitize: jest.fn((context: any, value: any) => value) as any,
  bypassSecurityTrustHtml: jest.fn((value: string) => ({ __html: value } as SafeHtml)),
  bypassSecurityTrustStyle: jest.fn((value: string) => ({ __style: value } as SafeStyle)),
  bypassSecurityTrustScript: jest.fn((value: string) => ({ __script: value } as SafeScript)),
  bypassSecurityTrustUrl: jest.fn((value: string) => ({ __url: value } as SafeUrl)),
  bypassSecurityTrustResourceUrl: jest.fn((value: string) => ({ __resourceUrl: value } as SafeResourceUrl))
} satisfies jest.Mocked<Partial<DomSanitizer>>;

// Browser API Mocks
const createMockStorage = () => ({
  length: 0,
  clear: jest.fn(),
  getItem: jest.fn(() => null),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  key: jest.fn(() => null)
} satisfies jest.Mocked<Partial<Storage>>);

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
} satisfies jest.Mocked<Partial<ElementRef<T>>>);

const DOCUMENT_DEFAULTS = {
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
} satisfies jest.Mocked<Partial<Document>>;

const WINDOW_DEFAULTS = {
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
} satisfies jest.Mocked<Partial<Window & typeof globalThis>>;

const HTTP_CLIENT_DEFAULTS = {
  get: jest.fn(() => of({})) as any,
  post: jest.fn(() => of({})) as any,
  put: jest.fn(() => of({})) as any,
  delete: jest.fn(() => of({})) as any,
  patch: jest.fn(() => of({})) as any,
  head: jest.fn(() => of({})) as any,
  options: jest.fn(() => of({})) as any,
  request: jest.fn(() => of({})) as any
} satisfies jest.Mocked<Partial<HttpClient>>;

const ROUTER_DEFAULTS = {
  navigate: jest.fn(() => Promise.resolve(true)) as any,
  navigateByUrl: jest.fn(() => Promise.resolve(true)) as any,
  createUrlTree: jest.fn(() => ({} as any)) as any,
  serializeUrl: jest.fn(() => '') as any,
  parseUrl: jest.fn(() => ({} as any)) as any,
  isActive: jest.fn(() => false) as any,
  events: EMPTY as any
} satisfies jest.Mocked<Partial<Router>>;

const LOCATION_DEFAULTS = {
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
} satisfies jest.Mocked<Partial<Location>>;

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
