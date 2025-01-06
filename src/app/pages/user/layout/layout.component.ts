import { Component } from '@angular/core';
import { HeaderComponent } from "../../../common/components/header/header.component";
import { SliderComponent } from "../../../components/slider/slider.component";
import { BrandsComponent } from "../home/components/brands/brands.component";
import { FooterComponent } from "../../../common/components/footer/footer.component";
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    HeaderComponent, 
    SliderComponent, 
    BrandsComponent, 
    FooterComponent,
    RouterOutlet
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
