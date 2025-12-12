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
import { vi, type Mock } from 'vitest';

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

const MAT_DIALOG_DEFAULTS: Partial<{ [K in keyof MockMatDialog]: Mock<any> }> = {
  open: vi.fn(() => ({
    afterClosed: vi.fn(() => of(undefined)),
    afterOpened: vi.fn(() => of(undefined)),
    beforeClosed: vi.fn(() => of(undefined)),
    backdropClick: vi.fn(() => EMPTY),
    keydownEvents: vi.fn(() => EMPTY),
    updatePosition: vi.fn(),
    updateSize: vi.fn(),
    addPanelClass: vi.fn(),
    removePanelClass: vi.fn(),
    close: vi.fn(),
    getState: vi.fn(() => 0),
    id: 'mock-dialog',
    componentInstance: {} as any
  } as any)) as any,
  closeAll: vi.fn() as any,
  getDialogById: vi.fn(() => null) as any,
  openDialogs: []
};

const MAT_SNACK_BAR_DEFAULTS: Partial<{ [K in keyof MockMatSnackBar]: Mock<any> }> = {
  open: vi.fn(() => ({
    afterDismissed: vi.fn(() => of({ dismissedByAction: false })),
    afterOpened: vi.fn(() => of()),
    onAction: vi.fn(() => EMPTY),
    dismiss: vi.fn(),
    dismissWithAction: vi.fn(),
    instance: {} as any
  } as any)) as any,
  openFromComponent: vi.fn(() => ({
    afterDismissed: vi.fn(() => of({ dismissedByAction: false })),
    afterOpened: vi.fn(() => of()),
    onAction: vi.fn(() => EMPTY),
    dismiss: vi.fn(),
    dismissWithAction: vi.fn(),
    instance: {} as any
  } as any)) as any,
  openFromTemplate: vi.fn(() => ({
    afterDismissed: vi.fn(() => of({ dismissedByAction: false })),
    afterOpened: vi.fn(() => of()),
    onAction: vi.fn(() => EMPTY),
    dismiss: vi.fn(),
    dismissWithAction: vi.fn(),
    instance: {} as any
  } as any)) as any,
  dismiss: vi.fn() as any
};

// Mock-Token für Tests (falls Angular Material nicht verfügbar)
const MAT_DIALOG_TOKEN = 'MAT_DIALOG_MOCK';
const MAT_SNACK_BAR_TOKEN = 'MAT_SNACK_BAR_MOCK';

/* ====================================
 * PUBLIC API: PROVIDER FACTORIES
 * ==================================== */

/** Angular Provider for MatDialog Mock */
export const provideMatDialogMock = (overrides: Partial<{ [K in keyof MockMatDialog]: Mock<any> }> = {}): Provider =>
  createServiceProviderFactory(MAT_DIALOG_TOKEN, MAT_DIALOG_DEFAULTS)(overrides);

/** Angular Provider for MatSnackBar Mock */
export const provideMatSnackBarMock = (overrides: Partial<{ [K in keyof MockMatSnackBar]: Mock<any> }> = {}): Provider =>
  createServiceProviderFactory(MAT_SNACK_BAR_TOKEN, MAT_SNACK_BAR_DEFAULTS)(overrides);

/**
 * Convenience Provider for all Angular Material Services
 */
export const provideAngularMaterialMocks = (): Provider[] => [
  provideMatDialogMock(),
  provideMatSnackBarMock()
];
