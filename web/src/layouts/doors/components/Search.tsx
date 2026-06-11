import { SearchIcon } from '@/components/icons/search';
import { useEffect } from 'react';
import useDebounce from '../../../hooks/useDebounce';
import { useSearch } from '../../../store/search';
import { Input } from '@/components/modern-ui/input';

const Searchbar: React.FC = () => {
  const search = useSearch();
  const debouncedSearch = useDebounce(search.value);

  useEffect(() => {
    search.setDebouncedValue(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <div className="relative min-w-0 flex-1 transition-all focus-within:flex-[1.2]">
      <SearchIcon
        size={16}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
      />
      <Input
        className="pl-9"
        placeholder="Search doors..."
        value={search.value ?? ''}
        onChange={(e) => search.setValue(e.target.value)}
      />
    </div>
  );
};

export default Searchbar;
