import { Component, OnInit, Input } from '@angular/core';
import { IOrder } from 'src/app/shared/models/order';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../orders.service';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-order-detailed',
  templateUrl: './order-detailed.component.html',
  styleUrls: ['./order-detailed.component.scss']
})
export class OrderDetailedComponent implements OnInit {
  individualOrder: IOrder;

  constructor(private route: ActivatedRoute, private ordersService: OrdersService, private bs: BreadcrumbService) {
    this.bs.set('@OrderDetailed', '');
  }

  ngOnInit(): void {
    this.ordersService.getDetailedOrder(+this.route.snapshot.paramMap.get('id'))
      .subscribe((order: IOrder) => {
      this.individualOrder = order;
      this.bs.set('@OrderDetailed', `Order# ${order.id} - ${order.status}`);
    }, error => {
      console.log(error);
    });
  }

  // getDetailedOrder() {
  //   this.orderService.getDetailedOrder(+this.route.snapshot.paramMap.get('id'))
  //       .subscribe((order: IOrder) => {
  //         this.individualOrder = order;
  //         this.bs.set('@OrderDetailed', `Order# ${order.id} - ${order.status}`);
  //       }, error => {
  //         console.log(error);
  //       });
  // }

}
