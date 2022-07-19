interface KidneyCount {
  side: 'Left' | 'Right';
  count: number;
  countedOn: Date;
  countedBy: string;
  hasDocuments: boolean;
}

interface Column {
  name: string;
  label: string;
  width: string;
  pipe?: any;
  pipeArgs?: any[];
}

export { KidneyCount, Column };