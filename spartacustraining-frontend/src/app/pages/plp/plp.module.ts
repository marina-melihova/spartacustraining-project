import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {
  ItemCounterModule,
  ListNavigationModule,
  IconModule,
  MediaModule,
  SpinnerModule,
  StarRatingModule,
  OutletModule,
  AddToCartModule,
  ProductListModule,
  FacetListModule,
  ActiveFacetsModule,
} from '@spartacus/storefront';
import { ProductListComponent, RefinementFacetComponent } from './containers';
import {
  ProductListItemComponent,
  ProductGridItemComponent,
  ProductScrollComponent,
} from './components';

@NgModule({
  declarations: [
    ProductListComponent,
    RefinementFacetComponent,
    ProductScrollComponent,
    ProductGridItemComponent,
    ProductListItemComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MediaModule,
    AddToCartModule,
    ItemCounterModule,
    ListNavigationModule,
    UrlModule,
    I18nModule,
    StarRatingModule,
    IconModule,
    SpinnerModule,
    InfiniteScrollModule,
    OutletModule,
    ProductListModule,
    FacetListModule,
    ActiveFacetsModule,
  ],
})
export class PlpModule {}
