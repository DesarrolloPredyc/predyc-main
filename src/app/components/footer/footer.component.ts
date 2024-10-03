import { AfterViewInit, Component, Inject, Input, OnInit, PLATFORM_ID  } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { IconService } from '../../services/icon.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ResourcesService } from '../../services/resources.service';
import { NavigationEnd, Router, RouterModule, Scroll } from '@angular/router';
import { formLead, ReunionFormComponent } from '../../shared/reunion-form/reunion-form.component';
import { Location } from '@angular/common';
import { filter } from 'rxjs';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'footer',
  standalone: true,
  imports: [CommonModule,FlexLayoutServerModule, FlexLayoutModule, ReactiveFormsModule, RouterModule,ReunionFormComponent],
  providers:[IconService],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements AfterViewInit{
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object, 
    public icon: IconService, 
    private fb: FormBuilder, 
    private resourceService: ResourcesService,
    private location: Location, 
    private router: Router,
    private userService: UserService
  ){}
  
  @Input() onlyFooter: boolean = false

  contactForm = this.fb.group({
		name: ["", Validators.required],
		email: ["", Validators.required],
		job: ["", Validators.required],
		company: ["", Validators.required],
    phone: ["", Validators.required],
	});

  lili = "assets/images/design/lili.jpg"
  lis = "assets/images/design/lis.jpg"
  carlos = "assets/images/design/carlos.png"

  lourival = "assets/images/logos/lourival.jpg"

  displayErrors = false
  disabled = false
  gracias = false

  
  async onSubmit() {
		if (this.contactForm.invalid) {
			this.displayErrors = true;
			return;
		}
    this.disabled = true
    await this.resourceService.setContactFrom(this.contactForm.value)
    this.gracias = true
  
	}
  currentUrl = this.router.url
  isCourseLocation = false
  routerSubscription

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.routerSubscription = this.router.events.subscribe(event => {
        // Verifica si el evento es de tipo Scroll
        if (event instanceof Scroll) {
          const navigationEndEvent = event.routerEvent; 
          // Ahora verifica si routerEvent es NavigationEnd
          if (navigationEndEvent instanceof NavigationEnd) {
            console.log('NavigationEnd event:', navigationEndEvent);
            this.currentUrl = navigationEndEvent.urlAfterRedirects;
            
            if (this.currentUrl.includes('cursos/') || this.currentUrl.includes('programas/')) {
              this.isCourseLocation = true;
            } else {
              this.isCourseLocation = false;
            }
          }
        }
      });
    }
  }
  

  ngOnDestroy(): void {
    // Limpiar la suscripción cuando el componente se destruya para evitar fugas de memoria
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  async handleFormSubmit(formData: formLead) {
    console.log('FormData', formData);
    const userData = {
      name: formData.nombre,
      createdAt: +new Date(),
      displayName: formData.nombre,
      job: formData.cargo,
      email: formData.email,
      phoneNumber: formData.telefono
    }
    let  mailchimpTag = formData.lugar
    if (this.currentUrl.includes('cursos/')) {
      mailchimpTag = 'curso'
    }
    else if (this.currentUrl.includes('programas/')) {
      mailchimpTag = 'diplomado'
    }
    else {
      mailchimpTag = 'home'
    }
    
    await this.userService.createUser(userData, mailchimpTag)
  }
  
}