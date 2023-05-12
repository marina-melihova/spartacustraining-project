import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OccEndpointsService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { ComparisonProducts } from '../models';

@Injectable()
export class ComparisonProductService {
  private storageKey = 'comparisonData';
  private daysToExpired = 1;

  constructor(
    private httpClient: HttpClient,
    private occEndpoints: OccEndpointsService
  ) {}

  public get(): Observable<ComparisonProducts> {
    const state = this.getState();
    const { products } = state;
    return products.length
      ? this.httpClient.get<ComparisonProducts>(this.getUrl() + products)
      : of(state);
  }

  public deleteProduct(productCode: string) {
    const state = this.getState();
    const position = state.products.indexOf(productCode);

    if (position > -1) {
      state.products.splice(position, 1);
    }

    localStorage.setItem(this.storageKey, JSON.stringify(state));
  }

  public addProduct(productCode) {
    const state = this.getState();
    const exist = state.products.filter((element) => element === productCode);
    if (exist.length === 0) {
      state.products.push(productCode);
      state.expiredDate = this.getDateToExpired();
    }

    localStorage.setItem(this.storageKey, JSON.stringify(state));
  }

  public validateComparisonList() {
    const state = this.getState();

    if (state.expiredDate < Date.now()) {
      localStorage.removeItem(this.storageKey);
    }
  }

  private getState() {
    const comparison = {
      products: [],
      expiredDate: this.getDateToExpired(),
    };

    let state;
    try {
      state = JSON.parse(localStorage.getItem(this.storageKey));
      if (state === null) {
        state = comparison;
      }
    } catch (e) {
      state = comparison;
    }

    return state;
  }

  private getDateToExpired() {
    const date = new Date();
    return date.setDate(date.getDate() + this.daysToExpired);
  }

  private getUrl() {
    return this.occEndpoints.getBaseUrl() + '/comparison/products/';
  }
}
