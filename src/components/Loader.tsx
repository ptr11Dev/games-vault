import { cn } from '@/lib/utils';

interface LoaderProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
  fullScreen?: boolean;
}

const Loader = ({ className, size = 'medium', fullScreen }: LoaderProps) => {
  const sizeClasses = {
    small: 'w-5 h-5 border-2',
    medium: 'w-8 h-8 border-3',
    large: 'w-12 h-12 border-4',
  };

  return (
    <div
      className={cn(
        'flex items-center justify-center',
        fullScreen && 'bg-primary/80 fixed inset-0 z-50 backdrop-blur-sm',
        className,
      )}
    >
      <div
        className={cn(
          'animate-spin rounded-full border-blue-600/30 border-t-blue-600',
          sizeClasses[size],
        )}
      />
    </div>
  );
};

export default Loader;
