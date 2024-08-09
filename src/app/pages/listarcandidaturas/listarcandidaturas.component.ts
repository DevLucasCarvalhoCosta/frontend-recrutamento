import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importar CommonModule

@Component({
  selector: 'app-listarcandidaturas',
  standalone: true,
  imports: [
    CommonModule // Adicionar CommonModule aqui
  ],
  templateUrl: './listarcandidaturas.component.html',
  styleUrls: ['./listarcandidaturas.component.css']
})
export class ListarcandidaturasComponent implements OnInit {
  vagas: any[] = [];
  candidaturas: any[] = [];
  selectedVagaId: number | null = null;
  loading: boolean = true;
  error: string | null = null;

  private apiUrl = 'http://localhost:8080/';

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getVagas();
  }

  getVagas(): void {
    this.http.get<any[]>(`${this.apiUrl}vagas`).subscribe({
      next: (data) => {
        this.vagas = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar vagas:', err);
        this.toastr.error('Erro ao buscar vagas.');
        this.loading = false;
        this.error = 'Não foi possível carregar as vagas.';
      }
    });
  }

  showCandidaturas(vagaId: number): void {
    this.selectedVagaId = vagaId;
    this.http.get<any[]>(`${this.apiUrl}candidaturas/vaga/${vagaId}`).subscribe({
      next: (data) => {
        this.candidaturas = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar candidaturas:', err);
        this.toastr.error('Erro ao buscar candidaturas.');
        this.loading = false;
        this.error = 'Não foi possível carregar as candidaturas.';
      }
    });
  }

  getCandidaturas(vagaId: number): void {
    this.http.get<any[]>(`${this.apiUrl}candidaturas/vaga/${vagaId}`).subscribe({
      next: (data) => {
        this.candidaturas = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar candidaturas:', err);
        this.toastr.error('Erro ao buscar candidaturas.');
        this.loading = false;
        this.error = 'Não foi possível carregar as candidaturas.';
      }
    });
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  logout(): void {
    this.router.navigate(['/login']);
  }
}
