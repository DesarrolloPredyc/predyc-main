import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Subject, debounceTime } from 'rxjs';
import { IconService } from '../../../services/icon.service';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-input-box',
  standalone: true,
  imports: [CommonModule, FlexLayoutModule, FormsModule],
  templateUrl: './search-input-box.component.html',
  styleUrl: './search-input-box.component.css'
})
export class SearchInputBoxComponent {

  public inputText: string
  private searchTerm = new Subject<string>();

  DEBOUNCE_TIME: number = 300
  @Input() placeHolder = "Buscar"

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public icon: IconService
  ) {}

  ngOnInit() {
    this.inputText = this.activatedRoute.snapshot.queryParams['search'] || ''
    this.searchTerm.pipe(
      debounceTime(this.DEBOUNCE_TIME)
    ).subscribe(term => {
      this.router.navigate([], {
        queryParams: { search: term ? term : null, page: 1 },
        queryParamsHandling: 'merge'
      });
    })
  }

  search() {
    this.searchTerm.next(this.inputText.toLowerCase());
  }

  ngOnDestroy() {
    this.searchTerm.unsubscribe()
  }

}
