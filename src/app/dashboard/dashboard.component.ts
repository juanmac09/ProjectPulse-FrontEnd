import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProjectsComponent } from "../projects/components/projects/projects.component";
import { DetailsProjectsComponent } from '../projects/components/details-projects/details-projects.component';
import { ActivatedRoute } from '@angular/router';
import { TiketsComponent } from "../tikets/components/tikets/tikets.component";
import { UserStoriesComponent } from "../user-stories/components/user-stories/user-stories.component";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, DetailsProjectsComponent, ProjectsComponent, TiketsComponent, UserStoriesComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements  OnInit {

  currentRoute: string = "";

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentRoute = this.route.snapshot.routeConfig?.path || '';
    console.log('Current Route:', this.currentRoute);
  }

}
