import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css',
})
export class SliderComponent{
  

  

  products = [
    { id: 1, name: 'Producto 1', image: 'assets/product1.jpg' },
    { id: 2, name: 'Producto 2', image: 'assets/product2.jpg' },
    { id: 3, name: 'Producto 3', image: 'assets/product3.jpg' },
    { id: 4, name: 'Producto 4', image: 'assets/product4.jpg' },
    { id: 5, name: 'Producto 5', image: 'assets/product5.jpg' },
  ];

  currentIndex = 0;

  get sliderTransform(): string {
    return `translateX(-${this.currentIndex * 100}%)`;
  }

  nextSlide(): void {
    if (this.currentIndex < this.products.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }

  prevSlide(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.products.length - 1;
    }
  }
}
