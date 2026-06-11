import { DeleteIcon } from '@/components/icons/delete';
import { useStore, useSetters } from '../../../../../store';
import { Input } from '@/components/modern-ui/input';
import { Button } from '@/components/modern-ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/modern-ui/tooltip';

const GroupFields: React.FC = () => {
  const groups = useStore((state) => state.groups);
  const setGroups = useSetters((setter) => setter.setGroups);

  const handleChange = (value: string | number | undefined, index: number, property: 'name' | 'grade') => {
    setGroups((prevState) => {
      return prevState.map((item, indx) => (index === indx ? { ...item, [property]: value } : item));
    });
  };

  const handleRowDelete = (index: number) => {
    setGroups((prevState) => prevState.filter((obj, indx) => indx !== index));
  };

  return (
    <div className="space-y-3">
      {groups.map((field, index) => (
        <div key={`group-${index}`} className="flex items-center gap-3">
          <Input
            className="flex-1"
            placeholder="Group"
            value={field.name as string}
            onChange={(e) => handleChange(e.target.value, index, 'name')}
          />
          <Input
            className="w-28"
            type="number"
            placeholder="Grade"
            value={field.grade ?? ''}
            onChange={(e) => handleChange(e.target.value === '' ? undefined : Number(e.target.value), index, 'grade')}
          />
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
    </div>
  );
};

export default GroupFields;
