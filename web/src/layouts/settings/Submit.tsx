import { useState } from 'react';
import { ClipboardCheckIcon } from '@/components/icons/clipboard-check';
import { DeleteIcon } from '@/components/icons/delete';
import { useStore } from '../../store';
import { fetchNui } from '../../utils/fetchNui';
import { useClipboard } from '../../store/clipboard';
import { useVisibility } from '../../store/visibility';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/modern-ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/modern-ui/tooltip';
import ConfirmDialog from '@/components/ConfirmDialog';

const Submit: React.FC = () => {
  const navigate = useNavigate();
  const clipboard = useClipboard((state) => state.clipboard);
  const setVisible = useVisibility((state) => state.setVisible);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const doorId = useStore((state) => state.id);
  const doorName = useStore((state) => state.name);

  const handleSubmit = () => {
    const state = useStore.getState();
    const items = [];

    if (state.items?.length) {
      for (let i = 0; i < state.items.length; i++) {
        const itemField = state.items[i];
        if (itemField.name && itemField.name !== '') {
          items.push({
            name: itemField.name,
            metadata: itemField.metadata === '' ? null : itemField.metadata,
            remove: itemField.remove || null,
          });
        }
      }
    }

    const charactersArr: Array<string | number> = [];
    if (state.characters?.length) {
      for (let i = 0; i < state.characters.length; i++) {
        const characterField = state.characters[i];
        if (characterField && characterField !== '') {
          charactersArr.push(Number.isNaN(+characterField) ? characterField : +characterField);
        }
      }
    }

    let groups: Record<string, number> | null = null;
    if (state.groups?.length) {
      groups = {};
      for (let i = 0; i < state.groups.length; i++) {
        const groupField = state.groups[i];
        if (groupField.name && groupField.name !== '') {
          groups[groupField.name] = groupField.grade || 0;
        }
      }
    }

    const lockpickDifficulty = [];
    if (state.lockpickDifficulty?.length) {
      for (let i = 0; i < state.lockpickDifficulty.length; i++) {
        const field = state.lockpickDifficulty[i];
        if (field !== '') lockpickDifficulty.push(field);
      }
    }

    const payload = {
      ...state,
      name: state.name === '' ? null : state.name,
      passcode: state.passcode === '' ? null : state.passcode,
      lockSound: state.lockSound === '' ? null : state.lockSound,
      unlockSound: state.unlockSound === '' ? null : state.unlockSound,
      autolock: state.autolock || null,
      maxDistance: state.maxDistance || 2,
      doorRate: state.doorRate ? state.doorRate + 0.0 : null,
      auto: state.auto || null,
      lockpick: state.lockpick || null,
      hideUi: state.hideUi || null,
      holdOpen: state.holdOpen || null,
      items,
      characters: charactersArr,
      groups,
      lockpickDifficulty,
    };

    setVisible(false);
    fetchNui('createDoor', payload);
  };

  return (
    <>
      <div className="flex shrink-0 items-center gap-3 border-t border-border pt-4">
        <Button
          variant="outline"
          className="flex-1 border-primary bg-primary-subtle text-primary-subtle-foreground shadow-sm hover:brightness-110"
          onClick={handleSubmit}
        >
          Confirm door
        </Button>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              disabled={!clipboard}
              onClick={() => {
                useStore.setState(
                  {
                    name: '',
                    passcode: clipboard.passcode,
                    autolock: clipboard.autolock,
                    items: clipboard.items,
                    characters: clipboard.characters,
                    groups: clipboard.groups,
                    maxDistance: clipboard.maxDistance,
                    doorRate: clipboard.doorRate,
                    lockSound: clipboard.lockSound,
                    unlockSound: clipboard.unlockSound,
                    auto: clipboard.auto,
                    state: clipboard.state,
                    lockpick: clipboard.lockpick,
                    hideUi: clipboard.hideUi,
                    doors: clipboard.doors,
                    lockpickDifficulty: clipboard.lockpickDifficulty,
                    holdOpen: clipboard.holdOpen,
                  },
                  true
                );
                fetchNui('notify', 'Settings applied');
              }}
            >
              <ClipboardCheckIcon size={16} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{!clipboard ? 'No door settings copied' : 'Apply copied settings'}</TooltipContent>
        </Tooltip>
        <Button
          variant="outline"
          size="icon"
          className="text-destructive hover:text-destructive"
          disabled={!doorId}
          onClick={() => setConfirmOpen(true)}
        >
          <DeleteIcon size={16} />
        </Button>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Confirm deletion"
        description={
          <>
            Are you sure you want to delete
            <span className="font-semibold text-foreground">{` ${doorName}`}</span>?
          </>
        }
        destructive
        onConfirm={() => {
          fetchNui('deleteDoor', doorId);
          navigate('/');
        }}
      />
    </>
  );
};

export default Submit;
