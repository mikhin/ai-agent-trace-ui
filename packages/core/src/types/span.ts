export type Span = {
  id: string;
  title: string;
  startTime: Date;
  duration: number;
  cost: number;
  children?: Span[];
};
