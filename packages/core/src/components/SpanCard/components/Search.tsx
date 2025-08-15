import { useEffect, useState } from "react";
import { useDebounce } from "../../../hooks/useDebounce";
import { Input } from "../../Input";
import { Search } from "lucide-react";

interface SearchInputProps {
  onSearch: (value: string) => void;
}

export const SearchInput = ({ onSearch }: SearchInputProps) => {
  const [value, setValue] = useState("");

  const debouncedValue = useDebounce(value, 300);

  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  return (
    <Input
      value={value}
      onValueChange={setValue}
      startIcon={<Search className="size-4" />}
      placeholder="Filter..."
      onClear={() => setValue("")}
      clearable={!!value}
    />
  );
};
