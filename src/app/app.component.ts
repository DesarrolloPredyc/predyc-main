import { Component, ComponentFactoryResolver, ViewContainerRef, Inject, Type, PLATFORM_ID } from '@angular/core';
import { ScreenSizeService } from './services/screen-size.service';
import { ActivatedRoute, NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { HomeMobileComponent } from './components/home-mobile/home-mobile.component';
import { HomeComponent } from './components/home/home.component';
import { SeoService } from './services/seo.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { MenuMobileComponent } from './menu-mobile/menu-mobile.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { IconService } from './services/icon.service';
import { BrowserModule, Meta, Title } from '@angular/platform-browser';
import { filter } from 'rxjs';
import { resolve } from 'path';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [
    CommonModule,
    RouterOutlet,
    MenuComponent,
    MenuMobileComponent,
    CarouselModule,
    // BrowserModule,
    RouterModule,
  ],
  providers: [
    IconService,
  ],
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Predyc';
  isDesktop: boolean = false;
  loaded: boolean
  defaultMetaDescription: string = "Revista de Mantenimiento, Confiabilidad y Gestión de Activos. Más de 350 Artículos Gratis: Mantenimiento predictivo, preventivo, correctivo, industrial."
    
  constructor(
    private screenSizeService: ScreenSizeService,
    private router: Router,
    @Inject(PLATFORM_ID) private platform: Object,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private metaService: Meta,
    private seo: SeoService
  ) {
    this.isDesktop = false;
  }

  showMobileMenu: boolean = true;


  ngOnInit() {
    this.screenSizeService.screenSize$.subscribe(size => {
      this.isDesktop = size === 'desktop';
      this.loaded = true
      //this.router.navigate([this.isDesktop ? '/home' : '/home-mobile']);
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.showMobileMenu = !this.router.url.includes('landing');
      if (isPlatformBrowser(this.platform)) {

        let currentUrl = this.router.url;
        console.log('currentUrl', currentUrl);

        // Guardar la URL de entrada en sessionStorage si no existe
        if (!sessionStorage.getItem('initialUrl')) {
          sessionStorage.setItem('initialUrl', currentUrl);
        }

        var rt = this.getChild(this.activatedRoute)
        rt.data.subscribe(resolvedData => {
          console.log("resolvedData", resolvedData);
          const data = resolvedData?.data ? resolvedData.data : resolvedData
          let existingTag = null
          this.titleService.setTitle(data?.title ? data.title : "Predyc - Capacitación Industrial")

          existingTag = this.metaService.getTag("name='description'")
          if (data.description) {
            if (existingTag) {
              this.metaService.updateTag({ name: 'description', content: data.description })
            } else {
              this.metaService.addTag({ name: 'description', content: data.description })
            }
          } else {
            if (existingTag) {
              this.metaService.removeTag("name='description'")
            }
          }

          if (data.robots) {
            this.metaService.updateTag({ name: 'robots', content: data.robots })
          } else {
            this.metaService.updateTag({ name: 'robots', content: "nofollow, noindex" })
          }

          existingTag = this.metaService.getTag("property='og:url'")
          if (data.ogUrl) {
            if (existingTag) {
              this.metaService.updateTag({ property: 'og:url', content: data.ogUrl })
            } else {
              this.metaService.addTag({ property: 'og:url', content: data.ogUrl })
            }
          } else {
            this.metaService.updateTag({ property: 'og:url', content: this.router.url })
          }

          existingTag = this.metaService.getTag("property='og:title'")
          if (data.ogTitle) {
            if (existingTag) {
              this.metaService.updateTag({ property: 'og:title', content: data.ogTitle })
            } else {
              this.metaService.addTag({ property: 'og:title', content: data.ogTitle })
            }
          } else {
            if (existingTag) {
              this.metaService.removeTag("property='og:title'")
            }
          }

          existingTag = this.metaService.getTag("property='og:description'")
          if (data.ogDescription) {
            if (existingTag) {
              this.metaService.updateTag({ property: 'og:description', content: data.ogDescription })
            } else {
              this.metaService.addTag({ property: 'og:description', content: data.ogDescription })
            }
          } else {
            if (existingTag) {
              this.metaService.removeTag("property='og:description'")
            }
          }

          existingTag = this.metaService.getTag("property='og:image'")
          if (data.ogImage) {
            if (existingTag) {
              this.metaService.updateTag({ property: 'og:image', content: data.ogImage })
            } else {
              this.metaService.addTag({ property: 'og:image', content: data.ogImage })
            }
          } else {
            if (existingTag) {
              this.metaService.removeTag("property='og:image'")
            }
          }

          existingTag = this.metaService.getTag("name='keywords'")
          if (data.keywords) {
            if (existingTag) {
              this.metaService.updateTag({ name: 'keywords', content: data.keywords })
            } else {
              this.metaService.addTag({ name: 'keywords', content: data.keywords })
            }
          } else {
            if (existingTag) {
              this.metaService.removeTag("name='keywords'")
            }
          }
          this.seo.removeCanonicalURL()
          if (data.canonical) {
            this.seo.setCanonicalURL(data.canonical)
          } else {
            this.seo.setCanonicalURL("https://predyc.com")
          }
        })
      }
    });

 
  }

  getChild(activatedRoute: ActivatedRoute) {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }
  }

  checkMenu(){
      
  }
}