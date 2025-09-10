/**
 * @fileoverview Angular Common Service Presets
 *
 * @description
 * Ready-to-use Mocks für häufige Angular Common Services
 * wie HttpClient, Router, Location etc.
 */

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { of, EMPTY } from 'rxjs';
import { createServiceProviderFactory } from '../core/mock-factory';
import { Provider } from '@angular/core';

/* ====================================
 * SERVICE DEFAULTS
 * ==================================== */

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

/** Angular Provider für HttpClient Mock */
export const provideHttpClientMock = createServiceProviderFactory(HttpClient, HTTP_CLIENT_DEFAULTS);

/** Angular Provider für Router Mock */
export const provideRouterMock = createServiceProviderFactory(Router, ROUTER_DEFAULTS);

/** Angular Provider für Location Mock */
export const provideLocationMock = createServiceProviderFactory(Location, LOCATION_DEFAULTS);

/**
 * Convenience Provider für alle Angular Common Services
 */
export const provideAngularCommonMocks = (): Provider[] => [
  provideHttpClientMock(),
  provideRouterMock(),
  provideLocationMock()
];
