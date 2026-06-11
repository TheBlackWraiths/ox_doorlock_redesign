import Input from './Input';
import { useStore, useSetters } from '../../../../../store';

const Inputs: React.FC = () => {
  const doorName = useStore((state) => state.name);
  const passcode = useStore((state) => state.passcode);
  const autolockInterval = useStore((state) => state.autolock);
  const interactDistance = useStore((state) => state.maxDistance);
  const doorRate = useStore((state) => state.doorRate);

  const setDoorName = useSetters((setter) => setter.setName);
  const setPasscode = useSetters((setter) => setter.setPasscode);
  const setAutolockInterval = useSetters((setter) => setter.setAutolock);
  const setInteractDistance = useSetters((setter) => setter.setMaxDistance);
  const setDoorRate = useSetters((setter) => setter.setDoorRate);

  return (
    <div className="grid grid-cols-2 gap-4">
      <Input label="Door name" type="text" value={doorName || ''} setValue={(value) => setDoorName(value as string)} />
      <Input label="Passcode" type="text" value={passcode || ''} setValue={(value) => setPasscode(value as string)} />
      <Input
        label="Autolock Interval"
        type="number"
        value={autolockInterval || 0}
        setValue={(value) => setAutolockInterval(value as number)}
        infoCircle="Time in seconds after which the door will be locked"
      />
      <Input
        label="Interact Distance"
        type="number"
        value={interactDistance || 0}
        setValue={(value) => setInteractDistance(value as number)}
        infoCircle="Controls the distance from which the player can interact with the door"
      />
      <Input
        label="Door Rate"
        type="number"
        className="col-span-2"
        value={doorRate || 0}
        setValue={(value) => setDoorRate(value as number)}
        infoCircle="Speed the automatic door will move at"
      />
    </div>
  );
};

export default Inputs;
