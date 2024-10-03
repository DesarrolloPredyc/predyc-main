import { Component, OnInit } from '@angular/core';
import { IconService } from '../../services/icon.service';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { RouterModule } from '@angular/router';
import { ResourcesService } from '../../services/resources.service';

@Component({
  selector: 'app-resources-finder',
  standalone: true,
  imports: [CommonModule,FlexLayoutModule, FlexLayoutServerModule,RouterModule],
  providers: [IconService, ResourcesService],
  templateUrl: './resources-finder.component.html',
  styleUrl: './resources-finder.component.css'
})
export class ResourcesFinderComponent implements OnInit {

  constructor(public icon: IconService, private resourcesService: ResourcesService){}

  resources: any[] = []

  ngOnInit(): void {
    this.resourcesService.getResources().subscribe(resources => {
      this.resources = resources
      // //console.log(this.resources)
    })
  }

  

}
