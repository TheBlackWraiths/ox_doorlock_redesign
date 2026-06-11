import { useState } from 'react';
import { DeleteIcon } from '@/components/icons/delete';
import { SettingsIcon } from '@/components/icons/settings';
import { useSetters, useStore } from '../../../../../store';
import DifficultyModal from '../../characters/components/DifficultyModal';
import { Input } from '@/components/modern-ui/input';
import { Button } from '@/components/modern-ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/modern-ui/tooltip';

const selectData: { label: string; value: string }[] = [
  { label: 'Easy', value: 'easy' },
  { label: 'Medium', value: 'medium' },
  { label: 'Hard', value: 'hard' },
  { label: 'Custom', value: 'custom' },
];

const LockpickFields: React.FC = () => {
  const lockpickFields = useStore((state) => state.lockpickDifficulty);
  const setLockpickFields = useSetters((setter) => setter.setLockpickDifficulty);
  const [modal, setModal] = useState<{ opened: boolean; index: number }>({ opened: false, index: 0 });

  const handleRowDelete = (index: number) => {
    setLockpickFields((prevState) => prevState.filter((obj, indx) => indx !== index));
  };

  const getDisplayValue = (field: (typeof lockpickFields)[number]) => {
    if (typeof field === 'string') {
      return selectData.find((d) => d.value === field)?.label ?? field;
    }
    return 'Custom';
  };

  return (
    <div className="space-y-3">
      {lockpickFields.map((field, index) => (
        <div
          key={`${typeof field === 'string' ? field : field.areaSize}-${index}`}
          className="flex items-center gap-3"
        >
          <Input className="flex-1" readOnly value={getDisplayValue(field)} placeholder="Edit row to select value" />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={() => setModal({ opened: true, index })}>
                <SettingsIcon size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Edit row</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleRowDelete(index)}>
                <DeleteIcon size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Delete row</TooltipContent>
          </Tooltip>
        </div>
      ))}
      <DifficultyModal selectData={selectData} setModal={setModal} modal={modal} />
    </div>
  );
};

export default LockpickFields;
