import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@/components/icons/arrow-left';
import { BellIcon } from '@/components/icons/bell';
import { BoxIcon } from '@/components/icons/box';
import { LockIcon } from '@/components/icons/lock';
import { SettingsIcon } from '@/components/icons/settings';
import { UserIcon } from '@/components/icons/user';
import { UsersIcon } from '@/components/icons/users';
import General from './views/general';
import Characters from './views/characters';
import Groups from './views/groups';
import Items from './views/items';
import Sound from './views/sound';
import Submit from './Submit';
import { useStore } from '../../store';
import Lockpick from './views/lockpick';
import { Button } from '@/components/modern-ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  { value: 'back', label: 'Doors', icon: ArrowLeftIcon, action: 'back' as const },
  { value: 'general', label: 'General', icon: SettingsIcon },
  { value: 'characters', label: 'Characters', icon: UserIcon },
  { value: 'groups', label: 'Groups', icon: UsersIcon },
  { value: 'items', label: 'Items', icon: BoxIcon },
  { value: 'lockpick', label: 'Lockpick', icon: LockIcon, requiresLockpick: true },
  { value: 'sound', label: 'Sound', icon: BellIcon },
];

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const lockpick = useStore((state) => state.lockpick);
  const activeTab = location.pathname.substring(10);

  return (
    <div className="flex h-full min-h-0">
      <nav className="flex w-36 shrink-0 flex-col gap-1 border-r border-border bg-secondary p-2">
        {navItems.map((item) => {
          if (item.requiresLockpick && !lockpick) return null;

          const isActive = item.action !== 'back' && activeTab === item.value;
          const Icon = item.icon;

          return (
            <Button
              key={item.value}
              variant={isActive ? 'secondary' : 'ghost'}
              className={cn(
                'h-9 justify-start gap-2 px-3 text-sm',
                isActive &&
                  'border-primary bg-primary-subtle text-primary-subtle-foreground shadow-sm'
              )}
              onClick={() => {
                if (item.action === 'back') navigate('/');
                else navigate(`/settings/${item.value}`);
              }}
            >
              <Icon size={16} className="shrink-0" />
              {item.label}
            </Button>
          );
        })}
      </nav>
      <div className="flex min-h-0 min-w-0 flex-1 flex-col p-4">
        <div className="min-h-0 flex-1 overflow-hidden">
          <Routes>
            <Route path="/general" element={<General />} />
            <Route path="/characters" element={<Characters />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/items" element={<Items />} />
            <Route path="/sound" element={<Sound />} />
            <Route path="/lockpick" element={<Lockpick />} />
          </Routes>
        </div>
        <Submit />
      </div>
    </div>
  );
};

export default Settings;
