import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../account/account.service';
import { Observable } from 'rxjs';
import { IBasketTotals } from '../shared/models/basket';
import { BasketService } from '../basket/basket.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  basketTots$: Observable<IBasketTotals>;
  checkOutForm: FormGroup;

  constructor(private fb: FormBuilder, private accountService: AccountService, private basketService: BasketService) { }

  ngOnInit(): void {
    this.createCheckoutForm();
    this.getAddresFormvalues();
    this.basketTots$ = this.basketService.basketTotal$;
    this.getDeliveryMethodValue();
  }

  createCheckoutForm(){
    this.checkOutForm = this.fb.group({
      addressForm: this.fb.group({
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        street: [null, Validators.required],
        city: [null, Validators.required],
        state: [null, Validators.required],
        zipCode: [null, Validators.required],

      }),
      deliveryForm: this.fb.group({
        deliveryMethod: [null, Validators.required]
      }),
      paymentForm: this.fb.group({
        nameOnCard: [null, Validators.required]
      })
    });
  }

  getAddresFormvalues(){
    this.accountService.getUserAddress().subscribe(address => {
      if (address){
        this.checkOutForm.get('addressForm').patchValue(address);
      }
    }, error => {
      console.log(error);
    });
  }

  getDeliveryMethodValue(){
    const basket = this.basketService.getCurrentBasketValue();
    if (basket.deliveryMethodId !== null) {
      this.checkOutForm.get('deliveryForm').get('deliveryMethod').patchValue(basket.deliveryMethodId.toString());
    }
  }

}
