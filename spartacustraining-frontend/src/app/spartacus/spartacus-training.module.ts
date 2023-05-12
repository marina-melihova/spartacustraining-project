import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RegisterModule,
  CartModule,
  OrderSummaryModule,
  PlpModule,
  ComparisonModule,
} from '../pages';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RegisterModule,
    CartModule,
    OrderSummaryModule,
    PlpModule,
    ComparisonModule,
  ],
})
export class SpartacusTrainingModule {}
