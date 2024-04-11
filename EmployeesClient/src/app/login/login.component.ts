import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Output, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { catchError, tap } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  isSucceed = false;
  isClicked: boolean = false;

  ngOnInit() {
    this.loginForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  constructor(
    private http: HttpClient, public dialogRef: MatDialogRef<LoginComponent>
  ) { }

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
          }),
          catchError(error => {
            Swal.fire({ icon: "error", title: "Error", text: "Your password is worng!" });
            return throwError(error);
          })
        ).subscribe();
        this.dialogRef.close();
    }
  }
  cancel() {
    this.dialogRef.close();
  }
  private sendTokenToServer(token: string): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}
