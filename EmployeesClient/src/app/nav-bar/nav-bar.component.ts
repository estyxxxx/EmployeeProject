import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, LoginComponent, MatToolbarModule, MatButtonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  isLoginOpen = false;
  isLogin!: Boolean;

  ngOnInit() {
    this.isLogin = localStorage.getItem('isLogin') === 'true';
  }
  login()
  {
    this.isLoginOpen = true;
  }
  saveLogin()
  {
    this.isLoginOpen = false;
    this.isLogin = Boolean(localStorage.getItem('isLogin'));
    window.location.reload();
  }
  logout()
  {
    localStorage.setItem('isLogin', 'false');
    this.isLogin = Boolean(localStorage.getItem('isLogin'))
    window.location.reload();
  }
}
