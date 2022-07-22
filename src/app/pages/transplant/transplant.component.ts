import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MedicalDocument } from 'src/app/models/document.model';
import { DocumentModalComponent } from 'src/app/shared/document-modal/document-modal.component';
import { KidneyTransfer, TransplantStatus } from './transplant.model';


@Component({
  selector: 'app-transplant',
  templateUrl: './transplant.component.html',
  styleUrls: ['./transplant.component.scss']
})
export class TransplantComponent {
  transplants: KidneyTransfer[] = [
    {
      centerName: 'Kidneys R\' Us',
      statuses: [
        {
          name: 'Patient Declines Referral',
          icon: 'thumb_down'
        },
        {
          name: 'Presently Non-Modifiable Condition',
          icon: 'masks'
        },
        {
          name: 'Referral Not Made',
          icon: 'speaker_notes_off'
        },
        {
          name: 'Referral made, not yet evaluated',
          icon: 'speaker_notes'
        },
        {
          name: 'Active',
          icon: 'speaker_notes'
        },
        {
          name: 'Patient Discontinued',
          icon: 'person_off'
        },
        {
          name: 'Permanently Removed',
          icon: 'block'
        },
        {
          name: 'Referral Declined By Center',
          icon: 'thumb_down'
        },
        {
          name: 'Referred Evaluation In Progress',
          icon: 'forum'
        },
        {
          name: 'Temporarily Inactive',
          icon: 'pause'
        },
        {
          name: 'Transplanted',
          icon: 'auto_awesome'
        },
      ],
      startedOn: this.addDays(-(Math.floor(Math.random() * (420 - 23 + 1)) + 23)),
      documents: [],
      documentCount: 0,
      activeTaskCount: 2,
      overdueTaskCount: 4,
      duesoonTaskCount: 3,
      pendingTaskCount: 5
    }
  ];
  selectedTransplant?: KidneyTransfer = undefined; 

  isOpen: boolean = false;

  addDays(days: number, date: Date = new Date()): Date {
    date.setDate(date.getDate() - days);
    
    return date;
  }

  constructor(public dialog: MatDialog) { }

  latestStatus(statuses: TransplantStatus[]): TransplantStatus {
    return statuses[statuses.length - 1];
  }

  open(transplant: KidneyTransfer): void {
    this.selectedTransplant = transplant;
    this.isOpen = true;
  }

  onCancel(): void {
    this.selectedTransplant = undefined;
    this.isOpen = false;
  }

  openDocumentModal(transplant: KidneyTransfer): void {
    const dialogRef = this.dialog.open(DocumentModalComponent, {
      height: 'auto',
      width: '820px',
      panelClass: 'document-uploader-dialog-container',
      autoFocus: false,
      hasBackdrop: false,
      data: {
        documents: transplant.documents 
      }
    });
    
    const changeObserver = dialogRef.componentInstance.documentsChange.subscribe((documents: MedicalDocument[]) => {
      transplant.documents = documents;
    });

    dialogRef.afterClosed().subscribe((documents: MedicalDocument[]) => {
      if (documents) {
        transplant.documents = documents;
      }

      changeObserver.unsubscribe();
    });
  }
}
