import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ScreenSizeService } from './screen-size.service';
import { HomeComponent } from '../components/home/home.component';
import { HomeMobileComponent } from '../components/home-mobile/home-mobile.component';

@Injectable({ providedIn: 'root' })
export class ScreenSizeResolver implements Resolve<any> {

  constructor(private screenSizeService: ScreenSizeService) {}

  resolve() {
    const componentToDisplay = this.screenSizeService.getScreenSize() === 'mobile' ? HomeMobileComponent : HomeComponent;
    return componentToDisplay;
  }
}
