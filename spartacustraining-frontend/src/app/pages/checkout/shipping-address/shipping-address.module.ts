import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nModule } from '@spartacus/core';
import {
  AddressFormModule,
  CardModule,
  SpinnerModule,
} from '@spartacus/storefront';

import { ShippingAddressComponent } from './shipping-address.component';

@NgModule({
  declarations: [ShippingAddressComponent],
  imports: [
    CommonModule,
    AddressFormModule,
    CardModule,
    SpinnerModule,
    I18nModule,
  ],
})
export class ShippingAddressModule {}
