import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'xng-breadcrumb';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.scss']
})
export class SectionHeaderComponent implements OnInit {
  breadCrumb$: Observable<any[]>;

  constructor(private bdService: BreadcrumbService) { }

  ngOnInit(): void {
    this.breadCrumb$ = this.bdService.breadcrumbs$;
  }

}
