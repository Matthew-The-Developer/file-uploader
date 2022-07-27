import { MedicalDocument } from "src/app/models/document.model";

interface KidneyTransfer {
  centerName: string;
  statuses: TransplantStatus[];
  startedOn: Date;
  documents?: MedicalDocument[];
  documentCount?: number;
  activeTaskCount?: number;
  incompleteTaskCount?: number;
  overdueTaskCount?: number;
  duesoonTaskCount?: number;
  pendingTaskCount?: number;
}

interface TransplantStatus {
  name: string;
  icon: string;
  state: TransplantStatusState
}

enum TransplantStatusState {
  Complete = 'status-complete',
  Incomplete = 'status-incomplete',
  Active = 'status-active',
  Transplanted = 'status-transplanted'
}

export { KidneyTransfer, TransplantStatus, TransplantStatusState };