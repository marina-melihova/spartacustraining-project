import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RegisterModule,
  CartModule,
  OrderSummaryModule,
  PlpModule,
} from '../pages';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RegisterModule,
    CartModule,
    OrderSummaryModule,
    PlpModule,
  ],
})
export class SpartacusTrainingModule {}
