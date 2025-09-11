/**
 * Mock for @angular/forms
 */

/* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars */

export class FormControl {
  value: unknown;
  valid = true;
  invalid = false;
  pending = false;
  disabled = false;
  enabled = true;
  errors: Record<string, unknown> | null = null;
  pristine = true;
  dirty = false;
  touched = false;
  untouched = true;
  parent: FormGroup | null = null;
  
  constructor(value: unknown = null, validatorOrOpts?: unknown, asyncValidator?: unknown) {
    this.value = value;
  }
  
  setValue(value: unknown): void {
    this.value = value;
    this.markAsDirty();
  }
  
  patchValue(value: unknown): void {
    this.setValue(value);
  }
  
  reset(value?: unknown): void {
    this.value = value || null;
    this.markAsPristine();
    this.markAsUntouched();
  }
  
  get(path: string | (string | number)[]): FormControl | null {
    return null;
  }
  
  // Status methods
  markAsTouched(): void { this.touched = true; this.untouched = false; }
  markAsUntouched(): void { this.touched = false; this.untouched = true; }
  markAsDirty(): void { this.dirty = true; this.pristine = false; }
  markAsPristine(): void { this.dirty = false; this.pristine = true; }
  markAsPending(): void { this.pending = true; }
  
  // Validation methods
  setErrors(errors: Record<string, unknown> | null): void { this.errors = errors; }
  getError(errorCode: string): unknown { return this.errors?.[errorCode] || null; }
  hasError(errorCode: string): boolean { return !!this.errors?.[errorCode]; }
  
  updateValueAndValidity(): void {
    // Mock implementation
  }
  
  // Parent relationship - CRITICAL for Angular's FormGroup
  setParent(parent: FormGroup | null): void {
    this.parent = parent;
  }
}

export class FormGroup {
  controls: Record<string, FormControl> = {};
  valid = true;
  invalid = false;
  pending = false;
  disabled = false;
  enabled = true;
  errors: Record<string, unknown> | null = null;
  pristine = true;
  dirty = false;
  touched = false;
  untouched = true;
  value: Record<string, unknown> = {};
  parent: FormGroup | null = null;
  
  constructor(controls: Record<string, unknown>, options?: unknown) {
    this.controls = Object.keys(controls).reduce((acc, key) => {
      const controlConfig = controls[key];
      let control: FormControl;
      
      if (controlConfig instanceof FormControl) {
        control = controlConfig;
      } else if (Array.isArray(controlConfig) && controlConfig.length > 1) {
        // Handle Angular FormBuilder API: [value, validators, asyncValidators]
        // Only if array has more than one element (second would be validators)
        const [value] = controlConfig;
        control = new FormControl(value);
      } else {
        // Simple value (including single-element arrays)
        control = new FormControl(controlConfig);
      }
      
      control.setParent(this); // Set parent relationship
      acc[key] = control;
      return acc;
    }, {} as Record<string, FormControl>);
    this.updateValue();
  }
  
  private updateValue(): void {
    this.value = Object.keys(this.controls).reduce((acc, key) => {
      acc[key] = this.controls[key].value;
      return acc;
    }, {} as Record<string, unknown>);
  }
  
  setValue(value: Record<string, unknown>): void {
    Object.keys(value).forEach(key => {
      if (this.controls[key]) {
        this.controls[key].setValue(value[key]);
      }
    });
    this.updateValue();
    this.markAsDirty();
  }
  
  patchValue(value: Record<string, unknown>): void {
    Object.keys(value).forEach(key => {
      if (this.controls[key]) {
        this.controls[key].patchValue(value[key]);
      }
    });
    this.updateValue();
  }
  
  reset(value?: Record<string, unknown>): void {
    Object.keys(this.controls).forEach(key => {
      this.controls[key].reset(value?.[key]);
    });
    this.updateValue();
    this.markAsPristine();
    this.markAsUntouched();
  }
  
  get(path: string): FormControl | null {
    return this.controls[path] || null;
  }
  
  // Control management
  addControl(name: string, control: FormControl): void {
    control.setParent(this);
    this.controls[name] = control;
    this.updateValue();
  }
  
  removeControl(name: string): void {
    if (this.controls[name]) {
      this.controls[name].setParent(null);
      delete this.controls[name];
      this.updateValue();
    }
  }
  
  setControl(name: string, control: FormControl): void {
    if (this.controls[name]) {
      this.controls[name].setParent(null);
    }
    control.setParent(this);
    this.controls[name] = control;
    this.updateValue();
  }
  
  contains(path: string): boolean {
    return Object.prototype.hasOwnProperty.call(this.controls, path);
  }
  
  // Status methods
  markAsTouched(): void {
    this.touched = true;
    this.untouched = false;
    Object.values(this.controls).forEach(control => control.markAsTouched());
  }
  
  markAsUntouched(): void {
    this.touched = false;
    this.untouched = true;
    Object.values(this.controls).forEach(control => control.markAsUntouched());
  }
  
  markAsDirty(): void {
    this.dirty = true;
    this.pristine = false;
  }
  
  markAsPristine(): void {
    this.dirty = false;
    this.pristine = true;
    Object.values(this.controls).forEach(control => control.markAsPristine());
  }
  
