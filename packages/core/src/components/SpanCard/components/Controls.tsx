import { ChevronsUpDown, ChevronsDownUp } from "lucide-react";
import { IconButton } from "../../IconButton";

interface ExpandAllButtonProps {
  onExpandAll: () => void;
}

interface CollapseAllButtonProps {
  onCollapseAll: () => void;
}

export const ExpandAllButton = ({ onExpandAll }: ExpandAllButtonProps) => {
  return (
    <IconButton onClick={onExpandAll} aria-label="Expand all">
      <ChevronsUpDown className="size-3.5" />
    </IconButton>
  );
};

export const CollapseAllButton = ({
  onCollapseAll,
}: CollapseAllButtonProps) => {
  return (
    <IconButton onClick={onCollapseAll} aria-label="Collapse all">
      <ChevronsDownUp className="size-3.5" />
    </IconButton>
  );
};
