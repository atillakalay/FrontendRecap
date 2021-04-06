import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarService } from 'src/app/services/car.service';
import { Component, Input, OnInit } from '@angular/core';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';
import { Car } from 'src/app/models/car';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css'],
})
export class CarUpdateComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private toastrService: ToastrService,
    private brandService: BrandService,
    private colorService: ColorService
  ) {}
  carUpdateForm: FormGroup;
  currentCar: Car;
  brands: Brand[] = [];
  colors: Color[] = [];

  ngOnInit(): void {
    this.createCarUpdateForm();
    this.getBrands();
    this.getColors();
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  createCarUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      carName: ['', Validators.required],
      description: ['', Validators.required],
      brandId: ['', Validators.required],
      modelYear: ['', Validators.required],
      colorId: ['', Validators.required],
      dailyPrice: ['', Validators.required],
    });
  }

  update(){
    if(this.carUpdateForm.valid){
      let carModel = Object.assign({},this.carUpdateForm.value)
      this.carService.updateCar(carModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
      },responseError=>{
        if(responseError.error.Errors.length>0){
          for (let i = 0; i <responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage
              ,"Doğrulama hatası")
          }       
        } 
      })
    }else{
      this.toastrService.error("Formunuz eksik","Dikkat")
    }
  }

  }

