/**
 * @fileoverview Comprehensive Tests für Angular Core Extensions
 * 
 * @description
 * Vollständige Test-Suite für alle neuen Provider um 70%+ Coverage zu erreichen.
 * Testet: ActivatedRoute, FormBuilder, DomSanitizer, ElementRef, Document, Window, Core Bundle
 */

/* eslint-disable no-undef */

import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ElementRef } from '@angular/core';
import { of } from 'rxjs';

import {
  provideActivatedRouteMock,
  provideFormBuilderMock,
  provideDomSanitizerMock,
  provideElementRefMock,
  provideDocumentMock,
  provideWindowMock,
  provideAngularCoreMocks
} from '../presets/angular-common';
import { DOCUMENT_TOKEN, WINDOW_TOKEN } from '../types/injection-tokens';
import { CUSTOM_SERVICE_TOKEN } from '../test-tokens';

describe('Angular Core Extensions - Comprehensive Coverage Tests', () => {

  describe('provideActivatedRouteMock', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [provideActivatedRouteMock()]
      });
    });

    it('should provide ActivatedRoute with all default properties', () => {
      const route = TestBed.inject(ActivatedRoute);
      
      // Snapshot properties
      expect(route.snapshot).toBeDefined();
      expect(route.snapshot.params).toEqual({});
      expect(route.snapshot.queryParams).toEqual({});
      expect(route.snapshot.data).toEqual({});
      expect(route.snapshot.url).toEqual([]);
      expect(route.snapshot.fragment).toBeNull();
      expect(route.snapshot.outlet).toBe('primary');
      expect(route.snapshot.component).toBeNull();
      
      // Observable properties
      expect(route.params).toBeDefined();
      expect(route.queryParams).toBeDefined();
      expect(route.data).toBeDefined();
      expect(route.url).toBeDefined();
      expect(route.fragment).toBeDefined();
      
      // Route tree properties
      expect(route.outlet).toBe('primary');
      expect(route.component).toBeNull();
      expect(route.routeConfig).toBeNull();
      expect(route.root).toBeDefined();
      expect(route.parent).toBeNull();
      expect(route.firstChild).toBeNull();
      expect(route.children).toEqual([]);
      expect(route.pathFromRoot).toEqual([]);
    });

    it('should provide working paramMap with all methods', () => {
      const route = TestBed.inject(ActivatedRoute);
      const paramMap = route.snapshot.paramMap;
      
      expect(paramMap.get).toBeDefined();
      expect(paramMap.getAll).toBeDefined();
      expect(paramMap.has).toBeDefined();
      expect(paramMap.keys).toBeDefined();
      
      // Test default behavior
      expect(paramMap.get('nonexistent')).toBeNull();
      expect(paramMap.getAll('nonexistent')).toEqual([]);
      expect(paramMap.has('nonexistent')).toBe(false);
      expect(paramMap.keys).toEqual([]);
    });

    it('should provide working queryParamMap', () => {
      const route = TestBed.inject(ActivatedRoute);
      const queryParamMap = route.snapshot.queryParamMap;
      
      expect(queryParamMap.get).toBeDefined();
      expect(queryParamMap.getAll).toBeDefined();
      expect(queryParamMap.has).toBeDefined();
      expect(queryParamMap.keys).toBeDefined();
    });

    it('should support Observable subscriptions', (done) => {
      const route = TestBed.inject(ActivatedRoute);
      
      let subscriptionCount = 0;
      const checkDone = () => {
        subscriptionCount++;
        if (subscriptionCount === 5) done();
      };
      
      route.params.subscribe(params => {
        expect(params).toEqual({});
        checkDone();
      });
      
      route.queryParams.subscribe(queryParams => {
        expect(queryParams).toEqual({});
        checkDone();
      });
      
      route.data.subscribe(data => {
        expect(data).toEqual({});
        checkDone();
      });
      
      route.url.subscribe(url => {
        expect(url).toEqual([]);
        checkDone();
      });
      
      route.fragment.subscribe(fragment => {
        expect(fragment).toBeNull();
        checkDone();
      });
    });

    it('should handle paramMap and queryParamMap Observables', (done) => {
      const route = TestBed.inject(ActivatedRoute);
      
      let subscriptionCount = 0;
      const checkDone = () => {
        subscriptionCount++;
        if (subscriptionCount === 2) done();
      };
      
      route.paramMap.subscribe(paramMap => {
        expect(paramMap).toBeDefined();
        expect(paramMap.keys).toEqual([]);
        checkDone();
      });
      
      route.queryParamMap.subscribe(queryParamMap => {
        expect(queryParamMap).toBeDefined();
        expect(queryParamMap.keys).toEqual([]);
        checkDone();
      });
    });

    it('should support custom overrides for all properties', () => {
      TestBed.resetTestingModule();
      const customRoute = {
        snapshot: {
          params: { id: '123', category: 'test' },
          queryParams: { search: 'angular', page: '2' },
          data: { title: 'Test Page' },
          url: [{ path: 'test' }],
          fragment: 'section1'
        } as any,
        params: of({ id: '123' }),
        queryParams: of({ search: 'angular' }),
        data: of({ title: 'Test Page' }),
        outlet: 'sidebar',  // Fixed property name
        component: null  // Changed from string to null for type compatibility
      };
      
      TestBed.configureTestingModule({
        providers: [provideActivatedRouteMock(customRoute)]
      });

      const route = TestBed.inject(ActivatedRoute);
      
      expect(route.snapshot.params).toEqual({ id: '123', category: 'test' });
      expect(route.snapshot.queryParams).toEqual({ search: 'angular', page: '2' });
      expect(route.snapshot.data).toEqual({ title: 'Test Page' });
      expect(route.snapshot.fragment).toBe('section1');
      expect(route.outlet).toBe('sidebar');
      expect(route.component).toBeNull();
    });

    it('should handle title Observable', (done) => {
      const route = TestBed.inject(ActivatedRoute);
      
      route.title.subscribe(title => {
        expect(title).toBeUndefined();
        done();
      });
    });
  });

  describe('provideFormBuilderMock', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [provideFormBuilderMock()]
      });
    });

    it('should provide FormBuilder with all methods', () => {
      const fb = TestBed.inject(FormBuilder);
      
      expect(fb).toBeDefined();
      expect(fb.control).toBeDefined();
      expect(fb.group).toBeDefined();
      expect(fb.array).toBeDefined();
      expect(fb.record).toBeDefined();
    });

    it('should create real FormControl instances with control method', () => {
      const fb = TestBed.inject(FormBuilder);
      
      // Test with simple value
      const control1 = fb.control('test value');
      expect(control1).toBeInstanceOf(FormControl);
      expect(control1.value).toBe('test value');
      
      // Test with null
      const control2 = fb.control(null);
      expect(control2).toBeInstanceOf(FormControl);
      expect(control2.value).toBeNull();
      
      // Test with number
      const control3 = fb.control(42);
      expect(control3).toBeInstanceOf(FormControl);
      expect(control3.value).toBe(42);
      
      // Test with object
      const control4 = fb.control({ name: 'test' });
      expect(control4).toBeInstanceOf(FormControl);
      expect(control4.value).toEqual({ name: 'test' });
    });

    it('should create real FormGroup instances with group method', () => {
      const fb = TestBed.inject(FormBuilder);
      
      const group = fb.group({
        name: ['John Doe'],
        email: ['john@example.com'],
        age: [30]
      });
      
      expect(group).toBeInstanceOf(FormGroup);
      expect(group.get('name')?.value).toEqual(['John Doe']); // Arrays from FormBuilder
      expect(group.get('email')?.value).toEqual(['john@example.com']);
      expect(group.get('age')?.value).toEqual([30]);
      
      // Test group controls
      expect(group.get('name')).toBeInstanceOf(FormControl);
      expect(group.get('email')).toBeInstanceOf(FormControl);
      expect(group.get('age')).toBeInstanceOf(FormControl);
    });

    it('should handle FormGroup with FormControl instances', () => {
      const fb = TestBed.inject(FormBuilder);
      
      const nameControl = new FormControl('Custom Name');
      const emailControl = new FormControl('custom@email.com');
      
      const group = fb.group({
        name: nameControl,
        email: emailControl,
        description: ['Default description']
      });
      
      expect(group.get('name')).toBe(nameControl);
      expect(group.get('email')).toBe(emailControl);
      expect(group.get('name')?.value).toBe('Custom Name');
      expect(group.get('email')?.value).toBe('custom@email.com');
      expect(group.get('description')?.value).toEqual(['Default description']);
    });

    it('should return mock objects for array and record methods', () => {
      const fb = TestBed.inject(FormBuilder);
      
      const arrayResult = fb.array([]);
      expect(arrayResult).toBeDefined();
      expect(typeof arrayResult).toBe('object');
      
      const recordResult = fb.record({});
      expect(recordResult).toBeDefined();
      expect(typeof recordResult).toBe('object');
    });

    it('should support custom overrides', () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          provideFormBuilderMock({
            control: jest.fn(() => new FormControl('overridden value')) as any,
            group: jest.fn(() => new FormGroup({})) as any
          })
        ]
      });

      const fb = TestBed.inject(FormBuilder);
      
      const control = fb.control('ignored input');
      expect(control.value).toBe('overridden value');
      
      const group = fb.group({ test: ['ignored'] });
      expect(group).toBeInstanceOf(FormGroup);
      expect(Object.keys(group.controls)).toEqual([]);
    });

    it('should handle validators and async validators in control method', () => {
      const fb = TestBed.inject(FormBuilder);
      
      const validator = () => null;
      const asyncValidator = () => Promise.resolve(null);
      
      const control = fb.control('test', validator, asyncValidator);
      expect(control).toBeInstanceOf(FormControl);
      expect(control.value).toBe('test');
    });
  });

  describe('provideDomSanitizerMock', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [provideDomSanitizerMock()]
      });
    });

    it('should provide DomSanitizer with all methods', () => {
      const sanitizer = TestBed.inject(DomSanitizer);
      
      expect(sanitizer).toBeDefined();
      expect(sanitizer.sanitize).toBeDefined();
      expect(sanitizer.bypassSecurityTrustHtml).toBeDefined();
      expect(sanitizer.bypassSecurityTrustStyle).toBeDefined();
      expect(sanitizer.bypassSecurityTrustScript).toBeDefined();
      expect(sanitizer.bypassSecurityTrustUrl).toBeDefined();
      expect(sanitizer.bypassSecurityTrustResourceUrl).toBeDefined();
    });

    it('should handle sanitize method', () => {
      const sanitizer = TestBed.inject(DomSanitizer);
      
      const result = sanitizer.sanitize(null as any, '<script>alert("test")</script>');
      expect(result).toBe('<script>alert("test")</script>');
      
      const result2 = sanitizer.sanitize('html' as any, '<p>Safe content</p>');
      expect(result2).toBe('<p>Safe content</p>');
    });

    it('should handle bypassSecurityTrustHtml', () => {
      const sanitizer = TestBed.inject(DomSanitizer);
      
      const safeHtml = sanitizer.bypassSecurityTrustHtml('<p>Trusted HTML</p>');
      expect(safeHtml).toEqual({ __html: '<p>Trusted HTML</p>' });
      
      const safeHtml2 = sanitizer.bypassSecurityTrustHtml('<div class="content">Complex HTML</div>');
      expect(safeHtml2).toEqual({ __html: '<div class="content">Complex HTML</div>' });
    });

    it('should handle bypassSecurityTrustStyle', () => {
      const sanitizer = TestBed.inject(DomSanitizer);
      
      const safeStyle = sanitizer.bypassSecurityTrustStyle('color: red; font-size: 14px;');
      expect(safeStyle).toEqual({ __style: 'color: red; font-size: 14px;' });
    });

    it('should handle bypassSecurityTrustScript', () => {
      const sanitizer = TestBed.inject(DomSanitizer);
      
      const safeScript = sanitizer.bypassSecurityTrustScript('console.log("safe");');
      expect(safeScript).toEqual({ __script: 'console.log("safe");' });
    });

    it('should handle bypassSecurityTrustUrl', () => {
      const sanitizer = TestBed.inject(DomSanitizer);
      
      const safeUrl = sanitizer.bypassSecurityTrustUrl('https://example.com');
      expect(safeUrl).toEqual({ __url: 'https://example.com' });
      
      const safeUrl2 = sanitizer.bypassSecurityTrustUrl('javascript:void(0)');
      expect(safeUrl2).toEqual({ __url: 'javascript:void(0)' });
    });

    it('should handle bypassSecurityTrustResourceUrl', () => {
      const sanitizer = TestBed.inject(DomSanitizer);
      
      const safeResourceUrl = sanitizer.bypassSecurityTrustResourceUrl('https://trusted-resource.com/embed');
      expect(safeResourceUrl).toEqual({ __resourceUrl: 'https://trusted-resource.com/embed' });
    });

    it('should support custom overrides', () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          provideDomSanitizerMock({
            sanitize: jest.fn(() => 'custom sanitized') as any,
            bypassSecurityTrustHtml: jest.fn((value) => ({ __html: `CUSTOM: ${value}` }) as any)
          })
        ]
      });

      const sanitizer = TestBed.inject(DomSanitizer);
      
      expect(sanitizer.sanitize(null as any, 'test')).toBe('custom sanitized');
      expect(sanitizer.bypassSecurityTrustHtml('<p>test</p>')).toEqual({ __html: 'CUSTOM: <p>test</p>' });
    });
  });

  describe('provideElementRefMock', () => {
    it('should provide ElementRef with default HTMLElement', () => {
      TestBed.configureTestingModule({
        providers: [provideElementRefMock()]
      });

      const elementRef = TestBed.inject(ElementRef);
      
      expect(elementRef).toBeDefined();
      expect(elementRef.nativeElement).toBeDefined();
    });

    it('should provide nativeElement with common DOM methods', () => {
      TestBed.configureTestingModule({
        providers: [provideElementRefMock()]
      });

      const elementRef = TestBed.inject(ElementRef);
      const element = elementRef.nativeElement;
      
      expect(element.focus).toBeDefined();
      expect(element.blur).toBeDefined();
      expect(element.click).toBeDefined();
      expect(element.scrollIntoView).toBeDefined();
      expect(element.getBoundingClientRect).toBeDefined();
    });

    it('should handle getBoundingClientRect method', () => {
      TestBed.configureTestingModule({
        providers: [provideElementRefMock()]
      });

      const elementRef = TestBed.inject(ElementRef);
      const rect = elementRef.nativeElement.getBoundingClientRect();
      
      expect(rect).toEqual({
        x: 0, y: 0, width: 0, height: 0,
        top: 0, right: 0, bottom: 0, left: 0,
        toJSON: expect.any(Function)
      });
      
      // Test toJSON method
      expect(rect.toJSON()).toEqual({});
    });

    it('should support custom overrides', () => {
      TestBed.configureTestingModule({
        providers: [
          provideElementRefMock({
            nativeElement: {
              id: 'custom-element',
              className: 'test-class',
              focus: jest.fn(),
              getAttribute: jest.fn((attr) => attr === 'data-test' ? 'test-value' : null),
              setAttribute: jest.fn(),
              addEventListener: jest.fn(),
              textContent: 'Custom content'
            } as any
          })
        ]
      });

      const elementRef = TestBed.inject(ElementRef);
      const element = elementRef.nativeElement;
      
      expect(element.id).toBe('custom-element');
      expect(element.className).toBe('test-class');
      expect(element.textContent).toBe('Custom content');
      expect(element.getAttribute('data-test')).toBe('test-value');
      expect(element.getAttribute('other')).toBeNull();
    });

    it('should support generic types', () => {
      TestBed.configureTestingModule({
        providers: [provideElementRefMock<HTMLInputElement>()]
      });

      const elementRef = TestBed.inject(ElementRef<HTMLInputElement>);
      
      expect(elementRef).toBeDefined();
      expect(elementRef.nativeElement).toBeDefined();
    });

    it('should handle method calls on nativeElement', () => {
      TestBed.configureTestingModule({
        providers: [provideElementRefMock()]
      });

      const elementRef = TestBed.inject(ElementRef);
      const element = elementRef.nativeElement;
      
      // These should not throw errors
      expect(() => element.focus()).not.toThrow();
      expect(() => element.blur()).not.toThrow();
      expect(() => element.click()).not.toThrow();
      expect(() => element.scrollIntoView()).not.toThrow();
    });
  });

  describe('provideDocumentMock', () => {
    it('should provide Document mock with all methods', () => {
      TestBed.configureTestingModule({
        providers: [provideDocumentMock()]
      });

      const document = TestBed.inject(DOCUMENT_TOKEN);
      
      expect(document).toBeDefined();
      expect(document.createElement).toBeDefined();
      expect(document.getElementById).toBeDefined();
      expect(document.querySelector).toBeDefined();
      expect(document.querySelectorAll).toBeDefined();
      expect(document.addEventListener).toBeDefined();
      expect(document.removeEventListener).toBeDefined();
    });

    it('should handle createElement method', () => {
      TestBed.configureTestingModule({
        providers: [provideDocumentMock()]
      });

      const document = TestBed.inject(DOCUMENT_TOKEN);
      const element = document.createElement('div');
      
      expect(element).toBeDefined();
      expect(element.setAttribute).toBeDefined();
      expect(element.getAttribute).toBeDefined();
      expect(element.appendChild).toBeDefined();
      expect(element.removeChild).toBeDefined();
      expect(element.addEventListener).toBeDefined();
      expect(element.removeEventListener).toBeDefined();
      expect(element.click).toBeDefined();
      expect(element.focus).toBeDefined();
    });

    it('should handle query methods', () => {
      TestBed.configureTestingModule({
        providers: [provideDocumentMock()]
      });

      const document = TestBed.inject(DOCUMENT_TOKEN);
      
      expect(document.getElementById('test')).toBeNull();
      expect(document.querySelector('.test')).toBeNull();
      expect(document.querySelectorAll('div')).toEqual([]);
    });

    it('should provide document properties', () => {
      TestBed.configureTestingModule({
        providers: [provideDocumentMock()]
      });

      const document = TestBed.inject(DOCUMENT_TOKEN);
      
      expect(document.title).toBe('');
      expect(document.body).toBeDefined();
      expect(document.body.appendChild).toBeDefined();
      expect(document.body.removeChild).toBeDefined();
      expect(document.body.classList).toBeDefined();
      expect(document.body.classList.add).toBeDefined();
      expect(document.body.classList.remove).toBeDefined();
      expect(document.body.classList.contains).toBeDefined();
      expect(document.body.classList.toggle).toBeDefined();
    });

    it('should handle body classList methods', () => {
      TestBed.configureTestingModule({
        providers: [provideDocumentMock()]
      });

      const document = TestBed.inject(DOCUMENT_TOKEN);
      const classList = document.body.classList;
      
      expect(classList.contains('test')).toBe(false);
      expect(() => classList.add('test-class')).not.toThrow();
      expect(() => classList.remove('test-class')).not.toThrow();
      expect(() => classList.toggle('toggle-class')).not.toThrow();
    });

    it('should support custom overrides', () => {
      TestBed.configureTestingModule({
        providers: [
          provideDocumentMock({
            title: 'Custom Title',
            getElementById: jest.fn((id) => id === 'existing' ? { id: 'existing' } as any : null),
            querySelector: jest.fn((selector) => selector === '.found' ? { className: 'found' } as any : null)
          })
        ]
      });

      const document = TestBed.inject(DOCUMENT_TOKEN);
      
      expect(document.title).toBe('Custom Title');
      expect(document.getElementById('existing')).toEqual({ id: 'existing' });
      expect(document.getElementById('missing')).toBeNull();
      expect(document.querySelector('.found')).toEqual({ className: 'found' });
      expect(document.querySelector('.missing')).toBeNull();
    });

    it('should handle event methods', () => {
      TestBed.configureTestingModule({
        providers: [provideDocumentMock()]
      });

      const document = TestBed.inject(DOCUMENT_TOKEN);
      
      expect(() => document.addEventListener('click', () => {})).not.toThrow();
      expect(() => document.removeEventListener('click', () => {})).not.toThrow();
    });
  });

  describe('provideWindowMock', () => {
    it('should provide Window mock with all properties', () => {
      TestBed.configureTestingModule({
        providers: [provideWindowMock()]
      });

      const window = TestBed.inject(WINDOW_TOKEN);
      
      expect(window).toBeDefined();
      expect(window.navigator).toBeDefined();
      expect(window.location).toBeDefined();
      expect(window.localStorage).toBeDefined();
      expect(window.sessionStorage).toBeDefined();
      expect(window.open).toBeDefined();
      expect(window.close).toBeDefined();
      expect(window.scrollTo).toBeDefined();
    });

    it('should provide window dimensions', () => {
      TestBed.configureTestingModule({
        providers: [provideWindowMock()]
      });

      const window = TestBed.inject(WINDOW_TOKEN);
      
      expect(window.innerWidth).toBe(1024);
      expect(window.innerHeight).toBe(768);
      expect(window.scrollX).toBe(0);
      expect(window.scrollY).toBe(0);
    });

    it('should handle navigator object', () => {
      TestBed.configureTestingModule({
        providers: [provideWindowMock()]
      });

      const window = TestBed.inject(WINDOW_TOKEN);
      const navigator = window.navigator;
      
      expect(navigator.share).toBeDefined();
      expect(navigator.clipboard).toBeDefined();
      expect(navigator.clipboard.writeText).toBeDefined();
      expect(navigator.userAgent).toBe('test-agent');
      
      // Test clipboard writeText method
      expect(navigator.clipboard.writeText('test')).resolves.toBeUndefined();
    });

    it('should handle location object', () => {
      TestBed.configureTestingModule({
        providers: [provideWindowMock()]
      });

      const window = TestBed.inject(WINDOW_TOKEN);
      const location = window.location;
      
      expect(location.href).toBe('http://localhost');
      expect(location.origin).toBe('http://localhost');
      expect(location.pathname).toBe('/');
      expect(location.search).toBe('');
      expect(location.hash).toBe('');
      expect(location.reload).toBeDefined();
      expect(location.assign).toBeDefined();
      expect(location.replace).toBeDefined();
    });

    it('should handle localStorage operations', () => {
      TestBed.configureTestingModule({
        providers: [provideWindowMock()]
      });

      const window = TestBed.inject(WINDOW_TOKEN);
      const localStorage = window.localStorage;
      
      expect(localStorage.setItem).toBeDefined();
      expect(localStorage.getItem).toBeDefined();
      expect(localStorage.removeItem).toBeDefined();
      expect(localStorage.clear).toBeDefined();
      expect(localStorage.key).toBeDefined();
      expect(localStorage.length).toBe(0);
      
      // Test default behavior
      expect(localStorage.getItem('test')).toBeNull();
      expect(localStorage.key(0)).toBeNull();
    });

    it('should handle sessionStorage operations', () => {
      TestBed.configureTestingModule({
        providers: [provideWindowMock()]
      });

      const window = TestBed.inject(WINDOW_TOKEN);
      const sessionStorage = window.sessionStorage;
      
      expect(sessionStorage.setItem).toBeDefined();
      expect(sessionStorage.getItem).toBeDefined();
      expect(sessionStorage.removeItem).toBeDefined();
      expect(sessionStorage.clear).toBeDefined();
      expect(sessionStorage.key).toBeDefined();
      expect(sessionStorage.length).toBe(0);
    });

    it('should handle dialog methods', () => {
      TestBed.configureTestingModule({
        providers: [provideWindowMock()]
      });

      const window = TestBed.inject(WINDOW_TOKEN);
      
      expect(window.alert).toBeDefined();
      expect(window.confirm).toBeDefined();
      expect(window.prompt).toBeDefined();
      
      // Test default return values
      expect(window.confirm('test')).toBe(true);
      expect(window.prompt('test')).toBeNull();
      
      expect(() => window.alert('test')).not.toThrow();
    });

    it('should handle event methods', () => {
      TestBed.configureTestingModule({
        providers: [provideWindowMock()]
      });

      const window = TestBed.inject(WINDOW_TOKEN);
      
      expect(window.addEventListener).toBeDefined();
      expect(window.removeEventListener).toBeDefined();
      
      expect(() => window.addEventListener('resize', () => {})).not.toThrow();
      expect(() => window.removeEventListener('resize', () => {})).not.toThrow();
    });

    it('should handle window methods', () => {
      TestBed.configureTestingModule({
        providers: [provideWindowMock()]
      });

      const window = TestBed.inject(WINDOW_TOKEN);
      
      expect(() => window.open('https://example.com')).not.toThrow();
      expect(() => window.close()).not.toThrow();
      expect(() => window.scrollTo(0, 100)).not.toThrow();
    });

    it('should support custom overrides', () => {
      TestBed.configureTestingModule({
        providers: [
          provideWindowMock({
            innerWidth: 1920,
            innerHeight: 1080,
            location: {
              href: 'https://custom.com/path',
              pathname: '/custom-path',
              origin: 'https://custom.com'
            } as any,
            navigator: {
              userAgent: 'Custom User Agent',
              share: jest.fn().mockResolvedValue(undefined)
            } as any
          })
        ]
      });

      const window = TestBed.inject(WINDOW_TOKEN);
      
      expect(window.innerWidth).toBe(1920);
      expect(window.innerHeight).toBe(1080);
      expect(window.location.href).toBe('https://custom.com/path');
      expect(window.location.pathname).toBe('/custom-path');
      expect(window.navigator.userAgent).toBe('Custom User Agent');
    });
  });

  describe('provideAngularCoreMocks', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: provideAngularCoreMocks()
      });
    });

    it('should provide all core Angular services', () => {
      const route = TestBed.inject(ActivatedRoute);
      const fb = TestBed.inject(FormBuilder);
      const sanitizer = TestBed.inject(DomSanitizer);
      const elementRef = TestBed.inject(ElementRef);
      const document = TestBed.inject(DOCUMENT_TOKEN);
      const window = TestBed.inject(WINDOW_TOKEN);
      
      expect(route).toBeDefined();
      expect(fb).toBeDefined();
      expect(sanitizer).toBeDefined();
      expect(elementRef).toBeDefined();
      expect(document).toBeDefined();
      expect(window).toBeDefined();
    });

    it('should create functional services with defaults', () => {
      const route = TestBed.inject(ActivatedRoute);
      const fb = TestBed.inject(FormBuilder);
      const sanitizer = TestBed.inject(DomSanitizer);
      const document = TestBed.inject(DOCUMENT_TOKEN);
      const window = TestBed.inject(WINDOW_TOKEN);
      
      // Test each service has working methods
      expect(route.snapshot.params).toEqual({});
      expect(fb.control('test').value).toBe('test');
      expect(sanitizer.bypassSecurityTrustHtml('<p>test</p>')).toEqual({ __html: '<p>test</p>' });
      expect(document.createElement('div')).toBeDefined();
      expect(window.navigator.userAgent).toBe('test-agent');
    });

    it('should support selective overrides', () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: provideAngularCoreMocks({
          activatedRoute: {
            snapshot: { params: { id: '999', category: 'test' } }
          },
          window: {
            innerWidth: 800,
            innerHeight: 600
          }
        })
      });

      const route = TestBed.inject(ActivatedRoute);
      const window = TestBed.inject(WINDOW_TOKEN);
      
      expect(route.snapshot.params).toEqual({ id: '999', category: 'test' });
      expect(window.innerWidth).toBe(800);
      expect(window.innerHeight).toBe(600);
    });

    it('should return an array of providers', () => {
      const providers = provideAngularCoreMocks();
      
      expect(Array.isArray(providers)).toBe(true);
      expect(providers.length).toBeGreaterThan(0);
      
      // Each item should be a provider object
      providers.forEach(provider => {
        expect(provider).toBeDefined();
        expect(typeof provider).toBe('object');
        // Provider structure varies, so just check it's an object
      });
    });

    it('should work with other Angular services', () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          ...provideAngularCoreMocks(),
          // Add additional custom providers
          {
            provide: CUSTOM_SERVICE_TOKEN,
            useValue: { customMethod: jest.fn() }
          }
        ]
      });

      const route = TestBed.inject(ActivatedRoute);
      const customService = TestBed.inject(CUSTOM_SERVICE_TOKEN);
      
      expect(route).toBeDefined();
      expect(customService).toBeDefined();
      expect((customService as any).customMethod).toBeDefined();
    });

    it('should handle undefined overrides gracefully', () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: provideAngularCoreMocks(undefined)
      });

      const route = TestBed.inject(ActivatedRoute);
      const fb = TestBed.inject(FormBuilder);
      
      expect(route).toBeDefined();
      expect(fb).toBeDefined();
      expect(route.snapshot.params).toEqual({});
    });

    it('should handle empty overrides object', () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: provideAngularCoreMocks({})
      });

      const route = TestBed.inject(ActivatedRoute);
      const window = TestBed.inject(WINDOW_TOKEN);
      
      expect(route).toBeDefined();
      expect(window).toBeDefined();
      expect(route.snapshot.params).toEqual({});
      expect(window.innerWidth).toBe(1024);
    });
  });
});
