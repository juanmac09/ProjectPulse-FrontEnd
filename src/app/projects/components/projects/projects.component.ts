import { Component } from '@angular/core';
import { CreateProjectsComponent } from "../create-projects/create-projects.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CreateProjectsComponent,RouterLink],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  isModalOpen = false;
  projects = [
    { id: 1, name: 'Proyecto 1', description: 'Descripción breve del proyecto 1.' },
    { id: 2, name: 'Proyecto 2', description: 'Descripción breve del proyecto 2.' },
  ];

  openModal() {
    this.isModalOpen = true;
  }

  closeModal(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.isModalOpen = false;
  }
}
