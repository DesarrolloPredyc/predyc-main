import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { IconService } from '../../services/icon.service';
import { ResourcesService } from '../../services/resources.service';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from '../../services/seo.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-resource-detail',
  standalone: true,
  imports: [CommonModule, FlexLayoutModule, FlexLayoutServerModule , FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [IconService, ResourcesService],
  templateUrl: './resource-detail.component.html',
  styleUrl: './resource-detail.component.css'
})
export class ResourceDetailComponent implements OnInit{

  freebie = "../../assets/images/design/grafico-freebie.avif"
  revista = "assets/images/logos/revista.png"

  resource: any
  
  constructor(
    private http: HttpClient,
    public icon: IconService, 
    private resourcesService: ResourcesService, 
    private route: ActivatedRoute, 
    private seo: SeoService, 	
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) private platform: Object,
  ){

  }

  customUrl: string = this.route.snapshot.paramMap.get('custom-url');
  displayErrors = false

  freebieForm = this.fb.group({
		name: ["", Validators.required],
		email: ["", Validators.required],
		job: ["", Validators.required],
		company: ["", Validators.required],
	});



  async ngOnInit() {
    this.resource = await this.resourcesService.getResourceByUrl(this.customUrl)
    if(!this.resource){
      this.resource = await this.resourcesService.getResourceById(this.customUrl)
    }
    if (isPlatformBrowser(this.platform)) {
      this.seo.title.setTitle(this.resource.name)
      this.seo.meta.updateTag({name:'description', content:this.resource.description})
      // this.seo.setCanonicalURL('www.hola.com')
      this.seo.setIndexFollow(true)
    }
  }

  async onSubmit() {
		if (this.freebieForm.invalid) {
			this.displayErrors = true;
			return;
		}
    let res = await this.resourcesService.downloadResource(this.freebieForm.value, this.resource)
    if (res) {
      this.downloadFile(this.resource)
    }
	}

  downloadFile(freebie) {
		const newWindow = window.open("", "_blank");
		this.http.get(freebie.file, { responseType: "blob" }).subscribe((data: Blob) => {
			const blob = new Blob([data]);

			// Create a URL for the blob
			const url = window.URL.createObjectURL(blob);

			// Create an anchor element
			const anchor = document.createElement("a");
			anchor.href = url;
			anchor.download = `download.${freebie.extension}`; // Set the file name
			anchor.click();

			// Close the new window after download
			newWindow.close();
		});
	}

  ngOnDestroy() {
    if (isPlatformBrowser(this.platform)) {
      this.seo.removeTags()
    }
  }

}
