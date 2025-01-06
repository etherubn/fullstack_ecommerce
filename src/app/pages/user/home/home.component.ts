import { Component } from '@angular/core';
import { SliderComponent } from "../../../components/slider/slider.component";
import { BrandsComponent } from "./components/brands/brands.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SliderComponent, BrandsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

}
