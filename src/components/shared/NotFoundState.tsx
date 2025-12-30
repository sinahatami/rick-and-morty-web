import { useRouter } from 'next/router';
import { AlertCircle, LucideIcon } from 'lucide-react';
import { Button } from './Button'; // Import Button

interface NotFoundStateProps {
  title: string;
  message?: string;
  backLabel?: string;
  icon?: LucideIcon;
}

export function NotFoundState({
  title,
  message = 'The data you are looking for does not exist in this dimension.',
  backLabel = 'Return to Safety',
  icon: Icon = AlertCircle,
}: NotFoundStateProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center max-w-lg mx-auto mt-10 animate-in fade-in duration-500">
      <div className="bg-red-50 p-6 rounded-full mb-6">
        <Icon className="h-12 w-12 text-red-500" />
      </div>
      <h2 className="text-2xl font-black text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-500 mb-8 font-medium">{message}</p>

      <Button onClick={() => router.back()}>{backLabel}</Button>
    </div>
  );
}
