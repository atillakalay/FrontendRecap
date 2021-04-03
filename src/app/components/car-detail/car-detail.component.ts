import { CarService } from './../../services/car.service';
import { CarImage } from './../../models/carImage';
import { Car } from './../../models/car';
import { CarImageService } from './../../services/car-image.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  cars: Car[] = [];
  carImages: CarImage[] = [];
  dataLoaded = false;
  Images: string[] = [];
  imageBasePath = environment.baseUrl;
  defaultImg = '/images/default.jpg';

  constructor(
    private carService: CarService,
    private carImageService: CarImageService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getCarById(params['carId']);
    });
  }

  getByIdCarImage(carId: number) {
    this.carImageService.getByIdCarImage(carId).subscribe((response) => {
      this.carImages = response.data;
      this.dataLoaded = true;
    });
  }
  getAllCarImages() {
    this.carImageService.getAllCarImages().subscribe((response) => {
      this.carImages = response.data;
      this.dataLoaded = true;
    });
  }

  getCarById(carId: number) {
    this.carService.getCarById(carId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
}
