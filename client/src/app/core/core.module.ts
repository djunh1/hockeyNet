import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomNavBarComponent } from './custom-nav-bar/custom-nav-bar.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [CustomNavBarComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CustomNavBarComponent
  ]
})
export class CoreModule { }
