import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// Importaciones de Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';

@Component({
  standalone: true,
  selector: 'app-demo-request',
  templateUrl: './demo-request.component.html',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatOptionModule, MatInputModule, MatSelectModule],
  styleUrls: ['./demo-request.component.css']
})
export class DemoRequestComponent {
  demoForm: FormGroup;
  sectors = ['Sector 1', 'Sector 2', 'Sector 3']; // Modificar según los sectores reales
  solutions = ['Solución A', 'Solución B', 'Solución C']; // Modificar según las soluciones reales

  constructor(private fb: FormBuilder) {
    this.demoForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      position: [''],
      sector: ['', Validators.required],
      solutionInterest: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.demoForm.valid) {
      // //console.log(this.demoForm.value);
      // Aquí iría la lógica para procesar los datos del formulario
    } else {
      // //console.log('Form is not valid');
    }
  }
}
