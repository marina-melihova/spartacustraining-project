import { RegisterCustomerComponent } from '../../pages/register';
import { CartDetailsComponent } from '../../pages/cart/containers';
import { OrderSummaryComponent } from 'src/app/pages/order-summary';

export const customCmsComponentsConfig = {
  RegisterCustomerComponent: {
    component: RegisterCustomerComponent,
  },
  CartComponent: {
    component: CartDetailsComponent,
  },
  CartTotalsComponent: {
    component: OrderSummaryComponent,
  },
};
