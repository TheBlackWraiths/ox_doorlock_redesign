import { useEffect, useMemo, useState } from 'react';
import { StoreState, useSetters, useStore } from '../../../../../store';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/modern-ui/dialog';
import { Label } from '@/components/modern-ui/label';
import { Input } from '@/components/modern-ui/input';
import { Button } from '@/components/modern-ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/modern-ui/select';

interface Props {
  selectData: { value: string; label: string }[];
  setModal: React.Dispatch<React.SetStateAction<{ opened: boolean; index: number }>>;
  modal: { opened: boolean; index: number };
}

const DifficultyModal: React.FC<Props> = ({ selectData, setModal, modal }) => {
  const lockpickDifficulty = useStore((store) => store.lockpickDifficulty);
  const setLockpickDifficulty = useSetters((setter) => setter.setLockpickDifficulty);

  const lockpickData = useMemo(() => {
    return lockpickDifficulty[modal.index];
  }, [modal, lockpickDifficulty]);

  const [select, setSelect] = useState<string>(
    typeof lockpickData === 'string' ? lockpickData : 'custom'
  );
  const [areaSize, setAreaSize] = useState<string>(
    typeof lockpickData === 'object' ? String(lockpickData.areaSize ?? '') : ''
  );
  const [speedMultiplier, setSpeedMultiplier] = useState<string>(
    typeof lockpickData === 'object' ? String(lockpickData.speedMultiplier ?? '') : ''
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (modal.opened) {
      setSelect(typeof lockpickData === 'string' ? lockpickData : 'custom');
      setAreaSize(typeof lockpickData === 'object' ? String(lockpickData.areaSize ?? '') : '');
      setSpeedMultiplier(typeof lockpickData === 'object' ? String(lockpickData.speedMultiplier ?? '') : '');
      setError(null);
    }
  }, [modal.opened, lockpickData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!select) {
      setError('Difficulty is required');
      return;
    }

    if (select === 'custom' && (!areaSize || !speedMultiplier)) {
      setError('Area size and speed multiplier are required for custom difficulty');
      return;
    }

    setModal((m) => ({ ...m, opened: false }));
    const data =
      select === 'custom'
        ? { areaSize: Number(areaSize), speedMultiplier: Number(speedMultiplier) }
        : select;

    setLockpickDifficulty((prevState) => {
      const array = [...prevState];
      array[modal.index] = data as StoreState['lockpickDifficulty'][number];
      return array;
    });
  };

  return (
    <Dialog open={modal.opened} onOpenChange={(opened) => setModal((m) => ({ ...m, opened }))}>
      <DialogContent className="max-w-xs border-border bg-card text-card-foreground" hideClose>
        <DialogHeader>
          <DialogTitle>Lockpick difficulty</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Difficulty</Label>
            <Select value={select} onValueChange={setSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                {selectData.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="areaSize">Area size</Label>
            <Input
              id="areaSize"
              type="number"
              max={360}
              disabled={select !== 'custom'}
              value={areaSize}
              onChange={(e) => setAreaSize(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">Skill check area size in degrees</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="speedMultiplier">Speed multiplier</Label>
            <Input
              id="speedMultiplier"
              type="number"
              step={0.01}
              disabled={select !== 'custom'}
              value={speedMultiplier}
              onChange={(e) => setSpeedMultiplier(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">Number the indicator speed will be multiplied by</p>
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" variant="secondary" className="w-full">
            Confirm
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DifficultyModal;
