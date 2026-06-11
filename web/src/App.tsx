import { Routes, Route, useNavigate } from 'react-router-dom';
import { useNuiEvent } from './hooks/useNuiEvent';
import { useSetters, useStore } from './store';
import Doors from './layouts/doors';
import Settings from './layouts/settings';
import { useVisibility } from './store/visibility';
import { useExitListener } from './hooks/useExitListener';
import { useDoors } from './store/doors';
import { DoorColumn } from './store/doors';
import { convertData } from './utils/convertData';
import { cn } from '@/lib/utils';

const App: React.FC = () => {
  const setSounds = useSetters((setter) => setter.setSounds);
  const [visible, setVisible] = useVisibility((state) => [state.visible, state.setVisible]);
  const doors = useDoors((state) => state.doors);
  const setDoors = useDoors((state) => state.setDoors);
  const navigate = useNavigate();

  useNuiEvent('playSound', async (data: { sound: string; volume: number }) => {
    const sound = new Audio(`./sounds/${data.sound}.ogg`);
    sound.volume = data.volume;
    await sound.play();
  });

  useNuiEvent('setSoundFiles', (data: string[]) => setSounds(data));

  useNuiEvent('setVisible', (data: number) => {
    setVisible(true);
    if (data === undefined) return navigate('/');
    for (let i = 0; i < doors.length; i++) {
      if (doors[i].id === data) {
        useStore.setState(convertData(doors[i]), true);
        navigate('/settings/general');
        break;
      }
    }
  });

  useNuiEvent('updateDoorData', (data: DoorColumn | number) => {
    if (typeof data === 'number') return setDoors(doors.filter((door) => door.id !== data));
    else {
      if (data.hasOwnProperty('id')) {
        let index = doors.length;
        for (let i = 0; i < index; i++) {
          const door = Object.values(doors)[i];
          if (door.id == data.id) {
            index = i;
            break;
          }
        }

        return setDoors(Object.values({ ...doors, [index]: data } as DoorColumn[]));
      }

      return setDoors(Object.values(data));
    }
  });

  useExitListener(setVisible);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div
        className={cn(
          'h-[500px] w-[700px] overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-2xl transition-all duration-300',
          visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        )}
      >
        {visible && (
          <Routes>
            <Route path="/" element={<Doors />} />
            <Route path="/settings/*" element={<Settings />} />
          </Routes>
        )}
      </div>
    </div>
  );
};

export default App;
