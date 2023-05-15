import { RegisterCustomerComponent } from '../../pages/register';
import { CartDetailsComponent } from '../../pages/cart/containers';
import { OrderSummaryComponent } from '../../pages/order-summary';
import {
  ProductListComponent,
  RefinementFacetComponent,
} from '../../pages/plp/containers';
import { ShippingAddressComponent } from '../../pages/checkout/shipping-address/shipping-address.component';

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
  CMSProductListComponent: {
    component: ProductListComponent,
  },
  ProductRefinementComponent: {
    component: RefinementFacetComponent,
  },
  CheckoutOrderSummary: {
    component: OrderSummaryComponent,
  },
  CheckoutShippingAddress: {
    component: ShippingAddressComponent,
  },
};
