import { CarImage } from './../models/carImage';
import { ListResponseModel } from './../models/listResponseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CarImageService {
  constructor(private httpClient: HttpClient) {}
  apiUrl = 'https://localhost:44312/api/';

  getByIdCarImage(id: number): Observable<ListResponseModel<CarImage>> {
    let newPath = this.apiUrl + 'carImages/getbyid?id=' + id;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }

  getAllCarImages(): Observable<ListResponseModel<CarImage>> {
    let newPath = this.apiUrl + 'carImages/getall';
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }
}
