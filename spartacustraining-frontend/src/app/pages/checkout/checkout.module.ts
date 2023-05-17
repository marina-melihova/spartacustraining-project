import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ShippingAddressModule,
  DeliveryModeModule,
  PaymentDetailsModule,
} from '.';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ShippingAddressModule,
    DeliveryModeModule,
    PaymentDetailsModule,
  ],
})
export class CheckoutModule {}
