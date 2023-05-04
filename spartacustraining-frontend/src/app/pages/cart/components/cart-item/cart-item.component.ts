import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CartItemContext, CartItemContextSource } from '@spartacus/storefront';
import { OrderEntry, PromotionLocation } from '@spartacus/core';
import { CartOutlets } from '@spartacus/storefront';
import { PromotionResult } from '@spartacus/core/src/model/cart.model';

export interface CartItemComponentOptions {
  isSaveForLater?: boolean;
  optionalBtn?: any;
}

@Component({
  selector: 'cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
  providers: [
    CartItemContextSource,
    { provide: CartItemContext, useExisting: CartItemContextSource },
  ],
})
export class CartItemComponent implements OnChanges {
  @Input() compact = false;
  @Input() item: OrderEntry | undefined;
  @Input() readonly = false;
  @Input() quantityControl: FormControl | undefined;
  @Input() promotionLocation: PromotionLocation = PromotionLocation.ActiveCart;
  @Input() options: CartItemComponentOptions = {
    isSaveForLater: false,
    optionalBtn: null,
  };

  readonly CartOutlets = CartOutlets;

  constructor(private cartItemContextSource: CartItemContextSource) {}

  ngOnChanges(changes?: SimpleChanges): void {
    if (changes?.compact) {
      this.cartItemContextSource.compact$.next(this.compact);
    }
    if (changes?.readonly) {
      this.cartItemContextSource.readonly$.next(this.readonly);
    }
    if (changes?.item) {
      this.cartItemContextSource.item$.next(this.item);
    }
    if (changes?.quantityControl) {
      this.cartItemContextSource.quantityControl$.next(this.quantityControl);
    }
    if (changes?.promotionLocation) {
      this.cartItemContextSource.location$.next(this.promotionLocation);
    }
    if (changes?.options) {
      this.cartItemContextSource.options$.next(this.options);
    }
  }

  isProductOutOfStock(product: any): any {
    return (
      product &&
      product.stock &&
      product.stock.stockLevelStatus === 'outOfStock'
    );
  }

  removeItem(): void {
    if (this.quantityControl) {
      this.quantityControl.setValue(0);
      this.quantityControl.markAsDirty();
    }
  }

  getPromotions(item: OrderEntry | undefined): PromotionResult[] {
    return item?.promotions !== undefined ? item?.promotions : [];
  }

  getMax(item: OrderEntry | undefined): number {
    return item !== undefined ? (item.product?.stock?.stockLevel as number) : 0;
  }
}
