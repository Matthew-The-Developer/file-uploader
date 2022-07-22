import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MedicalDocument, MedicalDocumentType } from 'src/app/models/document.model';
import { DocumentModalComponent } from 'src/app/shared/document-modal/document-modal.component';
import { Column, KidneyCount } from './demographics.model';

@Component({
  selector: 'app-demographic',
  templateUrl: './demographic.component.html',
  styleUrls: ['./demographic.component.scss']
})
export class DemographicComponent {
  columns: Column[] = [
    { name: 'side', label: 'Side', width: '10%' },
    { name: 'count', label: 'Count', width: '25%' },
    { name: 'countedOn', label: 'On', width: '32%', pipe: DatePipe, pipeArgs: ['longDate'] },
    { name: 'countedBy', label: 'By', width: '24%' },
  ];
  dataSource: KidneyCount[] = [
    {
      side: 'Left',
      count: 3,
      countedOn: new Date('7/15/2022'),
      countedBy: 'Dr. Geode',
      hasDocuments: false,
    },
    {
      side: 'Left',
      count: 12,
      countedOn: new Date('7/20/2022'),
      countedBy: 'Nurse Granite',
      hasDocuments: true,
    },
    {
      side: 'Right',
      count: 9,
      countedOn: new Date('7/20/2022'),
      countedBy: 'Nurse Granite',
      hasDocuments: true,
    }
  ];

  files: MedicalDocument[] = [];

  isOpen: boolean = false;
  actionsWidth: string = 'auto';

  constructor(public dialog: MatDialog) { }

  get names(): string[] {
    return [ ...this.columns.map(column => column.name), 'actions'];
  }

  width(bias: string): string {
    return `1 1 ${bias}`;
  }

  open(): void {
    this.isOpen = true;
  }

  onCancel(): void {
    this.isOpen = false;
  }

  openDocumentModal(): void {
    this.dialog.open(DocumentModalComponent, {
      height: 'auto',
      width: '820px',
      panelClass: 'document-uploader-dialog-container',
      autoFocus: false,
      hasBackdrop: false,
    });
  }
}
