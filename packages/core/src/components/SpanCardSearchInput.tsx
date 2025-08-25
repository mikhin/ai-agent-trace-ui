import { Search } from "lucide-react";

import { TextInput, type TextInputProps } from "./TextInput.tsx";

export const SpanCardSearchInput = ({ ...props }: TextInputProps) => {
  return (
    <TextInput
      startIcon={<Search className="size-4" />}
      placeholder="Filter..."
      {...props}
    />
  );
};
