import { CircleHelpIcon } from '@/components/icons/circle-help';
import { Input as TextInput } from '@/components/modern-ui/input';
import { Label } from '@/components/modern-ui/label';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/modern-ui/tooltip';
import { cn } from '@/lib/utils';

interface Props {
  label: string;
  type: 'text' | 'number';
  value?: string | number;
  setValue: (value: string | number) => void;
  infoCircle?: string;
  className?: string;
}

const Input: React.FC<Props> = ({ label, type, infoCircle, className, value, setValue }) => {
  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center gap-1.5">
        <Label className="text-sm font-medium">{label}</Label>
        {infoCircle && (
          <Tooltip>
            <TooltipTrigger asChild>
              <button type="button" className="text-muted-foreground hover:text-foreground">
                <CircleHelpIcon size={16} />
              </button>
            </TooltipTrigger>
            <TooltipContent className="max-w-[200px]">{infoCircle}</TooltipContent>
          </Tooltip>
        )}
      </div>
      <TextInput
        type={type}
        value={value ?? ''}
        step={type === 'number' ? 0.1 : undefined}
        onChange={(e) =>
          setValue(type === 'number' ? (e.target.value === '' ? 0 : Number(e.target.value)) : e.target.value)
        }
      />
    </div>
  );
};

export default Input;
