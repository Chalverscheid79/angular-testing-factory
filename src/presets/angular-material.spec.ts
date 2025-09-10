import {
  provideMatDialogMock,
  provideMatSnackBarMock,
  provideAngularMaterialMocks
} from './angular-material';

describe('Angular Material Presets', () => {
  describe('provideMatDialogMock', () => {
    it('should create MatDialog provider with defaults', () => {
      const provider = provideMatDialogMock() as any;
      
      expect(provider.provide).toBe('MAT_DIALOG_MOCK');
      expect(provider.useValue).toBeDefined();
      expect(provider.useValue.open).toBeDefined();
      expect(provider.useValue.closeAll).toBeDefined();
    });

    it('should apply overrides correctly', () => {
      const mockOpen = jest.fn(() => ({ close: jest.fn() }));
      const provider = provideMatDialogMock({
        open: mockOpen as any
      }) as any;
      
      expect(provider.useValue.open).toBe(mockOpen);
    });

    it('should have functional mock methods', () => {
      const provider = provideMatDialogMock() as any;
      const mockService = provider.useValue;
      
      // Test that open returns a mock dialog ref
      const dialogRef = mockService.open();
      expect(dialogRef).toBeDefined();
      expect(typeof dialogRef.afterClosed).toBe('function');
      expect(typeof dialogRef.close).toBe('function');
    });

    it('should handle dialog lifecycle methods', () => {
      const provider = provideMatDialogMock() as any;
      const dialogMock = provider.useValue;
      
      const dialogRef = dialogMock.open();
      
      // Test all dialog ref methods exist
      expect(typeof dialogRef.afterClosed).toBe('function');
      expect(typeof dialogRef.afterOpened).toBe('function');
      expect(typeof dialogRef.beforeClosed).toBe('function');
      expect(typeof dialogRef.backdropClick).toBe('function');
      expect(typeof dialogRef.keydownEvents).toBe('function');
      expect(typeof dialogRef.updatePosition).toBe('function');
      expect(typeof dialogRef.updateSize).toBe('function');
      expect(typeof dialogRef.addPanelClass).toBe('function');
      expect(typeof dialogRef.removePanelClass).toBe('function');
      expect(typeof dialogRef.close).toBe('function');
      expect(typeof dialogRef.getState).toBe('function');
    });

    it('should have dialog properties', () => {
      const provider = provideMatDialogMock() as any;
      const dialogMock = provider.useValue;
      
      const dialogRef = dialogMock.open();
      
      expect(dialogRef.id).toBe('mock-dialog');
      expect(dialogRef.componentInstance).toBeDefined();
    });

    it('should handle dialog management methods', () => {
      const provider = provideMatDialogMock() as any;
      const dialogMock = provider.useValue;
      
      // Test closeAll
      expect(typeof dialogMock.closeAll).toBe('function');
      dialogMock.closeAll();
      
      // Test getDialogById
      expect(typeof dialogMock.getDialogById).toBe('function');
      const result = dialogMock.getDialogById('test-id');
      expect(result).toBeNull();
      
      // Test openDialogs array
      expect(Array.isArray(dialogMock.openDialogs)).toBe(true);
    });

    it('should allow complex dialog scenarios', () => {
      const customDialogRef = {
        afterClosed: jest.fn(() => ({ subscribe: jest.fn() })),
        close: jest.fn()
      };
      
      const provider = provideMatDialogMock({
        open: jest.fn(() => customDialogRef) as any,
        openDialogs: [customDialogRef] as any
      }) as any;
      
      const dialogMock = provider.useValue;
      
      const ref = dialogMock.open();
      expect(ref).toBe(customDialogRef);
      expect(dialogMock.openDialogs).toContain(customDialogRef);
    });
  });

  describe('provideMatSnackBarMock', () => {
    it('should create MatSnackBar provider with defaults', () => {
      const provider = provideMatSnackBarMock() as any;
      
      expect(provider.provide).toBe('MAT_SNACK_BAR_MOCK');
      expect(provider.useValue).toBeDefined();
      expect(provider.useValue.open).toBeDefined();
      expect(provider.useValue.dismiss).toBeDefined();
    });

    it('should apply overrides correctly', () => {
      const mockOpen = jest.fn(() => ({ dismiss: jest.fn() }));
      const provider = provideMatSnackBarMock({
        open: mockOpen as any
      }) as any;
      
      expect(provider.useValue.open).toBe(mockOpen);
    });

    it('should have functional mock methods', () => {
      const provider = provideMatSnackBarMock() as any;
      const mockService = provider.useValue;
      
      // Test that open returns a mock snack bar ref
      const snackBarRef = mockService.open();
      expect(snackBarRef).toBeDefined();
      expect(typeof snackBarRef.afterDismissed).toBe('function');
      expect(typeof snackBarRef.dismiss).toBe('function');
    });

    it('should handle all snackbar opening methods', () => {
      const provider = provideMatSnackBarMock() as any;
      const snackBarMock = provider.useValue;
      
      // Test all opening methods exist and return refs
      const openRef = snackBarMock.open();
      const componentRef = snackBarMock.openFromComponent();
      const templateRef = snackBarMock.openFromTemplate();
      
      expect(openRef).toBeDefined();
      expect(componentRef).toBeDefined();
      expect(templateRef).toBeDefined();
      
      // All should have similar interface
      [openRef, componentRef, templateRef].forEach(ref => {
        expect(typeof ref.afterDismissed).toBe('function');
        expect(typeof ref.afterOpened).toBe('function');
        expect(typeof ref.onAction).toBe('function');
        expect(typeof ref.dismiss).toBe('function');
        expect(typeof ref.dismissWithAction).toBe('function');
        expect(ref.instance).toBeDefined();
      });
    });

    it('should handle snackbar lifecycle', () => {
      const provider = provideMatSnackBarMock() as any;
      const snackBarMock = provider.useValue;
      
      // Test dismiss functionality
      expect(typeof snackBarMock.dismiss).toBe('function');
      snackBarMock.dismiss();
      
      const snackBarRef = snackBarMock.open();
      
      // Test ref lifecycle methods
      snackBarRef.dismiss();
      snackBarRef.dismissWithAction();
      
      // These should not throw
      expect(() => {
        snackBarRef.afterDismissed();
        snackBarRef.afterOpened();
        snackBarRef.onAction();
      }).not.toThrow();
    });

    it('should allow complex snackbar scenarios', () => {
      const customSnackRef = {
        afterDismissed: jest.fn(() => ({ subscribe: jest.fn() })),
        dismiss: jest.fn(),
        instance: { message: 'Custom message' }
      };
      
      const provider = provideMatSnackBarMock({
        open: jest.fn(() => customSnackRef) as any
      }) as any;
      
      const snackBarMock = provider.useValue;
      
      const ref = snackBarMock.open('Test message');
      expect(ref).toBe(customSnackRef);
      expect(ref.instance.message).toBe('Custom message');
    });
  });

  describe('provideAngularMaterialMocks', () => {
    it('should return array of all material service providers', () => {
      const providers = provideAngularMaterialMocks();
      
      expect(Array.isArray(providers)).toBe(true);
      expect(providers).toHaveLength(2);
      
      // Check that we get the right provider tokens
      const provideTokens = providers.map((p: any) => p.provide);
      expect(provideTokens).toContain('MAT_DIALOG_MOCK');
      expect(provideTokens).toContain('MAT_SNACK_BAR_MOCK');
    });

    it('should create independent provider instances', () => {
      const providers1 = provideAngularMaterialMocks();
      const providers2 = provideAngularMaterialMocks();
      
      expect(providers1).not.toBe(providers2);
      expect(providers1).toHaveLength(providers2.length);
    });

    it('should provide functional services', () => {
      const providers = provideAngularMaterialMocks();
      
      providers.forEach(provider => {
        const mockService = (provider as any).useValue;
        expect(mockService).toBeDefined();
        
        // Each service should have callable methods
        if ((provider as any).provide === 'MAT_DIALOG_MOCK') {
          expect(typeof mockService.open).toBe('function');
          expect(typeof mockService.closeAll).toBe('function');
        } else if ((provider as any).provide === 'MAT_SNACK_BAR_MOCK') {
          expect(typeof mockService.open).toBe('function');
          expect(typeof mockService.dismiss).toBe('function');
        }
      });
    });
  });

  describe('Provider Factory Pattern', () => {
    it('should create new instances with different overrides', () => {
      const provider1 = provideMatDialogMock({ 
        openDialogs: ['dialog1'] as any 
      }) as any;
      const provider2 = provideMatDialogMock({ 
        openDialogs: ['dialog2'] as any 
      }) as any;
      
      expect(provider1.useValue.openDialogs).toEqual(['dialog1']);
      expect(provider2.useValue.openDialogs).toEqual(['dialog2']);
      expect(provider1.useValue).not.toBe(provider2.useValue);
    });

    it('should handle dialog state management', () => {
      let dialogCount = 0;
      
      const provider = provideMatDialogMock({
        open: jest.fn(() => {
          dialogCount++;
          return { 
            id: `dialog-${dialogCount}`,
            close: jest.fn(() => { dialogCount--; })
          };
        }) as any
      }) as any;
      
      const dialogMock = provider.useValue;
      
      const dialog1 = dialogMock.open();
      const dialog2 = dialogMock.open();
      
      expect(dialog1.id).toBe('dialog-1');
      expect(dialog2.id).toBe('dialog-2');
      expect(dialogCount).toBe(2);
      
      dialog1.close();
      expect(dialogCount).toBe(1);
    });

    it('should handle snackbar action scenarios', () => {
      let lastAction: string | null = null;
      
      const provider = provideMatSnackBarMock({
        open: jest.fn(() => ({
          onAction: jest.fn(() => ({ subscribe: (callback: any) => callback('ACTION_CLICKED') })),
          afterDismissed: jest.fn(() => ({ subscribe: (callback: any) => {
            setTimeout(() => callback({ dismissedByAction: lastAction !== null }), 10);
          }})),
          dismissWithAction: jest.fn(() => { lastAction = 'DISMISS_ACTION'; })
        })) as any
      }) as any;
      
      const snackBarMock = provider.useValue;
      const ref = snackBarMock.open();
      
      // Test action handling
      ref.onAction().subscribe((action: string) => {
        expect(action).toBe('ACTION_CLICKED');
      });
      
      ref.dismissWithAction();
      expect(lastAction).toBe('DISMISS_ACTION');
    });
  });

  describe('provideAngularMaterialMocks', () => {
    it('should return array of all Angular Material service providers', () => {
      const providers = provideAngularMaterialMocks();
      
      expect(Array.isArray(providers)).toBe(true);
      expect(providers).toHaveLength(2);
      
      // Verify that each provider has correct structure
      providers.forEach(provider => {
        expect(provider).toHaveProperty('provide');
        expect(provider).toHaveProperty('useValue');
      });
    });

    it('should include MatDialog provider', () => {
      const providers = provideAngularMaterialMocks() as any[];
      const dialogProvider = providers.find(p => p.provide === 'MAT_DIALOG_MOCK');
      
      expect(dialogProvider).toBeDefined();
      expect(dialogProvider.useValue.open).toBeDefined();
      expect(dialogProvider.useValue.closeAll).toBeDefined();
    });

    it('should include MatSnackBar provider', () => {
      const providers = provideAngularMaterialMocks() as any[];
      const snackBarProvider = providers.find(p => p.provide === 'MAT_SNACK_BAR_MOCK');
      
      expect(snackBarProvider).toBeDefined();
      expect(snackBarProvider.useValue.open).toBeDefined();
      expect(snackBarProvider.useValue.dismiss).toBeDefined();
    });

    it('should create independent instances each call', () => {
      const providers1 = provideAngularMaterialMocks() as any[];
      const providers2 = provideAngularMaterialMocks() as any[];
      
      // Different provider instances
      expect(providers1).not.toBe(providers2);
      
      // But same structure
      expect(providers1).toHaveLength(providers2.length);
      
      // Each useValue should be different instance
      expect(providers1[0].useValue).not.toBe(providers2[0].useValue);
    });

    it('should work together with other Angular services', () => {
      const materialProviders = provideAngularMaterialMocks();
      
      // Should be able to use in TestBed configuration
      expect(materialProviders).toHaveLength(2);
      
      const [dialogProvider, snackBarProvider] = materialProviders as any[];
      
      // Test dialog functionality
      const dialogRef = dialogProvider.useValue.open();
      expect(dialogRef.close).toBeDefined();
      
      // Test snackbar functionality  
      const snackBarRef = snackBarProvider.useValue.open();
      expect(snackBarRef.dismiss).toBeDefined();
    });
  });

  describe('Default Mock Function Execution', () => {
    it('should execute all MatDialog default methods', () => {
      const provider = provideMatDialogMock() as any;
      const dialogMock = provider.useValue;
      
      // Test open method and all dialog ref methods
      const dialogRef = dialogMock.open();
      expect(dialogRef.afterClosed()).toBeDefined();
      expect(dialogRef.afterOpened()).toBeDefined();
      expect(dialogRef.beforeClosed()).toBeDefined();
      expect(dialogRef.backdropClick()).toBeDefined();
      expect(dialogRef.keydownEvents()).toBeDefined();
      
      // Test void methods
      dialogRef.updatePosition();
      dialogRef.updateSize();
      dialogRef.addPanelClass('test');
      dialogRef.removePanelClass('test');
      dialogRef.close();
      
      // Test properties
      expect(dialogRef.getState()).toBe(0);
      expect(dialogRef.id).toBe('mock-dialog');
      expect(dialogRef.componentInstance).toBeDefined();
      
      // Test other dialog methods
      dialogMock.closeAll();
      expect(dialogMock.getDialogById('test')).toBeNull();
      expect(dialogMock.openDialogs).toEqual([]);
    });

    it('should execute all MatSnackBar default methods', () => {
      const provider = provideMatSnackBarMock() as any;
      const snackBarMock = provider.useValue;
      
      // Test open method
      const snackBarRef1 = snackBarMock.open();
      expect(snackBarRef1.afterDismissed()).toBeDefined();
      expect(snackBarRef1.afterOpened()).toBeDefined();
      expect(snackBarRef1.onAction()).toBeDefined();
      snackBarRef1.dismiss();
      snackBarRef1.dismissWithAction();
      expect(snackBarRef1.instance).toBeDefined();
      
      // Test openFromComponent method
      const snackBarRef2 = snackBarMock.openFromComponent();
      expect(snackBarRef2.afterDismissed()).toBeDefined();
      expect(snackBarRef2.afterOpened()).toBeDefined();
      expect(snackBarRef2.onAction()).toBeDefined();
      snackBarRef2.dismiss();
      snackBarRef2.dismissWithAction();
      expect(snackBarRef2.instance).toBeDefined();
      
      // Test openFromTemplate method
      const snackBarRef3 = snackBarMock.openFromTemplate();
      expect(snackBarRef3.afterDismissed()).toBeDefined();
      expect(snackBarRef3.afterOpened()).toBeDefined();
      expect(snackBarRef3.onAction()).toBeDefined();
      snackBarRef3.dismiss();
      snackBarRef3.dismissWithAction();
      expect(snackBarRef3.instance).toBeDefined();
      
      // Test dismiss method
      snackBarMock.dismiss();
    });
  });
});
