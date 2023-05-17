import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ShippingAddressModule,
  DeliveryModeModule,
  PaymentDetailsModule,
  ReviewOrderModule,
} from '.';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ShippingAddressModule,
    DeliveryModeModule,
    PaymentDetailsModule,
    ReviewOrderModule,
  ],
})
export class CheckoutModule {}
