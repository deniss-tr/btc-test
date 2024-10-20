"use client";
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  return (
    <div className="mb-6 flex justify-between">
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded"
        onClick={() => router.push('/')}
      >
        Tables
      </button>
      <div className="flex justify-end">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={() => router.push('/login')}
        >
          Login
        </button>
        <button
          className="bg-red-500 text-white py-2 px-4 ml-4 rounded"
          onClick={() => router.push('/register')}
        >
          Register
        </button>
      </div>
    </div>
  );
}
