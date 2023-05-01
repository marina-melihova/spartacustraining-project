import { NotAuthGuard } from '@spartacus/core';
import { RegisterCustomerComponent } from '../../pages/register';

export const customCmsComponentsConfig = {
  RegisterCustomerComponent: {
    component: RegisterCustomerComponent,
    guards: [NotAuthGuard],
  },
};
