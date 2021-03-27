import { CarResponseModel } from './../../models/carResponseModel';
import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars:Car[]=[]
  // carResponseModel:CarResponseModel={};
  constructor() { }

  ngOnInit(): void {

  }

}
