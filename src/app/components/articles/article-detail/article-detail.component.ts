import { CommonModule, isPlatformBrowser, registerLocaleData } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, LOCALE_ID, PLATFORM_ID, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { IconService } from '../../../services/icon.service';
import { ScreenSizeService } from '../../../services/screen-size.service';
import { SeoService } from '../../../services/seo.service';
import { ArticleService, ArticleWithAuthorName } from '../../../shared/services/article.service';
import { AuthorService } from '../../../shared/services/author.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs);

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [FlexLayoutModule, CommonModule, RouterModule],
  providers: [IconService,{ provide: LOCALE_ID, useValue: 'es-ES' }],
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.css'
})
export class ArticleDetailComponent {
  constructor(
    public icon: IconService,
    public articleService: ArticleService,
    public authorService: AuthorService,
    private route: ActivatedRoute,
    private titleService: Title,
    private screenSizeService: ScreenSizeService,
    private seo: SeoService,
    @Inject(PLATFORM_ID) private platform: Object,
    private elRef: ElementRef, private renderer: Renderer2,
    private routerR: Router

  ){}

  articleSlug = this.route.snapshot.paramMap.get('slug');

  article: ArticleWithAuthorName;
  isMobile = false

  public isBrowser: boolean;

  routeSubscription: Subscription
  screenSubscription: Subscription

  ngOnInit() {


    // this.isBrowser = isPlatformBrowser(this.platform);
    // if (this.isBrowser) {
    //   this.screenSizeService.screenSize$.subscribe(size => {
    //     this.isMobile = size === 'mobile';
    //   });
    // }
    
    this.routeSubscription = this.route.data.subscribe((result: {data: any}) => {
      const articleWithAuthorName: ArticleWithAuthorName = result.data.articleWithAuthorName
      this.article = articleWithAuthorName
      console.log(this.article)

      if(this.article.categories.find(x=>x.name == 'Guía')){
        this.showIndice = true
      }

      let categories = this.article?.categories?.map(element => {
        return element.name
      });

      console.log('categories',categories)

      if(categories && categories.length>0){
        this.categories = categories.join(' ');

      }

      this.article?.courses?.forEach(cursoRelacionado => {
        cursoRelacionado['duracionFormatted'] = this.getFormattedDuration(cursoRelacionado.duracion)
        //getFormattedDuration
      });
      this.processArticleHTML()
    })

  }


  ngAfterViewInit(): void {
    this.screenSubscription = this.screenSizeService.screenSize$.subscribe(size => {
      this.isMobile = size === 'mobile';
      this.loadedHTML = true
    }); 
  }

  showIndice = false
  categories = ''

  loaded = false;
  loadedHTML = false
  ngOnDestroy() {
    if (this.routeSubscription) this.routeSubscription.unsubscribe()
    if (this.screenSubscription) this.screenSubscription.unsubscribe()
    if (isPlatformBrowser(this.platform)) {
      this.seo.removeTags()
    }
  }

  articleHTML

  tocItems: { id: string, title: string, level: string }[] = [];

  processArticleHTML() {
    if (isPlatformBrowser(this.platform)) {
      this.tocItems = [];
      const parser = new DOMParser();
      const doc = parser.parseFromString(this.article['dataHTML'], 'text/html');
  
      // Obtener todos los h2 y h3
      const headers = doc.querySelectorAll('h2, h3');
      let h2Index = 0;
      let h3Index = 0;
  
      headers.forEach((header, index) => {
        const id = `toc_${index}`;
        header.id = id;
  
        // Añadir al array tocItems
        this.tocItems.push({
          id: id,
          title: header.textContent || 'Sin título',
          level: header.tagName.toLowerCase(),  // 'h2' o 'h3'
        });
  
        // Seleccionar el elemento real en el DOM del componente basado en el tipo
        let realElement;
        if (header.tagName.toLowerCase() === 'h2') {
          h2Index++;
          realElement = this.elRef.nativeElement.querySelectorAll('h2')[h2Index - 1];
        } else if (header.tagName.toLowerCase() === 'h3') {
          h3Index++;
          realElement = this.elRef.nativeElement.querySelectorAll('h3')[h3Index - 1];
        }
  
        // Asignar el id al elemento real
        if (realElement) {
          // console.log('realElement', realElement);
          this.renderer.setAttribute(realElement, 'id', id);
        }
      });
  
      // Actualizar el contenido HTML procesado con los nuevos ids
      this.article['dataHTML'] = doc.body.innerHTML;
      this.articleHTML = doc.body.innerHTML;
      this.loaded = true;
      
      setTimeout(() => {
        this.setupIntersectionObserver()
      }, 200);
    }
  }

