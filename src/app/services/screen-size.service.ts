import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeService {
  private screenSize = new BehaviorSubject<string>('desktop');

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.detectScreenSize();
      fromEvent(window, 'resize').subscribe(() => {
        this.detectScreenSize();
      });
    }
  }

  private detectScreenSize(): void {
    const width = window.innerWidth;
    if (width < 768) {
      this.screenSize.next('mobile');
      //console.log('pagina en movil')
    } else {
      this.screenSize.next('desktop');
      //console.log('pagina en escritorio')
    }
  }

  get screenSize$() {
    return this.screenSize.asObservable();
  }

  getScreenSize(): string {
    return this.screenSize.getValue();
  }
}
