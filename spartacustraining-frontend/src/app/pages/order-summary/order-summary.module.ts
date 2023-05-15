import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nModule, UrlModule } from '@spartacus/core';
import { RouterModule } from '@angular/router';
import { OrderSummaryComponent } from './order-summary.component';

@NgModule({
  declarations: [OrderSummaryComponent],
  imports: [CommonModule, RouterModule, UrlModule, I18nModule],
  exports: [OrderSummaryComponent],
})
export class OrderSummaryModule {}
