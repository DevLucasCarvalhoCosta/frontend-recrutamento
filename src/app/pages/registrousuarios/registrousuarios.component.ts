import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registrousuarios',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './registrousuarios.component.html',
  styleUrls: ['./registrousuarios.component.scss']
})
export class RegistrousuariosComponent {
  registrationForm: FormGroup;
  private apiUrl = 'http://localhost:8080/auth';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['USER'] // Valor padrão
    });
  }

  get username() {
    return this.registrationForm.get('username');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      this.http.post<any>(`${this.apiUrl}/register`, this.registrationForm.value).subscribe({
        next: () => {
          this.toastr.success('Usuário cadastrado com sucesso!');
          this.router.navigate(['/home']);
        },
        error: () => {
          this.toastr.error('Erro ao cadastrar usuário. Tente novamente.');
        }
      });
    }
  }
}
