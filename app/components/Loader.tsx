interface LoaderProps {
  loading: boolean;
}

export default function Loader({ loading }: LoaderProps) {
  if (!loading) return null;

  return (
    <div className="loader-container">
      <div className="spinner"></div>
    </div>
  );
};

