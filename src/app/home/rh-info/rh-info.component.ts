import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentPlanComponent} from '../student-plan/student-plan.component'
import { PlanCopyComponent } from '../plan-copy/plan-copy.component';


@Component({
  selector: 'app-rh-info',
  standalone: true,
  imports: [CommonModule, StudentPlanComponent, PlanCopyComponent],
  templateUrl: './rh-info.component.html',
  styleUrls: ['./rh-info.component.css']
})
export class RhInfoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
