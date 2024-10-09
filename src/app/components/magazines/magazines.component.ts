import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-magazines',
  standalone: true,
  imports: [FlexLayoutModule],
  templateUrl: './magazines.component.html',
  styleUrl: './magazines.component.css'
})
export class MagazinesComponent {
  revistaImage = '../../../assets/images/logos/revista.png';

}
