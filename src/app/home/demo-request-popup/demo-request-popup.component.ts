// demo-request-popup.component.ts
import { Component, EventEmitter, Output, OnInit, Inject, PLATFORM_ID, input, Input } from '@angular/core';
import { CommonModule, isPlatformBrowser, Location } from '@angular/common';
import { formLead, ReunionFormComponent } from '../../shared/reunion-form/reunion-form.component';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-demo-request-popup',
  standalone: true,
  imports: [CommonModule,ReunionFormComponent],
  templateUrl: './demo-request-popup.component.html',
  styleUrls: ['./demo-request-popup.component.css']
})
export class DemoRequestPopupComponent implements OnInit {
  @Output() close = new EventEmitter<void>();

	@Input() mailchimpDatail: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private location: Location, private userService: UserService) {}
  currentUrl
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {      
      this.currentUrl = this.location.path();
      const script = document.createElement('script');
      script.charset = 'utf-8';
      script.type = 'text/javascript';
      script.src = '//js.hsforms.net/forms/embed/v2.js';
      script.onload = () => {
        (window as any).hbspt.forms.create({
          region: 'na1',
          portalId: '21736748',
          formId: '26b14993-e30c-4e21-bca8-00abd95b2722',
          target: '#hubspotForm'
        });
      };
      document.body.appendChild(script);
    }
    
  }

  closePopup() {
    this.close.emit();
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
    mailchimpTag = 'home'
    if(this.mailchimpDatail){
      mailchimpTag = this.mailchimpDatail
    }
    await this.userService.createUser(userData, mailchimpTag)
  }
}
