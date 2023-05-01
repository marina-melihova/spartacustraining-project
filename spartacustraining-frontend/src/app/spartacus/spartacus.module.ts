import { NgModule } from '@angular/core';
import { BaseStorefrontModule } from '@spartacus/storefront';
import { SpartacusConfigurationModule } from './spartacus-configuration.module';
import { SpartacusFeaturesModule } from './spartacus-features.module';
import { SpartacusTrainingModule } from './spartacus-training.module';

@NgModule({
  declarations: [],
  imports: [
    SpartacusFeaturesModule,
    SpartacusConfigurationModule,
    SpartacusTrainingModule,
    BaseStorefrontModule
  ],
  exports: [BaseStorefrontModule]
})
export class SpartacusModule { }
