interface NotificationProps {
  message: string;
  message_type: string;
}

export default function Notification({ message, message_type }: NotificationProps) {
  return (
    <div
      className={`${
        message_type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
      } px-4 py-2 rounded-md mb-4`}
    >
      {message}
    </div>
  );
}
