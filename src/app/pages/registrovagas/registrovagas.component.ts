import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registrovagas',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './registrovagas.component.html',
  styleUrls: ['./registrovagas.component.scss']
})
export class RegistrovagasComponent {
  registrationForm: FormGroup;
  private apiUrl = 'http://localhost:8080/';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.registrationForm = this.fb.group({
      titulo: ['', [Validators.required]],
      descricao: ['', [Validators.required]]
    });
  }

  get title() {
    return this.registrationForm.get('titulo');
  }

  get description() {
    return this.registrationForm.get('descricao');
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      this.http.post<any>(`${this.apiUrl}vagas`, this.registrationForm.value).subscribe({
        next: () => {
          this.toastr.success('Vaga cadastrada com sucesso!');
          this.router.navigate(['/home']);
        },
        error: () => {
          this.toastr.error('Erro ao cadastrar vaga. Tente novamente.');
        }
      });
    }
  }
}
