import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import {
  FormErrorsModule,
  IconModule,
  ItemCounterModule,
  MediaModule,
  OutletModule,
  PromotionsModule,
} from '@spartacus/storefront';
import { CartDetailsComponent } from './containers';
import {
  CartItemComponent,
  CartActionsComponent,
  CartItemListComponent,
} from './components';
import { ExportOrderEntriesModule } from '@spartacus/cart/import-export/components';

@NgModule({
  declarations: [
    CartDetailsComponent,
    CartItemListComponent,
    CartItemComponent,
    CartActionsComponent,
  ],
  imports: [
    CommonModule,
    I18nModule,
    UrlModule,
    FormErrorsModule,
    ReactiveFormsModule,
    RouterModule,
    PromotionsModule,
    OutletModule,
    ItemCounterModule,
    MediaModule,
    IconModule,
    ExportOrderEntriesModule,
  ],
})
export class CartModule {}
