import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  GlobalMessageService,
  GlobalMessageType,
  ImageGroup,
  OccConfig,
  Product,
} from '@spartacus/core';
import { Observable } from 'rxjs';

import { ComparisonProducts } from '../../models';
import { ComparisonProductService } from '../../services';

@Component({
  selector: 'product-comparison',
  templateUrl: './product-comparison.component.html',
  styleUrls: ['./product-comparison.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComparisonComponent implements OnInit {
  comparisonProducts$: Observable<ComparisonProducts>;
  baseUrl: string;

  constructor(
    private config: OccConfig,
    private changeDetectorRef: ChangeDetectorRef,
    private comparisonProductsService: ComparisonProductService,
    private globalMessageService: GlobalMessageService
  ) {}

  ngOnInit() {
    this.comparisonProducts$ = this.comparisonProductsService.get();
    this.baseUrl = this.config?.backend?.occ?.baseUrl;
  }

  containsClassification(product: Product, code: string = ''): boolean {
    let isExist = false;
    if (product.classifications) {
      product.classifications.forEach((element) => {
        if (element.code === code) {
          isExist = true;
          return;
        }
      });
    }
    return isExist;
  }

  deleteFromComparison(code: string): void {
    this.comparisonProductsService.deleteProduct(code);
    this.comparisonProducts$ = this.comparisonProductsService.get();
    this.changeDetectorRef.detectChanges();
    this.globalMessageService.add(
      'Product removed from comparison',
      GlobalMessageType.MSG_TYPE_INFO
    );
  }

  getImage(product: Product): string {
    return (product.images?.[0] as ImageGroup)?.url as string;
  }
}
