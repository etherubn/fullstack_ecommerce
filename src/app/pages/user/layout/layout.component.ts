import { Component } from '@angular/core';
import { HeaderComponent } from "../../../common/components/header/header.component";
import { SliderComponent } from "../../../components/slider/slider.component";
import { BrandsComponent } from "../components/brands/brands.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, SliderComponent, BrandsComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
