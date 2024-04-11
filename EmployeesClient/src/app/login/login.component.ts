import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Output, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, tap } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  isSucceed = false;
  isClicked: boolean = false;

  @Output()
  saveEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }
  save() {
    if (!this.loginForm.valid) {
      this.isClicked = true;
    } else {
      const loginModel = this.loginForm.value;
      this.http.post<any>('https://localhost:7272/api/Auth', loginModel)
        .pipe(
          tap(response => {
            const token = response.token;
            this.sendTokenToServer(token);
            sessionStorage.setItem('token', token);
            this.isSucceed = true;
            localStorage.setItem('isLogin', 'true');
            this.saveEvent.emit();
          }),
          catchError(error => {
            Swal.fire({ icon: "error", title: "Error", text: "Your password is worng!" });
            return throwError(error);
          })
        ).subscribe();
    }
  }
  cancel() {
    this.saveEvent.emit();
  }
  private sendTokenToServer(token: string): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}
