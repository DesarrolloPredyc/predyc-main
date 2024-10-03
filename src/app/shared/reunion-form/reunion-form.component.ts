import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, EventEmitter, Inject, Input, Output, PLATFORM_ID, input } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { firstValueFrom, fromEvent } from 'rxjs';
import { FacebookPixelService } from '../services/facebook-pixel.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ScreenSizeService } from '../../services/screen-size.service';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Location } from '@angular/common';
import { ReCaptchaV3Service,RECAPTCHA_V3_SITE_KEY, RecaptchaModule } from 'ng-recaptcha';
import Swal from "sweetalert2";

export class formLead {
  id: string = ''
  nombre: string = ''
  email: string = ''
  telefono: string = ''
  cargo: string = ''
  interesUser:string = ''
  empresa: string = ''
  origen: string = ''
  initialUrl: string = ''
  campana: string = ''
  anuncio: string = ''
  lugar: string = ''
  asignado: boolean = false
  pais: string = ''
  responsable: string = ''
  interes: string = ''
  cantidad:any
}

export const titleCase = (str: string) =>  {
  if (!str) return str;
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

@Component({
  selector: 'app-reunion-form',
  standalone: true,
  imports: [NgxIntlTelInputModule, ReactiveFormsModule, CommonModule, FlexLayoutModule,RecaptchaModule],
  templateUrl: './reunion-form.component.html',
  styleUrl: './reunion-form.component.css',
  providers: [
    ReCaptchaV3Service,
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: '6LchjzgqAAAAANYV88dFOY4uGWoT4_2rF8x9OvCE', // Reemplaza con tu clave de sitio
    },
  ],
})
export class ReunionFormComponent {
  reunionForm: FormGroup;
  sended = false
  loading = false
  alertComplete = false
  isLargeScreen: boolean;
  constructor(private fireFunctions: AngularFireFunctions, private facebookPixelService: FacebookPixelService,
    private screenSizeService: ScreenSizeService,
    private afs: AngularFirestore,@Inject(PLATFORM_ID) private platformId: any,private mediaObserver: MediaObserver,
    private location: Location,
    private recaptchaV3Service: ReCaptchaV3Service
  ) { 
  }

  @Input() origen: string = ''
  @Input() campana: string = ''
  @Input() anuncio: string = ''
  @Input() lugar: string = ''
  @Input() responsable: string = ''
  @Input() interes: string = ''
  @Input() emailIn: string = ''
  @Input() recipients: string[] = []
  @Input() subject: string = ''
  @Input() type: string = 'reunion'

  @Input() askCantidad: boolean = true


  @Input() buttonColor: string = '#FCC045'; // Color por defecto
  @Input() buttonHoverColor: string = '#f9ce77'; // Color hover por defecto
  
  @Input() btnText: string = 'Agendar Reunión'
  @Input() btnTextColor: string = 'black'


  @Input() exitoText1: string = 'Hemos recibido tu solicitud'
  @Input() exitoText2: string = 'Uno de nuestros asesores se esta comunicando contigo en la brevedad'
	@Output() complete = new EventEmitter<any>();
  @Output() formSubmit = new EventEmitter<any>();

  firma = `<p>Saludos cordiales,</p>
  <img src="https://predictiva21.com/wp-content/uploads/2024/06/LOGOPREDYC-BACKWHITE.webp" alt="Predyc" style="width: 150px; height: auto;">`;
  styleMail = `
  <style>
    table {
      max-width: 100%;
      border-collapse: collapse;
    }
    th, td {
      border: 1px solid #dddddd;
      text-align: left;
      padding: 8px;
    }
    th {
      background-color: #f2f2f2;
    }
    .high {
      color: green;
    }
    .medium {
      color: orange;
    }
    .low {
      color: red;
    }
    .no-iniciado, .no-plan {
      color: gray;
    }
    .month-row {
      border: none;
      padding-top: 20px;
      font-weight: bold;
    }
    .month-name {
      padding-top: 20px;
      font-weight: bold;
      border: none;
      text-align: left;
    }
  </style>`;


