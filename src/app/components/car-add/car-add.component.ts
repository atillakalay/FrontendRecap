import { Car } from './../../models/car';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car.service';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';


@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css'],
})
export class CarAddComponent implements OnInit {
 
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private carService: CarService,
    private brandService:BrandService,
    private colorService:ColorService
  ) {}

  ngOnInit(): void {
    this.createCarAddForm(),
    this.getBrands(),
    this.getColors()

  }
  carAddForm: FormGroup;
  cars: Car[] = [];
  brands: Brand[] = [];
  colors: Color[] = [];

  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      carName: ['', Validators.required],
      description: ['', Validators.required],
      brandId: ['', Validators.required],
      modelYear: ['', Validators.required],
      colorId: ['', Validators.required],
      dailyPrice: ['', Validators.required],
    });
  }
  
  getBrands(){
    this.brandService.getBrands().subscribe((response)=>{
      this.brands=response.data
    })
  }
  getColors(){
    this.colorService.getColors().subscribe((response)=>{
      this.colors=response.data
    })
  }


  add(){
    if(this.carAddForm.valid){
      let carModel = Object.assign({},this.carAddForm.value)
      this.carService.addCar(carModel).subscribe(response=>{
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
