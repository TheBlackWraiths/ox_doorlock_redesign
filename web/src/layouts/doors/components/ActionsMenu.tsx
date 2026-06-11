import { useState } from 'react';
import { ClipboardCheckIcon } from '@/components/icons/clipboard-check';
import { DeleteIcon } from '@/components/icons/delete';
import { MenuIcon } from '@/components/icons/menu';
import { SettingsIcon } from '@/components/icons/settings';
import { ZapIcon } from '@/components/icons/zap';
import { DoorColumn } from '../../../store/doors';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { convertData } from '../../../utils/convertData';
import { useClipboard } from '../../../store/clipboard';
import { fetchNui } from '../../../utils/fetchNui';
import { CellContext } from '@tanstack/react-table';
import { useVisibility } from '../../../store/visibility';
import { Button } from '@/components/modern-ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/modern-ui/popover';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/modern-ui/tooltip';
import ConfirmDialog from '@/components/ConfirmDialog';

const ActionsMenu: React.FC<{ data: CellContext<DoorColumn, unknown> }> = ({ data }) => {
  const navigate = useNavigate();
  const setClipboard = useClipboard((state) => state.setClipboard);
  const setVisible = useVisibility((state) => state.setVisible);
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MenuIcon size={20} />
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent>Door actions</TooltipContent>
        </Tooltip>
        <PopoverContent align="end" className="w-52 p-1">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2"
            onClick={() => {
              useStore.setState(convertData(data.row.original), true);
              navigate('/settings/general');
              setOpen(false);
            }}
          >
            <SettingsIcon size={16} />
            Settings
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-2"
            onClick={() => {
              setClipboard(convertData(data.row.original));
              fetchNui('notify', 'Settings copied');
              setOpen(false);
            }}
          >
            <ClipboardCheckIcon size={16} />
            Copy settings
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-2"
            onClick={() => {
              setVisible(false);
              fetchNui('teleportToDoor', data.row.getValue('id'));
              setOpen(false);
            }}
          >
            <ZapIcon size={16} />
            Teleport to door
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-destructive hover:text-destructive"
            onClick={() => {
              setOpen(false);
              setConfirmOpen(true);
            }}
          >
            <DeleteIcon size={16} />
            Delete door
          </Button>
        </PopoverContent>
      </Popover>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Confirm deletion"
        description={
          <>
            Are you sure you want to delete
            <span className="font-semibold text-foreground">{` ${data.row.getValue('name')}`}</span>?
          </>
        }
        destructive
        onConfirm={() => fetchNui('deleteDoor', data.row.getValue('id'))}
      />
    </>
  );
};

export default ActionsMenu;
