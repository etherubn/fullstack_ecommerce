import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent implements OnInit{
  
  color:string= "white"

  ngOnInit(): void {
    this.color= getComputedStyle(document.documentElement)
      .getPropertyValue('--yellow')
      .trim()
  }
}
