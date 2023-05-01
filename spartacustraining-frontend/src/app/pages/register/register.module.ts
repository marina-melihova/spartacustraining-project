import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import {
  FormErrorsModule,
  SpinnerModule,
  IconModule,
} from '@spartacus/storefront';

import { RegisterCustomerComponent } from './register-customer/register-customer.component';
import { ToggleTypeDirective } from '../../directives/toggle-type.directive';

@NgModule({
  declarations: [RegisterCustomerComponent, ToggleTypeDirective],
  imports: [
    CommonModule,
    I18nModule,
    UrlModule,
    SpinnerModule,
    FormErrorsModule,
    ReactiveFormsModule,
    RouterModule,
    IconModule,
  ],
})
export class RegisterModule {}
