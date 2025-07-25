import { type FC, type ReactNode } from "react";

type SpanCardsListProps = {
  className?: string;
  children: ReactNode;
};

export const SpanCardsList: FC<SpanCardsListProps> = ({
  className = "",
  children,
}) => {
  return (
    <ul className={className} role="tree" aria-label="Hierarchical card list">
      {children}
    </ul>
  );
};
