import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  constructor() {}

  private desplegable: BehaviorSubject<boolean> = new BehaviorSubject(false)

  setDesplegable(boolean) {
    this.desplegable.next(boolean);
  }

  getDesplegable(): Observable<boolean> {
    return this.desplegable;
  }

}
