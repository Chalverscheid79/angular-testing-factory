// Vitest Setup File - Forces Angular Form Mocks
// This ensures that Angular Form classes are mocked globally
import { vi } from 'vitest';
import '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

// Initialize Angular TestBed environment
TestBed.initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);


// Mock Angular Forms
vi.mock('@angular/forms', () => {
  class MockFormControl {
    constructor(formState: any, validatorOrOpts?: any, asyncValidator?: any) {
      this.value = Array.isArray(formState) ? formState[0] : formState;
      this.valid = true;
      this.invalid = false;
      this.pending = false;
      this.disabled = false;
      this.enabled = true;
      this.errors = null;
      this.pristine = true;
      this.dirty = false;
      this.touched = false;
      this.untouched = true;
      this.parent = null;
      this.setValue = vi.fn();
      this.patchValue = vi.fn();
      this.reset = vi.fn();
      this.get = vi.fn();
      this.markAsTouched = vi.fn();
      this.markAsUntouched = vi.fn();
      this.markAsDirty = vi.fn();
      this.markAsPristine = vi.fn();
      this.markAsPending = vi.fn();
      this.setErrors = vi.fn();
      this.getError = vi.fn();
      this.hasError = vi.fn();
      this.updateValueAndValidity = vi.fn();
      this.setParent = vi.fn();
    }

    value: any;
    valid: boolean;
    invalid: boolean;
    pending: boolean;
    disabled: boolean;
    enabled: boolean;
    errors: any;
    pristine: boolean;
    dirty: boolean;
    touched: boolean;
    untouched: boolean;
    parent: any;
    setValue: any;
    patchValue: any;
    reset: any;
    get: any;
    markAsTouched: any;
    markAsUntouched: any;
    markAsDirty: any;
    markAsPristine: any;
    markAsPending: any;
    setErrors: any;
    getError: any;
    hasError: any;
    updateValueAndValidity: any;
    setParent: any;
  }

  class MockFormGroup {
    constructor(controlsConfig?: any, options?: any) {
      this.controls = {};
      this.value = {};
      
      if (controlsConfig) {
        Object.keys(controlsConfig).forEach(key => {
          const config = controlsConfig[key];
          
          if (config && typeof config === 'object' && 'setValue' in config) {
            this.controls[key] = config;
            this.value[key] = config.value;
          } else if (Array.isArray(config)) {
            const controlValue = config[0];
            this.controls[key] = new MockFormControl(controlValue);
            this.value[key] = controlValue;
          } else {
            this.controls[key] = new MockFormControl(config);
            this.value[key] = config;
          }
          
          if (this.controls[key] && this.controls[key].setParent) {
            this.controls[key].setParent = vi.fn();
          }
        });
      }
      
      this.valid = true;
      this.invalid = false;
      this.pending = false;
      this.disabled = false;
      this.enabled = true;
      this.errors = null;
      this.pristine = true;
      this.dirty = false;
      this.touched = false;
      this.untouched = true;
      this.parent = null;
      this.setValue = vi.fn();
      this.patchValue = vi.fn();
      this.reset = vi.fn();
      this.get = vi.fn((path: string) => this.controls[path] || null);
      this.addControl = vi.fn();
      this.removeControl = vi.fn();
      this.setControl = vi.fn();
      this.contains = vi.fn();
      this.markAsTouched = vi.fn();
      this.markAsUntouched = vi.fn();
      this.markAsDirty = vi.fn();
      this.markAsPristine = vi.fn();
      this.updateValueAndValidity = vi.fn();
      this.setParent = vi.fn();
    }

    controls: any;
    value: any;
    valid: boolean;
    invalid: boolean;
    pending: boolean;
    disabled: boolean;
    enabled: boolean;
    errors: any;
    pristine: boolean;
    dirty: boolean;
    touched: boolean;
    untouched: boolean;
    parent: any;
    setValue: any;
    patchValue: any;
    reset: any;
    get: any;
    addControl: any;
    removeControl: any;
    setControl: any;
    contains: any;
    markAsTouched: any;
    markAsUntouched: any;
    markAsDirty: any;
    markAsPristine: any;
    updateValueAndValidity: any;
    setParent: any;
  }

  class MockFormBuilder {
    control(formState: any, validatorOrOpts?: any, asyncValidator?: any) {
      return new MockFormControl(formState, validatorOrOpts, asyncValidator);
    }

    group(controlsConfig: any, options?: any) {
      return new MockFormGroup(controlsConfig, options);
    }

    array(controls: any, validatorOrOpts?: any, asyncValidator?: any) {
      return {
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
        get: vi.fn()
      };
    }

    record(controls: any, validatorOrOpts?: any, asyncValidator?: any) {
      return {
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
        get: vi.fn()
      };
    }
  }

  const MockValidators = {
    required: vi.fn(),
    email: vi.fn(),
    min: vi.fn(),
    max: vi.fn(),
    minLength: vi.fn(),
    maxLength: vi.fn(),
    pattern: vi.fn(),
    requiredTrue: vi.fn(),
    compose: vi.fn(),
    composeAsync: vi.fn(),
    nullValidator: vi.fn()
  };

  return {
    FormControl: MockFormControl,
    FormGroup: MockFormGroup,
    FormBuilder: MockFormBuilder,
    Validators: MockValidators
  };
});
