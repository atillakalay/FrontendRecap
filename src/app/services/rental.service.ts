import { Car } from './../models/car';
import { Rental } from './../models/rental';
import { ListResponseModel } from './../models/listResponseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  apiUrl = 'https://localhost:44312/api/rentals/';
  constructor(private httpClient: HttpClient) {}

  getRentals(): Observable<ListResponseModel<Rental>> {
    let newPath = this.apiUrl + 'getrentaldetailsdto';
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  checkCar(carId: number): Observable<ListResponseModel<Rental>> {
    let newPath = this.apiUrl + 'checkcar?carId=' + carId;
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }
  add(rental: Rental): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'add';
    return this.httpClient.post<ResponseModel>(newPath, rental);
  }
}
