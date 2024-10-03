import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { IconService } from '../../services/icon.service';
import { ResourcesService } from '../../services/resources.service';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-resource-list',
  standalone: true,
  imports: [CommonModule, FlexLayoutModule, FlexLayoutServerModule, RouterModule],
  providers: [IconService, ResourcesService ],
  templateUrl: './resource-list.component.html',
  styleUrl: './resource-list.component.css'
})
export class ResourceListComponent implements OnInit {

  freebie = "../../assets/images/design/grafico-freebie.avif"
  freebies = []

  constructor(
    public icon: IconService, 
    private resourcesService: ResourcesService, 
    private seo: SeoService,
    @Inject(PLATFORM_ID) private platform: Object,
  ){}
  recursosimg = "assets/images/design/asseticon.png"

  ngOnInit(): void {
    this.resourcesService.getResources().subscribe(freebies => { 
      this.freebies = freebies
      // //console.log(freebies)

    })
    if (isPlatformBrowser(this.platform)) {
      this.seo.title.setTitle("Predyc - recursos descargables")
      this.seo.meta.updateTag({name:'description', content:"Descarga tus herramientas indispensables y llevar tus habilidades al siguiente nivel"})
      // this.seo.setCanonicalURL('www.hola.com')
      this.seo.setIndexFollow(true)
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platform)) {
      this.seo.removeTags()
    }
  }
}
