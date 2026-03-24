import { Bell } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/authStore';

interface HeaderProps {
  title: string;
  children?: React.ReactNode;
}

export const Header = ({ title, children }: HeaderProps) => {
  const user = useAuthStore((s) => s.user);

  const displayName =
    user?.firstName || user?.lastName
      ? `${user.firstName} ${user.lastName}`.trim()
      : user?.email?.split('@')[0] || 'Coach';

  const initials =
    user?.firstName && user?.lastName
      ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
      : displayName.slice(0, 2).toUpperCase();

  return (
    <header className="flex items-center justify-between px-8 py-5 border-b border-border">
      <div className="flex items-center gap-4">
        <h1 className="font-heading text-xl font-semibold">{title}</h1>
        {children}
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon-sm" className="relative">
          <Bell size={18} />
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-error rounded-full text-[10px] font-semibold flex items-center justify-center">
            3
          </span>
        </Button>

        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-xs font-semibold text-white">
              {initials}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-muted">{displayName}</span>
        </div>
      </div>
    </header>
  );
};
