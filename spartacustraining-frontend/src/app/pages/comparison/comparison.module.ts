import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ConfigModule, UrlModule } from '@spartacus/core';
import { SpinnerModule } from '@spartacus/storefront';
import { ComparisonProductService } from './services';
import { ProductComparisonComponent } from './containers';
import { AddToComparisonComponent } from './components';
import { ComparisonProductInterceptor } from './interceptors';

@NgModule({
  declarations: [ProductComparisonComponent, AddToComparisonComponent],
  imports: [
    CommonModule,
    RouterModule,
    UrlModule,
    SpinnerModule,
    ConfigModule.withConfig({
      cmsComponents: {
        AddToComparisonComponent: {
          component: AddToComparisonComponent,
        },
        ProductComparisonComponent: {
          component: ProductComparisonComponent,
        },
      },
    }),
  ],
  providers: [
    ComparisonProductService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ComparisonProductInterceptor,
      multi: true,
    },
  ],
})
export class ComparisonModule {}