  scrollToElement(id: string, level: string, title: string) {
    if (isPlatformBrowser(this.platform)) {
      const element = document.getElementById(id);
  
      if (element) {
        const offset = 70; // Ajuste del offset para considerar el header fijo
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - offset;
    
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      } else {
        // Si no se encuentra el elemento por ID, buscar por el texto y nivel del encabezado
        this.scrollToElementByTextAndLevel(title, level);
      }
    }

  }
  
  scrollToElementByTextAndLevel(title: string, level: string) {
    if (isPlatformBrowser(this.platform)) {
      const selector = level === 'h2' ? 'h2' : 'h3';
      const headers = Array.from(document.querySelectorAll(selector));
      
      const matchingHeader = headers.find(header => {
        // Obtiene el texto contenido en el header y sus hijos
        const headerText = header.textContent || '';
        return headerText === title;
      });
    
      if (matchingHeader) {
        const offset = 70; // Ajuste del offset para considerar el header fijo
        const elementPosition = matchingHeader.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - offset;
    
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
  }


  getFormattedDuration(tiempo) {
    const hours = Math.floor(tiempo / 60);
    const minutes = tiempo % 60;
    return `${hours} hrs ${minutes} min`;
  }
  


  setupIntersectionObserver() {
    const options = {
      root: null, // Usa la vista como raíz
      rootMargin: '0px',
      threshold: 0.1 // Se activa cuando el 10% del encabezado es visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.highlightTOCItem(entry.target);
        }
      });
    }, options);

    // Observa todos los elementos h2 y h3
    const headers = this.elRef.nativeElement.querySelectorAll('h2, h3');
    // console.log('headers',headers)
    headers.forEach(header => {
      observer.observe(header);
    });
  }

  highlightTOCItem(headerElement: Element) {
    const headerText = headerElement.textContent.trim();
    const headerTag = headerElement.tagName.toLowerCase();
  
    // Elimina la clase activa de todos los elementos de la TOC
    const tocItems = this.elRef.nativeElement.querySelectorAll('.toc-list li span');
    tocItems.forEach((tocItem: HTMLElement) => {
      this.renderer.removeClass(tocItem, 'active');
    });
  
    // Busca el ítem correspondiente en la TOC por texto y nivel
    const tocItem = Array.from(tocItems).find((item: HTMLElement) => {
      const itemText = item.textContent.trim();
      const itemLevel = item.classList.contains('toc-h2') ? 'h2' : 'h3';
      return itemText === headerText && itemLevel === headerTag;
    });
  
    if (tocItem && isPlatformBrowser(this.platform)) {
      // Agrega la clase activa al ítem correcto
      this.renderer.addClass(tocItem, 'active');
  
      // Desplazar manualmente el contenedor de la tabla de contenido
      const tocContainer = this.elRef.nativeElement.querySelector('.toc') as HTMLElement;
      const tocItemElement = tocItem as HTMLElement;
  
      const tocItemOffsetTop = tocItemElement.offsetTop;
      const tocContainerScrollTop = tocContainer.scrollTop;
      const tocContainerHeight = tocContainer.clientHeight;
  
      tocContainer.scrollTop = tocItemOffsetTop - tocContainerScrollTop - tocContainerHeight / 2 + tocItemElement.clientHeight / 2;
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    this.updateProgressBar();
    this.showScrollToTop = window.pageYOffset > 300;
  }

  showScrollToTop = false;
  scrollToTop() {
    if (isPlatformBrowser(this.platform)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  updateProgressBar() {

    if (isPlatformBrowser(this.platform)) {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
    
      const progressBar = document.getElementById('progressBar') as HTMLElement;
      if (progressBar) {
        progressBar.style.width = `${scrollPercent}%`;
      }
    }

  }

  // irACurso(curso) {
  //   const url = this.routerR.serializeUrl(this.routerR.createUrlTree([`cursos/${curso.customUrl}`]));
  //   window.open(url, '_blank');
  // }
  


}
