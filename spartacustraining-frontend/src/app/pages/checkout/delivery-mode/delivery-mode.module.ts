import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';
import { SpinnerModule } from '@spartacus/storefront';

import { DeliveryModeComponent } from './delivery-mode.component';

@NgModule({
  declarations: [DeliveryModeComponent],
  imports: [CommonModule, ReactiveFormsModule, I18nModule, SpinnerModule],
})
export class DeliveryModeModule {}
