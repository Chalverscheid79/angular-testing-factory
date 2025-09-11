/**
 * @fileoverview Angular Material Service Presets
 *
 * @description
 * Ready-to-use Mocks for Angular Material Services
 * like MatDialog, MatSnackBar etc.
 * 
 * @note If @angular/material is not available, fallback mocks are provided
 */

import { of, EMPTY } from 'rxjs';
import { createServiceProviderFactory } from '../core/mock-factory';
import { Provider } from '@angular/core';

// Type definitions for compatibility
interface MockMatDialog {
  open: any;
  closeAll: any;
  getDialogById: any;
  openDialogs: any[];
}

interface MockMatSnackBar {
  open: any;
  openFromComponent: any;
  openFromTemplate: any;
  dismiss: any;
}

/* ====================================
 * SERVICE DEFAULTS
 * ==================================== */

const MAT_DIALOG_DEFAULTS: Partial<jest.Mocked<MockMatDialog>> = {
  open: jest.fn(() => ({
    afterClosed: jest.fn(() => of(undefined)),
    afterOpened: jest.fn(() => of(undefined)),
    beforeClosed: jest.fn(() => of(undefined)),
    backdropClick: jest.fn(() => EMPTY),
    keydownEvents: jest.fn(() => EMPTY),
    updatePosition: jest.fn(),
    updateSize: jest.fn(),
    addPanelClass: jest.fn(),
    removePanelClass: jest.fn(),
    close: jest.fn(),
    getState: jest.fn(() => 0),
    id: 'mock-dialog',
    componentInstance: {} as any
  } as any)) as any,
  closeAll: jest.fn() as any,
  getDialogById: jest.fn(() => null) as any,
  openDialogs: []
};

const MAT_SNACK_BAR_DEFAULTS: Partial<jest.Mocked<MockMatSnackBar>> = {
  open: jest.fn(() => ({
    afterDismissed: jest.fn(() => of({ dismissedByAction: false })),
    afterOpened: jest.fn(() => of()),
    onAction: jest.fn(() => EMPTY),
    dismiss: jest.fn(),
    dismissWithAction: jest.fn(),
    instance: {} as any
  } as any)) as any,
  openFromComponent: jest.fn(() => ({
    afterDismissed: jest.fn(() => of({ dismissedByAction: false })),
    afterOpened: jest.fn(() => of()),
    onAction: jest.fn(() => EMPTY),
    dismiss: jest.fn(),
    dismissWithAction: jest.fn(),
    instance: {} as any
  } as any)) as any,
  openFromTemplate: jest.fn(() => ({
    afterDismissed: jest.fn(() => of({ dismissedByAction: false })),
    afterOpened: jest.fn(() => of()),
    onAction: jest.fn(() => EMPTY),
    dismiss: jest.fn(),
    dismissWithAction: jest.fn(),
    instance: {} as any
  } as any)) as any,
  dismiss: jest.fn() as any
};

// Mock-Token für Tests (falls Angular Material nicht verfügbar)
const MAT_DIALOG_TOKEN = 'MAT_DIALOG_MOCK';
const MAT_SNACK_BAR_TOKEN = 'MAT_SNACK_BAR_MOCK';

/* ====================================
 * PUBLIC API: PROVIDER FACTORIES
 * ==================================== */

/** Angular Provider for MatDialog Mock */
export const provideMatDialogMock = (overrides: Partial<jest.Mocked<MockMatDialog>> = {}): Provider =>
  createServiceProviderFactory(MAT_DIALOG_TOKEN, MAT_DIALOG_DEFAULTS)(overrides);

/** Angular Provider for MatSnackBar Mock */
export const provideMatSnackBarMock = (overrides: Partial<jest.Mocked<MockMatSnackBar>> = {}): Provider =>
  createServiceProviderFactory(MAT_SNACK_BAR_TOKEN, MAT_SNACK_BAR_DEFAULTS)(overrides);

/**
 * Convenience Provider for all Angular Material Services
 */
export const provideAngularMaterialMocks = (): Provider[] => [
  provideMatDialogMock(),
  provideMatSnackBarMock()
];
