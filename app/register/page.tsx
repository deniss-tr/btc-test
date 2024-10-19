"use client";
import { useState } from 'react';
import authService from '../services/authService';
import OtpForm from '../components/OtpForm';
import Notification from '../components/Notification';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1); // Step 1: Register, Step 2: OTP Verification
  const [notification, setNotification] = useState({ message: '', type: '' });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotification({ message: '', type: '' });

    const response = await authService.register(email, password);
    if (response.success) {
      setStep(2);
    } else {
      setNotification({ message: response.message, type: 'error' });
    }
  };

  const handleOtpSubmit = async (otp: string) => {
    const response = await authService.verifyOtp(otp);
    if (response.success) {
      setNotification({ message: 'Registration successful!', type: 'success' });
    } else {
      setNotification({ message: response.message, type: 'error' });
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg p-6 shadow-md">
        {step === 1 ? (
          <form onSubmit={handleRegister} className="space-y-4">
            <h2 className="text-2xl font-semibold text-center">Register</h2>

            {notification.message && (
              <Notification message={notification.message} message_type={notification.type as 'error' | 'success'} />
            )}

            <div>
              <label className="block mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Register
            </button>
          </form>
        ) : (
          <OtpForm onSubmit={handleOtpSubmit} error={notification.message} />
        )}
      </div>
    </div>
  );
}
