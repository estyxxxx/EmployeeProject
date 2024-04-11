import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, LoginComponent, MatToolbarModule, MatButtonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  isLogin!: Boolean;

  ngOnInit() {
    this.isLogin = localStorage.getItem('isLogin') === 'true';
  }
  constructor(
    private dialog: MatDialog
  ) { }
  
  login()
  {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(() => {
      this.isLogin = Boolean(localStorage.getItem('isLogin'));
      window.location.reload();
    });
  }
  logout()
  {
    localStorage.setItem('isLogin', 'false');
    this.isLogin = Boolean(localStorage.getItem('isLogin'))
    window.location.reload();
  }
}
