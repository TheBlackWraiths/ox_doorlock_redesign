import { CircleHelpIcon } from '@/components/icons/circle-help';
import { Switch } from '@/components/modern-ui/switch';
import { Label } from '@/components/modern-ui/label';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/modern-ui/tooltip';

interface Props {
  label: string;
  infoCircle?: string;
  value: boolean;
  toggle: () => void;
}

const TooltipSwitch: React.FC<Props> = ({ infoCircle, label, value, toggle }) => {
  return (
    <div className="flex items-center justify-between gap-3 rounded-md border border-border bg-secondary px-3 py-2.5">
      <div className="flex items-center gap-2">
        <Label htmlFor={label} className="cursor-pointer text-sm font-medium">
          {label}
        </Label>
        {infoCircle && (
          <Tooltip>
            <TooltipTrigger asChild>
              <button type="button" className="text-muted-foreground hover:text-foreground">
                <CircleHelpIcon size={16} />
              </button>
            </TooltipTrigger>
            <TooltipContent className="max-w-[220px]">{infoCircle}</TooltipContent>
          </Tooltip>
        )}
      </div>
      <Switch id={label} checked={value} onCheckedChange={() => toggle()} />
    </div>
  );
};

export default TooltipSwitch;
