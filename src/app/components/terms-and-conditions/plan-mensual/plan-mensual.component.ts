import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports:[
    MatIconModule,
    FormsModule,
    CommonModule,
    FlexLayoutModule,
    RouterModule
  ],
  selector: 'app-plan-mensual',
  templateUrl: './plan-mensual.component.html',
  styleUrls: ['./plan-mensual.component.css']
})
export class PlanMensualComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
  }

}