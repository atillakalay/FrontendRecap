import { CarImageService } from './../../services/car-image.service';
import { CarImage } from './../../models/carImage';
import { CarService } from './../../services/car.service';
import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  carImage: CarImage[] = [];
  currentCar: Car;
  dataLoaded = false;
  imgUrl: string="https://localhost:44312/"
  filterText = '';

  constructor(
    private carService: CarService,
    private carImageService: CarImageService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        if (params['brandId'] === 'all') {
          this.getCars();
        } else {
          this.getAllByBrandId(params['brandId']);
        }
      } else if (params['colorId']) {
        this.getAllByColorId(params['colorId']);
      } else {
        this.getCars();
      }
    });
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getAllByBrandId(brandId: number) {
    this.carService.getCarByBrandId(brandId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  getAllByColorId(colorId: number) {
    this.carService.getCarByColorId(colorId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  getCarById(carId: number) {
    this.carService.getCarById(carId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  setCurrentCarDetail(car: Car) {
    this.currentCar = car;
  }
}
