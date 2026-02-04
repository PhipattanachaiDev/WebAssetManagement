import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  isRegister = false;
  isLoading = false;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private msg: MessageService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  toggleMode() {
    this.isRegister = !this.isRegister;
    this.form.reset();

    if (this.isRegister) {
      // เพิ่ม confirmPassword 
      this.form.addControl('confirmPassword', this.fb.control('', Validators.required));
    } else {
      // ลบ confirmPassword Login
      this.form.removeControl('confirmPassword');
    }
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // ตรวจสอบรหัสผ่านซ้ำเฉพาะตอน Register
    if (this.isRegister) {
      const { password, confirmPassword } = this.form.value;
      if (password !== confirmPassword) {
        this.form.setErrors({ passwordMismatch: true });
        this.msg.add({ severity: 'warn', summary: 'Warning', detail: 'Passwords do not match' });
        return;
      }
    }

    this.isLoading = true;
    const data = this.form.value;

    if (this.isRegister) {
      delete data.confirmPassword;
    }

    if (this.isRegister) {
      this.auth.register(data)
        .pipe(finalize(() => this.isLoading = false))
        .subscribe({
          next: () => {
            this.msg.add({ severity: 'success', summary: 'Success', detail: 'Register success, please login' });
            this.toggleMode();
          },
          error: (err) => {
            this.msg.add({ severity: 'error', summary: 'Error', detail: err.error?.message || 'Registration failed' });
          }
        });
    } else {
      this.auth.login(data)
        .pipe(finalize(() => this.isLoading = false))
        .subscribe({
          next: res => {
            this.auth.saveToken(res.data.token);
            this.router.navigate(['/assets']);
          },
          error: (err) => {
            this.msg.add({ severity: 'error', summary: 'Error', detail: 'Invalid username or password' });
          }
        });
    }
  }
  
  isFieldInvalid(field: string): boolean {
    const control = this.form.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}