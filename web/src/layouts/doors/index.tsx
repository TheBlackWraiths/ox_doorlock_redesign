import Header from './components/Header';
import DoorTable from './components/DoorTable';

const Doors: React.FC = () => {
  return (
    <div className="flex h-full flex-col">
      <Header />
      <DoorTable />
    </div>
  );
};

export default Doors;
