import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  user: any;
  collapsed = false;

  constructor(
    public router: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.user = this.auth.getUser();
  }

  toggle() {
    this.collapsed = !this.collapsed;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
