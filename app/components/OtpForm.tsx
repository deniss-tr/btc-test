import { useState } from 'react';
import Notification from './Notification';

interface OtpFormProps {
  onSubmit: (otp: string) => void;
  message: string;
  type: string;
}

export default function OtpForm({ onSubmit, message, type }: OtpFormProps) {
  const [otp, setOtp] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(otp);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-semibold text-center">Enter OTP</h2>

      {message && <Notification message={message} message_type={ type } />}

      <div>
        <label className="block mb-1">OTP</label>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Verify OTP
      </button>
    </form>
  );
}
