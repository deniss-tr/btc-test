class AuthService {
  email = '';

  async login(email: string, password: string): Promise<{ success: boolean; message: string }> {
    this.email = email;
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === 'incorrect@email.com') {
          resolve({ success: false, message: 'Email is incorrect.' });
        } else if (password === 'incorrect-password') {
          resolve({ success: false, message: 'Password is incorrect.' });
        } else {
          resolve({ success: true, message: 'Login successful' });
        }
      }, 1000);
    });
  }

  async verifyOtp(otp: string): Promise<{ success: boolean; message: string }> {
    console.log('this.email', this.email);
    return new Promise((resolve) => {
      setTimeout(() => {
        if (otp === '123456') {
          this.fakeAuth(this.email)
          resolve({ success: true, message: 'OTP verified' });
        } else {
          resolve({ success: false, message: 'Invalid OTP.' });
        }
      }, 1000);
    });
  }

  async register(email: string, password: string): Promise<{ success: boolean; message: string }> {
    this.email = email;
    return new Promise((resolve) => {
      setTimeout(() => {
        // You can add additional checks here if needed.
        resolve({ success: true, message: 'Registration successful' });
      }, 1000);
    });
  }

  fakeAuth(email: string) {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', email);
  }

  fakeLogout() {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true';
  }

  getUsername(): string | null {
    return localStorage.getItem('user');
  }
}

export default new AuthService();
