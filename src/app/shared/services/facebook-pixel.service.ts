import { Injectable } from '@angular/core';
// import * as crypto from 'crypto-js';

declare let fbq: any

@Injectable({
  providedIn: 'root'
})
export class FacebookPixelService {

  constructor() { }

  track(event: string, data?: any): void {
    fbq('track', event, data);
  }
  
  trackAdvanced(event: string, customerData: any): void {
    const processedData = this.processCustomerData(customerData);
    fbq('track', event, processedData);
  }

  private processCustomerData(data: any): any {
    // Aquí puedes implementar el hashing u otro procesamiento de datos sensibles
    // Por ejemplo:
    return {
      ...data,
      email: this.hashData(data.email),
      telefono: this.hashData(data.telefono),
      // Otros campos que requieran procesamiento
    };
  }

  private hashData(data: string): string {
    return 'saludos';
  }
}
