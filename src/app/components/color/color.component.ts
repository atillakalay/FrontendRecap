import { Color } from './../../models/color';
import { ColorService } from './../../services/color.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css'],
})
export class ColorComponent implements OnInit {
  colors: Color[] = [];
  filterText = '';
  currentBrand: Color;
  dataLoaded = false;

  constructor(private colorService: ColorService) {}

  ngOnInit(): void {
    this.getColors();
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
      this.dataLoaded = true;
    });
  }

  setCurrentColor(color: Color) {
    this.currentBrand = color;
  }

  getCurrentCategoryClass(color: Color) {
    if (color == this.currentBrand) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }
}
