/**
 * @fileoverview Angular Material Service Presets
 *
 * @description
 * Ready-to-use Mocks für Angular Material Services
 * wie MatDialog, MatSnackBar etc.
 */

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snackbar';
import { of, EMPTY } from 'rxjs';
import { createMockService, createMockProvider } from '../core/mock-factory';
import { Provider } from '@angular/core';

/* ====================================
 * SERVICE DEFAULTS
 * ==================================== */

const MAT_DIALOG_DEFAULTS: Partial<jest.Mocked<MatDialog>> = {
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
  } as MatDialogRef<any>)),
  closeAll: jest.fn(),
  getDialogById: jest.fn(() => null),
  openDialogs: []
};

const MAT_SNACK_BAR_DEFAULTS: Partial<jest.Mocked<MatSnackBar>> = {
  open: jest.fn(() => ({
    afterDismissed: jest.fn(() => of({ dismissedByAction: false })),
    afterOpened: jest.fn(() => of()),
    onAction: jest.fn(() => EMPTY),
    dismiss: jest.fn(),
    dismissWithAction: jest.fn(),
    instance: {} as any
  } as MatSnackBarRef<any>)),
  openFromComponent: jest.fn(() => ({
    afterDismissed: jest.fn(() => of({ dismissedByAction: false })),
    afterOpened: jest.fn(() => of()),
    onAction: jest.fn(() => EMPTY),
    dismiss: jest.fn(),
    dismissWithAction: jest.fn(),
    instance: {} as any
  } as MatSnackBarRef<any>)),
  openFromTemplate: jest.fn(() => ({
    afterDismissed: jest.fn(() => of({ dismissedByAction: false })),
    afterOpened: jest.fn(() => of()),
    onAction: jest.fn(() => EMPTY),
    dismiss: jest.fn(),
    dismissWithAction: jest.fn(),
    instance: {} as any
  } as MatSnackBarRef<any>)),
  dismiss: jest.fn()
};

/* ====================================
 * CONVENIENCE FACTORIES
 * ==================================== */

const createMockMatDialog = (overrides: Partial<jest.Mocked<MatDialog>> = {}) =>
  createMockService(MAT_DIALOG_DEFAULTS, overrides);

const createMockMatSnackBar = (overrides: Partial<jest.Mocked<MatSnackBar>> = {}) =>
  createMockService(MAT_SNACK_BAR_DEFAULTS, overrides);

/* ====================================
 * PUBLIC API: PROVIDER FACTORIES
 * ==================================== */

/** Angular Provider für MatDialog Mock */
export const provideMatDialogMock = (overrides: Partial<jest.Mocked<MatDialog>> = {}): Provider =>
  createMockProvider(MatDialog, createMockMatDialog(overrides));

/** Angular Provider für MatSnackBar Mock */
export const provideMatSnackBarMock = (overrides: Partial<jest.Mocked<MatSnackBar>> = {}): Provider =>
  createMockProvider(MatSnackBar, createMockMatSnackBar(overrides));

/**
 * Convenience Provider für alle Angular Material Services
 */
export const provideAngularMaterialMocks = (): Provider[] => [
  provideMatDialogMock(),
  provideMatSnackBarMock()
];
