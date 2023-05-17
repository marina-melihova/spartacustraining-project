import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule } from '@spartacus/core';
import {
  CardModule,
  FormErrorsModule,
  IconModule,
  SpinnerModule,
} from '@spartacus/storefront';

import { PaymentDetailsComponent } from './payment-details.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';

@NgModule({
  declarations: [PaymentDetailsComponent, PaymentFormComponent],
  imports: [
    CommonModule,
    I18nModule,
    CardModule,
    SpinnerModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormErrorsModule,
    IconModule,
  ],
})
export class PaymentDetailsModule {}
