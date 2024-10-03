import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cards-pricing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cards-pricing.component.html',
  styleUrl: './cards-pricing.component.css'
})
export class CardsPricingComponent {
  isAnnual: boolean = false;
  plans: any[] = [
    {
      title: '10 personas',
      monthlyPrice: '$71 USD al mes',
      annualPrice: '$850 USD anual',
      benefits: ['Acceso a todos los cursos', '10 rotaciones'],
      isBestSeller: false,
      link: 'https://wa.link/fs0yqe'

    },
    {
      title: '25 personas',
      monthlyPrice: '$57 USD al mes',
      annualPrice: '$680 USD anual',
      benefits: ['Acceso a todos los cursos', 'Rotaciones infinitas', 'Asistencia dedicada PREDYC'],
      isBestSeller: true,
      link: 'https://wa.link/1pggft'

    },
    // {
    //   title: '+100 personas',
    //   monthlyPrice: '$49 USD al mes',
    //   annualPrice: '$588 USD anual',
    //   benefits: ['Acceso a todos los cursos', 'Rotaciones infinitas', 'Asistencia dedicada PREDYC'],
    //   isBestSeller: true,
    //   link: 'https://wa.link/pu3cug'

    // },
    {
      title: 'Ilimitadas',
      monthlyPrice: 'Solicita una cotización',
      annualPrice: 'Solicita una cotización',
      benefits: ['Acceso a todos los cursos', 'Rotaciones infinitas', 'Asistencia dedicada PREDYC'],
      isBestSeller: false,
      link: 'https://wa.link/obb1h3'

    }
  ];

  togglePricing(event: any): void {
    this.isAnnual = event.target.checked;
  }

  contactSales(plan:any): void {
    window.open(plan.link, '_blank');
  }
}