  updateValueAndValidity(): void {
    this.updateValue();
    // Mock implementation for validation
  }
  
  // Parent relationship
  setParent(parent: FormGroup | null): void {
    this.parent = parent;
  }
}

export class FormBuilder {
  group(controls: Record<string, unknown>, options?: unknown): FormGroup {
    return new FormGroup(controls, options);
  }
  
  control(value: unknown, validator?: unknown, asyncValidator?: unknown): FormControl {
    return new FormControl(value, validator, asyncValidator);
  }
  
  array(controls: FormControl[], validator?: unknown, asyncValidator?: unknown): FormArray {
    return {
      controls,
      length: controls.length,
      at: (index: number) => controls[index],
      push: (control: FormControl) => {
        control.setParent(null); // Mock parent relationship
        controls.push(control);
      },
      insert: (index: number, control: FormControl) => {
        control.setParent(null);
        controls.splice(index, 0, control);
      },
      removeAt: (index: number) => {
        if (controls[index]) {
          controls[index].setParent(null);
          controls.splice(index, 1);
        }
      },
      setControl: (index: number, control: FormControl) => {
        if (controls[index]) {
          controls[index].setParent(null);
        }
        control.setParent(null);
        controls[index] = control;
      },
      setValue: jest.fn(),
      patchValue: jest.fn(),
      reset: jest.fn(),
      value: controls.map(c => c.value),
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
      get: jest.fn()
    } as FormArray;
  }
  
  record(controls: Record<string, FormControl>, validator?: unknown, asyncValidator?: unknown): FormRecord {
    Object.values(controls).forEach(control => control.setParent(null));
    
    return {
      controls,
      addControl: (name: string, control: FormControl) => {
        control.setParent(null);
        controls[name] = control;
      },
      removeControl: (name: string) => {
        if (controls[name]) {
          controls[name].setParent(null);
          delete controls[name];
        }
      },
      setControl: (name: string, control: FormControl) => {
        if (controls[name]) {
          controls[name].setParent(null);
        }
        control.setParent(null);
        controls[name] = control;
      },
      contains: (path: string) => Object.prototype.hasOwnProperty.call(controls, path),
      setValue: jest.fn(),
      patchValue: jest.fn(),
      reset: jest.fn(),
      value: Object.keys(controls).reduce((acc, key) => {
        acc[key] = controls[key].value;
        return acc;
      }, {} as Record<string, unknown>),
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
      get: jest.fn()
    } as FormRecord;
  }
}

// Define FormArray and FormRecord interfaces for better typing
interface FormArray {
  controls: FormControl[];
  length: number;
  at(index: number): FormControl;
  push(control: FormControl): void;
  insert(index: number, control: FormControl): void;
  removeAt(index: number): void;
  setControl(index: number, control: FormControl): void;
  setValue(value: unknown[]): void;
  patchValue(value: unknown[]): void;
  reset(value?: unknown[]): void;
  value: unknown[];
  valid: boolean;
  invalid: boolean;
  pending: boolean;
  disabled: boolean;
  enabled: boolean;
  errors: Record<string, unknown> | null;
  pristine: boolean;
  dirty: boolean;
  touched: boolean;
  untouched: boolean;
  markAsTouched(): void;
  markAsUntouched(): void;
  markAsDirty(): void;
  markAsPristine(): void;
  updateValueAndValidity(): void;
  get(path: string | number): FormControl | null;
}

interface FormRecord {
  controls: Record<string, FormControl>;
  addControl(name: string, control: FormControl): void;
  removeControl(name: string): void;
  setControl(name: string, control: FormControl): void;
  contains(path: string): boolean;
  setValue(value: Record<string, unknown>): void;
  patchValue(value: Record<string, unknown>): void;
  reset(value?: Record<string, unknown>): void;
  value: Record<string, unknown>;
  valid: boolean;
  invalid: boolean;
  pending: boolean;
  disabled: boolean;
  enabled: boolean;
  errors: Record<string, unknown> | null;
  pristine: boolean;
  dirty: boolean;
  touched: boolean;
  untouched: boolean;
  markAsTouched(): void;
  markAsUntouched(): void;
  markAsDirty(): void;
  markAsPristine(): void;
  updateValueAndValidity(): void;
  get(path: string): FormControl | null;
}

// Validators Mock - Essential part of FormBuilder API
export class Validators {
  static required = jest.fn().mockReturnValue(null);
  static requiredTrue = jest.fn().mockReturnValue(null);
  static email = jest.fn().mockReturnValue(null);
  static min = jest.fn().mockReturnValue(jest.fn().mockReturnValue(null));
  static max = jest.fn().mockReturnValue(jest.fn().mockReturnValue(null));
  static minLength = jest.fn().mockReturnValue(jest.fn().mockReturnValue(null));
  static maxLength = jest.fn().mockReturnValue(jest.fn().mockReturnValue(null));
  static pattern = jest.fn().mockReturnValue(jest.fn().mockReturnValue(null));
  static nullValidator = jest.fn().mockReturnValue(null);
  
  // Composed validators
  static compose = jest.fn().mockReturnValue(jest.fn().mockReturnValue(null));
  static composeAsync = jest.fn().mockReturnValue(jest.fn().mockReturnValue(null));
}
