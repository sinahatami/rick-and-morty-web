import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/router';

interface GoBackButtonProps {
  label?: string;
  className?: string;
}

export function GoBackButton({ label = 'GO BACK', className = '' }: GoBackButtonProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={`
        flex items-center gap-2 text-gray-600 hover:text-gray-900 mt-18 transition-colors group cursor-pointer
        ${className}
      `}
    >
      <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform text-black" />
      <span className="font-medium text-lg text-black">{label}</span>
    </button>
  );
}
