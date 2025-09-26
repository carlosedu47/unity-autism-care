import { Heart } from 'lucide-react';

interface LoadingProps {
  message?: string;
}

const Loading = ({ message = "Carregando..." }: LoadingProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] space-y-4">
      <div className="relative">
        <Heart className="w-8 h-8 text-primary animate-pulse" />
        <div className="absolute inset-0 w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="text-muted-foreground text-sm">{message}</p>
    </div>
  );
};

export default Loading;