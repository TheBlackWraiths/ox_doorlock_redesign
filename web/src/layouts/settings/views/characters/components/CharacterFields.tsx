import { DeleteIcon } from '@/components/icons/delete';
import { useStore, useSetters } from '../../../../../store';
import { Input } from '@/components/modern-ui/input';
import { Button } from '@/components/modern-ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/modern-ui/tooltip';

const CharacterFields: React.FC = () => {
  const characters = useStore((state) => state.characters);
  const setCharacters = useSetters((setter) => setter.setCharacters);

  const handleChange = (value: string | undefined, index: number) => {
    setCharacters((prevState) => {
      return prevState.map((item, indx) => (index === indx ? value : item));
    });
  };

  const handleRowDelete = (index: number) => {
    setCharacters((prevState) => prevState.filter((_obj, indx) => indx !== index));
  };

  return (
    <div className="space-y-3">
      {characters.map((field, index) => (
        <div key={`group-${index}`} className="flex items-center gap-3">
          <Input
            className="flex-1"
            placeholder="Character Id"
            value={field as string}
            onChange={(e) => handleChange(e.target.value, index)}
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

export default CharacterFields;
