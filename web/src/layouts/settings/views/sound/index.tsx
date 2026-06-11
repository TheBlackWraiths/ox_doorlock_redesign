import { useSetters, useStore } from '../../../../store';
import { Label } from '@/components/modern-ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/modern-ui/select';

const Sound: React.FC = () => {
  const sounds = useSetters((state) => state.sounds);
  const lockSound = useStore((state) => state.lockSound);
  const unlockSound = useStore((state) => state.unlockSound);
  const setLockSound = useSetters((setter) => setter.setLockSound);
  const setUnlockSound = useSetters((setter) => setter.setUnlockSound);

  return (
    <div className="h-full min-h-0 overflow-y-auto space-y-4">
      <div className="space-y-2">
        <Label>Lock sound</Label>
        <Select value={lockSound || ''} onValueChange={(value) => setLockSound(value || null)}>
          <SelectTrigger>
            <SelectValue placeholder="Select lock sound" />
          </SelectTrigger>
          <SelectContent>
            {sounds.map((sound) => (
              <SelectItem key={sound} value={sound}>
                {sound}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Unlock sound</Label>
        <Select value={unlockSound || ''} onValueChange={(value) => setUnlockSound(value || null)}>
          <SelectTrigger>
            <SelectValue placeholder="Select unlock sound" />
          </SelectTrigger>
          <SelectContent>
            {sounds.map((sound) => (
              <SelectItem key={sound} value={sound}>
                {sound}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Sound;
