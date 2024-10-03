import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profiles-logo',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './profiles-logo.component.html',
  styleUrl: './profiles-logo.component.css'
})
export class ProfilesLogoComponent {

    //perfilesMini
    coordMini = "assets/profiles/coordinador-mini.webp"

    coordinador = '/assets/images/perfilesTecnicos/Coordinador.png'
    gerenteMant = '/assets/images/perfilesTecnicos/gerente-mantenimiento.webp'
    ingProy = '/assets/images/perfilesTecnicos/Ing-1.png'
    operador = '/assets/images/perfilesTecnicos/Operador.png'
    supervisor = '/assets/images/perfilesTecnicos/Supervisor.png'
    tecElectrico = '/assets/images/perfilesTecnicos/Técnico-eléctrico.png'
    tecEspecialista = '/assets/images/perfilesTecnicos/tecnico-especialista.webp'
    tecInstrumentista = '/assets/images/perfilesTecnicos/Tecnico-instrumentista.png'
    tecMecanico = '/assets/images/perfilesTecnicos/Tecnico-mecanico.png'
    tecPredictivo = '/assets/images/perfilesTecnicos/Tecnico-predictivo.png'
    ingConfiabilidad = '/assets/images/perfilesTecnicos/ing-confiabilidad.webp'
    ingMantenimiento = '/assets/images/perfilesTecnicos/ing-mant.png'
}
