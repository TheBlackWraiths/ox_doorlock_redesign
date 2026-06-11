import { useMemo, useState } from 'react';
import { StringField, useSetters, useStore } from '../../../../../store';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/modern-ui/dialog';
import { Input } from '@/components/modern-ui/input';
import { Label } from '@/components/modern-ui/label';
import { Switch } from '@/components/modern-ui/switch';
import { Button } from '@/components/modern-ui/button';

interface Props {
  setModal: React.Dispatch<React.SetStateAction<{ opened: boolean; index: number }>>;
  modal: { opened: boolean; index: number };
}

const ItemsModal: React.FC<Props> = ({ modal, setModal }) => {
  const itemFields = useStore((state) => state.items);
  const setItemFields = useSetters((setter) => setter.setItems);

  const itemData = useMemo(() => {
    return itemFields[modal.index];
  }, [modal, itemFields]);

  const [metadata, setMetadata] = useState<string>(itemData?.metadata ?? '');
  const [remove, setRemove] = useState<boolean>(itemData?.remove ?? false);

  const handleOpenChange = (opened: boolean) => {
    if (opened && itemData) {
      setMetadata(itemData.metadata ?? '');
      setRemove(itemData.remove ?? false);
    }
    setModal((state) => ({ ...state, opened }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setModal((state) => ({ ...state, opened: false }));
    setItemFields((prevState) => {
      return prevState.map((item, index) => {
        if (index === modal.index) return { ...item, metadata: metadata as StringField, remove };
        return item;
      });
    });
  };

  return (
    <Dialog open={modal.opened} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-xs border-border bg-card text-card-foreground" hideClose>
        <DialogHeader>
          <DialogTitle>Item options</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="metadata">Metadata type</Label>
            <Input id="metadata" value={metadata} onChange={(e) => setMetadata(e.target.value)} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="remove">Remove on use</Label>
            <Switch id="remove" checked={remove} onCheckedChange={setRemove} />
          </div>
          <Button type="submit" variant="secondary" className="w-full">
            Confirm
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ItemsModal;
