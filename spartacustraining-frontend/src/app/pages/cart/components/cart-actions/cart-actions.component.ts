import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Cart, OrderEntry } from '@spartacus/core';
import {
  ContextService,
  LAUNCH_CALLER,
  LaunchDialogService,
  ORDER_ENTRIES_CONTEXT,
  OrderEntriesContext,
} from '@spartacus/storefront';
import { Observable, of, Subscription } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'cart-actions',
  templateUrl: './cart-actions.component.html',
  styleUrls: ['./cart-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartActionsComponent implements OnDestroy {
  private subscription = new Subscription();
  private orderEntriesContext$: Observable<OrderEntriesContext | undefined> =
    this.contextService.get<OrderEntriesContext>(ORDER_ENTRIES_CONTEXT);

  @ViewChild('element') element: ElementRef;

  @Input()
  cart$: Observable<Cart>;

  entries$: Observable<OrderEntry[] | undefined> =
    this.orderEntriesContext$.pipe(
      switchMap(
        (orderEntriesContext) =>
          orderEntriesContext?.getEntries?.() ?? of(undefined)
      )
    );

  constructor(
    private vcr: ViewContainerRef,
    private launchDialogService: LaunchDialogService,
    private contextService: ContextService
  ) {}

  saveCart(cart: Cart): void {
    this.openDialog(cart);
  }

  openDialog(cart: Cart) {
    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.SAVED_CART,
      this.element,
      this.vcr,
      { cart, layoutOption: 'save' }
    );

    if (dialog) {
      this.subscription.add(dialog.pipe(take(1)).subscribe());
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
