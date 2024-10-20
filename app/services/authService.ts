class AuthService {
  async login(email: string, password: string): Promise<{ success: boolean; message: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === 'incorrect@email.com') {
          resolve({ success: false, message: 'Email is incorrect.' });
        } else if (password === 'incorrect-password') {
          resolve({ success: false, message: 'Password is incorrect.' });
        } else {
          resolve({ success: true, message: 'Login successful' });
        }
      }, 2000);
    });
  }

  async verifyOtp(otp: string): Promise<{ success: boolean; message: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (otp === '123') {
          resolve({ success: true, message: 'OTP verified' });
        } else {
          resolve({ success: false, message: 'Invalid OTP.' });
        }
      }, 2000);
    });
  }

  async register(email: string, password: string): Promise<{ success: boolean; message: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: 'Registration successful' });
      }, 2000);
    });
  }
}

export default new AuthService();
