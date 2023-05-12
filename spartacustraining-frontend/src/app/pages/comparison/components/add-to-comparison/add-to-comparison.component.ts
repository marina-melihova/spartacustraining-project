import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  GlobalMessageService,
  GlobalMessageType,
  Product,
  ProductService,
  RoutingService,
} from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { ComparisonProductService } from '../../services';

@Component({
  selector: 'add-to-comparison',
  templateUrl: './add-to-comparison.component.html',
  styleUrls: ['./add-to-comparison.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddToComparisonComponent implements OnInit, OnDestroy {
  private productCodeSub$: BehaviorSubject<string> =
    new BehaviorSubject<string>('');

  productCode$: Observable<string> = this.productCodeSub$.asObservable();

  constructor(
    private routingService: RoutingService,
    private productService: ProductService,
    private comparisonProductsService: ComparisonProductService,
    private globalMessageService: GlobalMessageService
  ) {}

  ngOnInit() {
    this.getProduct()
      .pipe(filter(Boolean))
      .subscribe((product: Product) => {
        this.productCodeSub$.next(product.code);
      });
  }

  addToComparison() {
    this.productCode$.pipe(take(1)).subscribe((productCode) => {
      this.comparisonProductsService.addProduct(productCode);
      this.globalMessageService.add(
        'Product added to comparison',
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
    });
  }

  private getProduct(): Observable<Product> {
    return this.routingService.getRouterState().pipe(
      map((state) => state.state.params['productCode']),
      filter(Boolean),
      switchMap((productCode: any) => this.productService.get(productCode))
    );
  }

  ngOnDestroy(): void {
    if (this.productCodeSub$) {
      this.productCodeSub$.unsubscribe();
    }
  }
}
