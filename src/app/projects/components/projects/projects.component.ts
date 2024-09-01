import { Component } from '@angular/core';
import { CreateProjectsComponent } from '../create-projects/create-projects.component';
import { RouterLink } from '@angular/router';
import { ProjectService } from '../../services/project/project.service';
import { FormsModule } from '@angular/forms';


/**
 * Interface representing the structure of a project.
 */
interface Project {
  id: number;
  name: string;
  description: string;
  generalCompany: {
    id: number;
    name: string;
  };
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CreateProjectsComponent, RouterLink,FormsModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent {
  isModalOpen = false; // Determines if the modal is open or closed
  successMessage: string | null = null; // Success message to display
  errorMessage: string | null = null; // Error message to display
  projects: Project[] = []; // List of projects
  page: number = 1; // Current page number
  totalPage: number = 0; // Total number of pages
  totalElements: number = 0; // Total number of elements
  readonly pageSize: number = 10; // Number of projects per page
  readonly initialPage: number = 0; // Initial page number
  searchTerm: string = ''; // Termino de búsqueda
  filteredProjects: Project[] = []; // Proyectos filtrados

  constructor(private projectService: ProjectService) {}

  /**
   * Initializes the component by fetching the projects.
   */
  ngOnInit(): void {
    this.getProjects(this.initialPage, this.pageSize);
  }

  /**
   * Fetches the list of projects from the server.
   * @param page The page number to fetch.
   * @param size The number of projects per page.
   */
  getProjects(page: number, size: number): void {
    this.projectService.getProjects(page, size).subscribe((response) => {
      this.projects = response.data.content;
      this.totalPage = response.data.totalPages;
      this.totalElements = response.data.totalElements;
      this.filterProjects(); 
    });
  }

  /**
   * Opens the modal for creating a new project.
   */
  openModal(): void {
    this.isModalOpen = true;
  }

  /**
   * Closes the modal.
   * @param event Optional click event to stop propagation.
   */
  closeModal(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.isModalOpen = false;
  }

  /**
   * Handles the event when a new project is created successfully.
   * @param newProject The newly created project.
   */
  handleProjectCreated(newProject: any): void {
    this.projects.push(newProject.data);
    this.totalElements++;
    this.filterProjects();
    this.closeModal();
    this.successMessage = 'Proyecto creado exitosamente';
    this.errorMessage = null;
    setTimeout(() => (this.successMessage = null), 3000);
  }

  /**
   * Handles the error event when project creation fails.
   * @param error The error that occurred.
   */
  handleError(error: any): void {
    this.closeModal();
    this.successMessage = null;
    this.errorMessage =
      'Error al crear el proyecto. Por favor intente más tarde';
  }

  /**
   * Moves to the next page of projects if there are more pages.
   */
  nextPage(): void {
    if (this.page < this.totalPage) {
      this.page++;
      this.getProjects(this.page - 1, this.pageSize);
    }
  }

  /**
   * Moves to the previous page of projects if there are previous pages.
   */
  backPage(): void {
    if (this.page > 1) {
      this.page--;
      this.getProjects(this.page - 1, this.pageSize);
    }
  }

  /**
   * Filters the list of projects based on the search term.
   */
  filterProjects(): void {
    if (this.searchTerm) {
      this.filteredProjects = this.projects.filter(
        (project) =>
          project.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          project.description
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredProjects = [...this.projects];
    }
  }
}
