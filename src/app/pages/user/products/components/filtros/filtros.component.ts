import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-filtros',
  standalone: true,
  imports: [
    MatIconModule,
    MatRadioModule,
    MatExpansionModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    MatSliderModule
  ],
  templateUrl: './filtros.component.html',
  styleUrl: './filtros.component.css',
})
export class FiltrosComponent { 

  mascota:string = ""
  producto:string= ""
  precio:number=0
}
