import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CheckoutService } from '../checkout.service';
import { BasketService } from 'src/app/basket/basket.service';
import { ToastrService } from 'ngx-toastr';
import { IBasket } from 'src/app/shared/models/basket';
import { IOrder } from 'src/app/shared/models/order';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements OnInit {
  @Input() checkOutForm: FormGroup;

  constructor(private basketService: BasketService,
              private checkoutService: CheckoutService,
              private toast: ToastrService,
              private router: Router) { }

  ngOnInit(): void {
  }

  submitOrder() {
    const basket = this.basketService.getCurrentBasketValue();
    const orderToCreate = this.getOrderToCreate(basket);
    this.checkoutService.createOrder(orderToCreate).subscribe((order: IOrder) => {
      this.toast.success('Order created successfully');
      this.basketService.deleteLocalBasket(basket.id);
      const navExtras: NavigationExtras = {state: order};
      this.router.navigate(['checkout/success'], navExtras);
    }, error => {
      this.toast.error(error.message);
      console.log(error.message);
    });
  }

  private getOrderToCreate(basket: IBasket) {
    return {
      basketId: basket.id,
      deliveryMethodId: +this.checkOutForm.get('deliveryForm').get('deliveryMethod').value,
      shipToAddress: this.checkOutForm.get('addressForm').value
    };
  }

}
