import { PlusIcon } from '@/components/icons/plus';
import { Button } from '@/components/modern-ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/modern-ui/tooltip';

interface Props {
  children: React.ReactNode;
  setter: () => void;
}

const Layout: React.FC<Props> = ({ children, setter }) => {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto p-1">{children}</div>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="secondary" className="mt-3 w-full shrink-0" onClick={setter}>
            <PlusIcon size={20} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Create a new row</TooltipContent>
      </Tooltip>
    </div>
  );
};

export default Layout;
