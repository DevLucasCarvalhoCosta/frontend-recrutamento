import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  vagas: any[] = [];
  userId: string | null = null;

  constructor(
    private http: HttpClient,
    private toastService: ToastrService,
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.getVagas();
    this.userId = this.loginService.getUserId();

  }

  getVagas(): void {
    this.http.get<any[]>('http://localhost:8080/vagas').subscribe({
      next: (data) => {
        this.vagas = data;
      },
      error: () => {
        this.toastService.error('Erro ao buscar vagas, tente novamente mais tarde.');
      }
    });
  }

  candidatar(vagaId: number): void {
    if (!this.userId) {
      this.toastService.error('Usuário não autenticado.');
      return;
    }

    const token = this.loginService.getToken();
    if (!token) {
      this.toastService.error('Token não encontrado.');
      return;
    }

    const headers = { 'Authorization': `Bearer ${token}` };

    const candidatura = {
      usuario: {
        id: this.userId  // Usa o ID do usuário armazenado
      },
      vaga: {
        id: vagaId.toString()
      }
    };


    this.http.post('http://localhost:8080/candidaturas', candidatura, { headers }).subscribe({
      next: () => {
        this.toastService.success('Candidatura realizada com sucesso!');
      },
      error: (err) => {
        console.error('Erro ao realizar candidatura:', err);
        this.toastService.error('Erro ao realizar candidatura, tente novamente mais tarde.');
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
