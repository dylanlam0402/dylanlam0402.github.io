import { createRoot } from 'react-dom/client';
import './styles/main.css';

function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-8xl font-medium bg-gradient-to-r from-white via-[#9333EA] to-white bg-clip-text text-transparent mb-4">
          404
        </h1>
        <p className="text-[#9CA3AF] text-lg mb-8">Page not found</p>
        <a
          href="/"
          className="px-8 py-3 bg-gradient-to-r from-[#7C3AED] to-[#9333EA] rounded-full text-white hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] transition-all"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root-404')!).render(<NotFound />);
