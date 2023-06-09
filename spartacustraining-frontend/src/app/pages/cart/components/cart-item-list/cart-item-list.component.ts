import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CartItemComponentOptions } from '@spartacus/storefront';
import {
  ActiveCartService,
  ConsignmentEntry,
  MultiCartService,
  OrderEntry,
  PromotionLocation,
  SelectiveCartService,
  UserIdService,
} from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';

@Component({
  selector: 'cart-item-list',
  templateUrl: './cart-item-list.component.html',
  styleUrls: ['./cart-item-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemListComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  private userId: string;
  private _items: OrderEntry[] = [];
  form: FormGroup = new FormGroup({});

  @Input() readonly: boolean = false;
  @Input() hasHeader: boolean = true;

  @Input() options: CartItemComponentOptions = {
    isSaveForLater: false,
    optionalBtn: null,
  };

  @Input() cartId: string;

  @Input('items')
  set items(items: OrderEntry[]) {
    this.resolveItems(items);
    this.createForm();
  }

  get items(): OrderEntry[] {
    return this._items;
  }

  @Input() promotionLocation: PromotionLocation = PromotionLocation.ActiveCart;

  @Input('cartIsLoading') set setLoading(value: boolean) {
    if (!this.readonly) {
      value
        ? this.form.disable({ emitEvent: false })
        : this.form.enable({ emitEvent: false });
    }
  }

  constructor(
    private activeCartService: ActiveCartService,
    private selectiveCartService: SelectiveCartService,
    private userIdService: UserIdService,
    private multiCartService: MultiCartService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.userIdService
        ?.getUserId()
        .subscribe((userId) => (this.userId = userId))
    );
  }

  private resolveItems(items: OrderEntry[]): void {
    if (!items) {
      this._items = [];
      return;
    }
    if (items.every((item) => item.hasOwnProperty('orderEntry'))) {
      this._items = items.map((consignmentEntry) => {
        const entry = Object.assign(
          {},
          (consignmentEntry as ConsignmentEntry).orderEntry
        );
        entry.quantity = consignmentEntry.quantity;
        return entry;
      });
    } else {
      for (let i = 0; i < Math.max(items.length, this._items.length); i++) {
        if (JSON.stringify(this._items?.[i]) !== JSON.stringify(items[i])) {
          if (this._items[i] && this.form) {
            this.form.removeControl(this.getControlName(this._items[i]));
          }
          if (!items[i]) {
            this._items.splice(i, 1);
          } else {
            this._items[i] = items[i];
          }
        }
      }
    }
  }

  private createForm(): void {
    this._items.forEach((item) => {
      const controlName = this.getControlName(item);
      const group = new FormGroup({
        entryNumber: new FormControl(item.entryNumber),
        quantity: new FormControl(item.quantity, { updateOn: 'blur' }),
      });
      this.form.addControl(controlName, group);
      if (!item.updateable || this.readonly) {
        this.form.controls[controlName].disable();
      }
    });
  }

  quantityControl(form: FormGroup): FormControl {
    return form.get('quantity') as FormControl;
  }

  private getControlName(item: OrderEntry): string {
    return item.entryNumber.toString();
  }

  removeEntry(item: OrderEntry): void {
    if (this.selectiveCartService && this.options.isSaveForLater) {
      this.selectiveCartService.removeEntry(item);
    } else if (this.cartId && this.userId) {
      this.multiCartService?.removeEntry(
        this.userId,
        this.cartId,
        item.entryNumber
      );
    } else {
      this.activeCartService.removeEntry(item);
    }
    delete this.form.controls[this.getControlName(item)];
  }

  getControl(item: OrderEntry): Observable<FormGroup> {
    return this.form.get(this.getControlName(item)).valueChanges.pipe(
      startWith(null),
      tap((value) => {
        if (item.updateable && value && !this.readonly) {
          if (this.selectiveCartService && this.options.isSaveForLater) {
            this.selectiveCartService.updateEntry(
              value.entryNumber,
              value.quantity
            );
          } else if (this.cartId && this.userId) {
            this.multiCartService?.updateEntry(
              this.userId,
              this.cartId,
              value.entryNumber,
              value.quantity
            );
          } else {
            this.activeCartService.updateEntry(
              value.entryNumber,
              value.quantity
            );
          }
        }
      }),
      map(() => <FormGroup>this.form.get(this.getControlName(item)))
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
