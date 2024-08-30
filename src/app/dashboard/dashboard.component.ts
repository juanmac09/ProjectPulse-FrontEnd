import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProjectsComponent } from "../projects/components/projects/projects.component";
import { DetailsProjectsComponent } from '../projects/components/details-projects/details-projects.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent,DetailsProjectsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
