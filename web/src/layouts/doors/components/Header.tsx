import { PlusIcon } from '@/components/icons/plus';
import { XIcon } from '@/components/icons/x';
import { useNavigate } from 'react-router-dom';
import { useVisibility } from '../../../store/visibility';
import { fetchNui } from '../../../utils/fetchNui';
import Searchbar from './Search';
import { useStore, defaultState } from '../../../store';
import { Button } from '@/components/modern-ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/modern-ui/tooltip';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const setVisible = useVisibility((state) => state.setVisible);

  return (
    <div className="flex items-center gap-3 p-4 pb-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="secondary"
            size="icon"
            onClick={() => {
              useStore.setState(defaultState, true);
              navigate('/settings/general');
            }}
          >
            <PlusIcon size={20} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Create a new door</TooltipContent>
      </Tooltip>
      <Searchbar />
      <Button
        variant="ghost"
        size="icon"
        className="shrink-0"
        onClick={() => {
          setVisible(false);
          fetchNui('exit');
        }}
      >
        <XIcon size={20} />
      </Button>
    </div>
  );
};

export default Header;