  private invalidDomains = ['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com'];

  emailEmpresaValidator(domains: string[]): ValidatorFn {
    
    return (control: AbstractControl): { [key: string]: any } | null => {
      const email = control.value;
      if (email) {
        const domain = email.split('@')[1];
        if (domains.includes(domain?.toLowerCase())) {
          return { 'emailEmpresa': true };
        }
      }
      return null;
    };
  }
  isMobile
  originalButtonColor: string;

  ngOnInit(): void {

    


    
    this.originalButtonColor = this.buttonColor; // Guardar el color original al iniciar
    const emailValidators = [Validators.required, Validators.email];
    const cantidadValidators = [];
    const interesUserValidators = [];


    if (this.type === 'reunion') {
      emailValidators.push(this.emailEmpresaValidator(this.invalidDomains));
    }

    if(this.askCantidad){
      interesUserValidators.push(Validators.required);
    }
    this.reunionForm = new FormGroup({
      nombreCompleto: new FormControl('', [Validators.required]),
      emailProfesional: new FormControl(this.emailIn, emailValidators),
      telefonoMovil: new FormControl(undefined, [Validators.required]), // Para ngx-intl-tel-input
      cargo: new FormControl('', [Validators.required]),
      empresa: new FormControl('', [Validators.required]),
      interesUser: new FormControl('', interesUserValidators),
      cantidad: new FormControl('', cantidadValidators),
    });
  }

  onInterestChange(): void {
    const interes = this.reunionForm.get('interesUser').value;
    const cantidadControl = this.reunionForm.get('cantidad');
  
    if (interes === 'empresa') {
      cantidadControl.setValidators([Validators.required]);
      cantidadControl.updateValueAndValidity(); // Revalida con el nuevo validador
    } else {
      cantidadControl.clearValidators();
      cantidadControl.updateValueAndValidity(); // Limpia los validadores si no es empresarial
    }
  }


  onMouseOver() {
    this.buttonColor = this.buttonHoverColor;
  }

  onMouseLeave() {
    this.buttonColor = this.originalButtonColor; // Restaurar el color original
  }
  

  captchaResolved: boolean = false;
  captchaToken: string | null = null;

  async onSubmit() {
    this.loading = true;

    if (this.reunionForm.valid) {


      this.recaptchaV3Service.execute('submit_form').subscribe(
        async (token) => {
          this.captchaToken = token;
          console.log('reCAPTCHA v3 token:', token);
          this.captchaResolved = true;
          await this.handleValidFormSubmission(true);
        },
        async (error) => {
        // Mostrar SweetAlert2 si hay un error
          // Swal.fire({
          //   icon: 'error',
          //   title: 'Error',
          //   text: 'Hubo un problema en determinar si eres un humano. Por favor, inténtalo de nuevo.',
          //   confirmButtonText: 'Aceptar',
          // });
          await this.handleValidFormSubmission(false);
          console.log('Error al resolver reCAPTCHA:', error);
        }
      );
    } else {
      this.handleInvalidFormSubmission();
    }

    this.loading = false;
  }

