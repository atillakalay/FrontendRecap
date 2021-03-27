import { CarResponseModel } from './../../models/carResponseModel';
import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  apiUrl = 'https://localhost:44312/api/cars/getall';

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.getCars();
  }

  getCars() {
    this.httpClient.get<CarResponseModel>(this.apiUrl).subscribe((response) => {
      this.cars = response.data;
    });
  }
}
