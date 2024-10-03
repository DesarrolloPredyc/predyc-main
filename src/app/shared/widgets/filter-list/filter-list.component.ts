import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filter-list',
  standalone: true,
  imports: [CommonModule, FlexLayoutModule],
  templateUrl: './filter-list.component.html',
  styleUrl: './filter-list.component.css'
})
export class FilterListComponent {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ){}

  @Input() items: any[] = []
  @Input() filterType: 'tag' | 'author' = 'tag';
  private queryParamsSubscription: Subscription
  selectedItem: string = ""

  ngOnInit() {
    this.queryParamsSubscription = this.activatedRoute.queryParams.subscribe(params => {
      const paramName = this.filterType === 'tag' ? 'tag' : 'author';
      const status = params[paramName] || "";
      this.selectedItem = status
    })
  }

  onItemSelected(item: any) {
    this.selectedItem = item.id
    this.updateQueryParams()
  }

  updateQueryParams() {
    const paramName = this.filterType === 'tag' ? 'tag' : 'author';
    this.router.navigate([], {
      queryParams: { [paramName]: this.selectedItem ? this.selectedItem : null, page: 1 },
      queryParamsHandling: 'merge'
    });
  }

  ngOnDestroy() {
    this.queryParamsSubscription.unsubscribe()
  }

}
