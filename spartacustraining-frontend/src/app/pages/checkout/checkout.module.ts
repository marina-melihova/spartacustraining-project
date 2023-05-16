import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShippingAddressModule, DeliveryModeModule } from '.';

@NgModule({
  declarations: [],
  imports: [CommonModule, ShippingAddressModule, DeliveryModeModule],
})
export class CheckoutModule {}
