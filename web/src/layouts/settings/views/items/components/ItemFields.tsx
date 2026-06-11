import { useState } from 'react';
import { DeleteIcon } from '@/components/icons/delete';
import { SettingsIcon } from '@/components/icons/settings';
import { useSetters, useStore } from '../../../../../store';
import ItemsModal from './ItemsModal';
import { Input } from '@/components/modern-ui/input';
import { Button } from '@/components/modern-ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/modern-ui/tooltip';

const ItemFields: React.FC = () => {
  const itemFields = useStore((state) => state.items);
  const setItemFields = useSetters((setter) => setter.setItems);
  const [modal, setModal] = useState<{ opened: boolean; index: number }>({ opened: false, index: 0 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const items = [...itemFields];
    if (e.target.id === 'name') {
      items[index].name = e.target.value;
    }
    setItemFields(() => items);
  };

  const handleRowDelete = (index: number) => {
    setItemFields((prevState) => prevState.filter((obj, indx) => indx !== index));
  };

  return (
    <div className="space-y-3">
      {itemFields.length > 0 &&
        itemFields.map((field, index) => (
          <div key={`item-field-${index}`} className="flex items-center gap-3">
            <Input
              className="flex-1"
              value={(field.name as string) || ''}
              id="name"
              placeholder="Item"
              onChange={(e) => handleChange(e, index)}
            />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={() => setModal({ opened: true, index })}>
                  <SettingsIcon size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Item options</TooltipContent>
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
      <ItemsModal modal={modal} setModal={setModal} />
    </div>
  );
};

export default ItemFields;
