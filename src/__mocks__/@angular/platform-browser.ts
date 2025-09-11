/**
 * Mock for @angular/platform-browser
 */

export interface SafeHtml {
  __html: string;
}

export interface SafeUrl {
  __url: string;
}

export interface SafeResourceUrl {
  __resourceUrl: string;
}

export interface SafeScript {
  __script: string;
}

export interface SafeStyle {
  __style: string;
}

export class DomSanitizer {
  sanitize(context: any, value: any): any {
    return value;
  }
  
  bypassSecurityTrustHtml(value: string): SafeHtml {
    return { __html: value };
  }
  
  bypassSecurityTrustStyle(value: string): SafeStyle {
    return { __style: value };
  }
  
  bypassSecurityTrustScript(value: string): SafeScript {
    return { __script: value };
  }
  
  bypassSecurityTrustUrl(value: string): SafeUrl {
    return { __url: value };
  }
  
  bypassSecurityTrustResourceUrl(value: string): SafeResourceUrl {
    return { __resourceUrl: value };
  }
}