  private async handleValidFormSubmission(validCaptcha = true) {
    this.alertComplete = false;
    const initialUrl = sessionStorage.getItem('initialUrl')
    const formValue = this.reunionForm.value;
    const telefono = formValue.telefonoMovil.e164Number;
    const pais = formValue.telefonoMovil.countryCode;
    const uniqueId = this.generateUniqueId();

    const form: formLead = this.buildFormObject(formValue, telefono, pais, uniqueId,initialUrl);
    let { sender, recipients, subject, htmlContentFinal } = this.buildEmailContent(form);

    let copy = ["ventas@predyc.com","desarrollo@predyc.com"]

    try {

      // guardar en BD
      if (this.type == 'evento'){
        const docRef = this.afs.collection('eventosRegister').doc(); // Crear una referencia al documento con un ID automático
        sender = 'lisset.chavez@predyc.com'
        copy = ['desarrollo@predyc.com']
        const customerData = {
            id: docRef.ref.id, // Añadir el ID al objeto customerData
            content_name: this.anuncio,
            responsables:this.responsable,
            campana: this.campana,
            name: form.nombre,
            email: form.email,
            telefono: form.telefono,
            cargo:form.cargo,
            interesUser:form.interesUser,
            empresa:form.empresa,
            pais:form.pais,
            date:new Date(),
            origen:this.origen,
            initialUrl:initialUrl,
            validCaptcha: validCaptcha,
            cantidad:form?.cantidad ? form?.cantidad : null
        };
            
        docRef.set(customerData) // Guardar el documento con el ID incluido
            .then(() => {
                console.log('Registro guardado exitosamente');

                //this.sendEmail(sender, recipients, subject, htmlContentFinal);
                console.log("Email enviado");
                // Preparar los datos del cliente para el evento
                const customerData = {
                  content_name: this.anuncio,
                  name: form.nombre,
                  email: form.email,
                  telefono: form.telefono,
                  status: 'Completado',
                  // Puedes agregar más campos según sea necesario
                };

                let htmlUser = `
                    <p>Hola <strong>${titleCase(form.nombre)}</strong>,</p>
                    <p>¡Gracias por registrarte en <strong>${this.campana}</strong>! Estamos encantados de que te unas a nosotros en esta jornada hacia la optimización de la gestión de mantenimiento.</p>
                    <p>Nos pondremos en contacto contigo muy pronto para brindarte más información. Mientras tanto, te invitamos a estar pendiente de nuestro sitio web y nuestras redes sociales para no perderte ninguna actualización importante.</p>
                    <p>Además, te invitamos a unirte a nuestro canal de difusión exclusivo, donde recibirás todas las novedades y actualizaciones directamente:</p>
                    <p><a href="https://bit.ly/3MwP1vC" target="_blank"><strong>Únete a nuestro canal de difusión aquí</strong></a></p>
                `;

                let htmlMailFinal = ` <!DOCTYPE html><html><head>${this.styleMail}</head><body>${htmlUser}<br>${this.firma}
                </body></html>`;

                if(validCaptcha){
                  this.sendEmail('lisset.chavez@predyc.com', [form.email],`Gracias por registrate a ${this.campana}`, htmlMailFinal,['desarrollo@predyc.com']);
                }
            })
            .catch((error) => {
                console.error('Error al guardar el registro: ', error);
                // Puedes manejar el error aquí, como mostrar un mensaje de error
            });
      }

      else if (this.type == 'info' || this.type == 'ads'){

        const docRef = this.afs.collection('infoRequestRegister').doc(); // Crear una referencia al documento con un ID automático
    
        const customerData = {
            id: docRef.ref.id, // Añadir el ID al objeto customerData
            content_name: this.anuncio ?this.anuncio : null,
            responsables:this.responsable,
            campana: this.campana ?  this.campana  : null,
            name: form.nombre,
            email: form.email,
            origen: this.origen,
            initialUrl:initialUrl,
            telefono: form.telefono,
            cargo:form.cargo,
            interesUser:form.interesUser,
            empresa:form.empresa,
            pais:form.pais,
            date: new Date(),
            validCaptcha: validCaptcha,
            cantidad:form?.cantidad ? form?.cantidad : null,
            type:this.type
        };
    
        docRef.set(customerData) // Guardar el documento con el ID incluido
            .then(() => {
                console.log('Registro guardado exitosamente');
                console.log(docRef.ref.id)

                //this.sendEmail(sender, recipients, subject, htmlContentFinal);
                console.log("Email enviado");
                // Preparar los datos del cliente para el evento
                const customerData = {
                  content_name: this.anuncio,
                  name: form.nombre,
                  email: form.email,
                  telefono: form.telefono,
                  status: 'Completado',
                  // Puedes agregar más campos según sea necesario
                };
            })
            .catch((error) => {
                console.error('Error al guardar el registro: ', error);
                // Puedes manejar el error aquí, como mostrar un mensaje de error
            });
        
      }

      else if (this.type == 'diagnostico' && validCaptcha){
        this.complete.emit(form)
      }   

      // Send email
      if (this.type != 'evento' && validCaptcha){
        this.sendEmail(sender, recipients, subject, htmlContentFinal,copy);
        console.log("Email enviado");
      }

      // Preparar los datos del cliente para el evento
      const customerData = {
        content_name: this.anuncio,
        name: form.nombre,
        email: form.email,
        telefono: form.telefono,
        status: 'Completado',
        // Puedes agregar más campos según sea necesario
      };
      console.log('customerData',customerData)

      // Usar el servicio para disparar el evento CompleteRegistration con datos avanzados

      //if(this.type !== 'evento'){
      if (validCaptcha) {
        this.facebookPixelService.track('CompleteRegistration', customerData);
        this.formSubmit.emit(form);
      }
      //}

      this.sended = true;
    } catch (error) {
      console.error("Hubo un error al enviar el email", error);
    }
  }

