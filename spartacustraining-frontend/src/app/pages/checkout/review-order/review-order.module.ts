import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import {
  CardModule,
  CartSharedModule,
  IconModule,
  PromotionsModule,
} from '@spartacus/storefront';

import { ReviewOrderComponent } from './review-order.component';

@NgModule({
  declarations: [ReviewOrderComponent],
  imports: [
    CommonModule,
    CardModule,
    CartSharedModule,
    I18nModule,
    UrlModule,
    RouterModule,
    PromotionsModule,
    IconModule,
  ],
})
export class ReviewOrderModule {}
