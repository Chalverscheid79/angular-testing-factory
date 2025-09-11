/**
 * Mock for @angular/forms
 */

/* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars */

export class FormControl {
  value: unknown;
  
  constructor(value: unknown = null, validator?: unknown, asyncValidator?: unknown) {
    this.value = value;
  }
  
  setValue(value: unknown): void {
    this.value = value;
  }
  
  patchValue(value: unknown): void {
    this.value = value;
  }
  
  get(path: string): FormControl | null {
    return null;
  }
}

export class FormGroup {
  controls: Record<string, FormControl> = {};
  
  constructor(controls: Record<string, unknown>, options?: unknown) {
    this.controls = Object.keys(controls).reduce((acc, key) => {
      acc[key] = controls[key] instanceof FormControl ? controls[key] : new FormControl(controls[key]);
      return acc;
    }, {} as Record<string, FormControl>);
  }
  
  get(path: string): FormControl | null {
    return this.controls[path] || null;
  }
  
  setValue(value: Record<string, unknown>): void {
    Object.keys(value).forEach(key => {
      if (this.controls[key]) {
        this.controls[key].setValue(value[key]);
      }
    });
  }
  
  patchValue(value: Record<string, unknown>): void {
    this.setValue(value);
  }
}

export class FormBuilder {
  control(formState: unknown, validatorOrOpts?: unknown, asyncValidator?: unknown): FormControl {
    return new FormControl(formState, validatorOrOpts, asyncValidator);
  }
  
  group(controlsConfig: Record<string, unknown>, options?: unknown): FormGroup {
    return new FormGroup(controlsConfig, options);
  }
  
  array(): unknown {
    return {} as unknown;
  }
  
  record(): unknown {
    return {} as unknown;
  }
}