  private handleInvalidFormSubmission() {
    this.alertComplete = true;
    this.reunionForm.markAllAsTouched();
    console.log('Form is invalid');
  }

  private buildFormObject(formValue: any, telefono: string, pais: string, uniqueId: string,initialUrl:string): formLead {

    if (!this.origen) {
      this.origen = 'Página web'
    }
    return {
      id: uniqueId,
      nombre: formValue.nombreCompleto,
      email: formValue.emailProfesional,
      telefono: telefono,
      cargo: formValue.cargo,
      interesUser:formValue.interesUser,
      empresa: formValue.empresa,
      origen: this.origen,
      initialUrl:initialUrl,
      campana: this.campana,
      anuncio: this.anuncio,
      lugar: this.lugar,
      asignado: false,
      pais: pais,
      responsable: this.responsable || '',
      interes: this.interes,
      cantidad:formValue?.cantidad ? formValue?.cantidad : null
    };
  }

  private buildEmailContent(form: formLead) {
    const sender = 'ventas@predyc.com';
    const recipients = this.recipients.length > 0 ? this.recipients : ['ventas@predyc.com'];
    const subject = this.subject || 'Nuevo registro formulario en Predyc';

    const htmlContentFinal = `
      <p><strong>${form.nombre}</strong> ha llenado el formulario en <strong>${this.lugar}</strong> interesado en <strong>${this.interes}</strong></p>
      <h3>Datos del contacto:</h3>
      <ul>
      <li><strong>Tipo:</strong> ${this.type}</li>
        <li><strong>Nombre:</strong> ${form.nombre}</li>
        <li><strong>Correo:</strong> ${form.email}</li>
        <li><strong>Teléfono:</strong> ${form.telefono}</li>
        <li><strong>Cargo:</strong> ${form.cargo}</li>
        <li><strong>Empresa:</strong> ${form.empresa}</li>
        <li><strong>País:</strong> ${form.pais}</li>
        <li><strong>Origen:</strong> ${this.origen}</li>
        <li><strong>Interes:</strong> ${form.interesUser}</li
        ${form?.cantidad ? `<li><strong>Cantidad interesados:</strong> ${form.cantidad}</li>` : ''}
      </ul>
    `;
    

    return { sender, recipients, subject, htmlContentFinal };
  }

  private async sendEmail(sender: string, recipients: string[], subject: string, htmlContent: string,copy:string[] = ["ventas@predyc.com","desarrollo@predyc.com"]) {
    firstValueFrom(this.fireFunctions.httpsCallable('sendMailHTML')({
      sender: sender,
      recipients: recipients,
      subject: subject,
      cc: copy,
      htmlContent: htmlContent,
    }));
  }

  private generateUniqueId(): string {
    return 'id-' + new Date().getTime() + '-' + Math.floor(Math.random() * 1000);
  }

}
