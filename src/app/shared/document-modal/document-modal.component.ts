import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SecurityContext, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DocumentExtensions, MedicalDocument, MedicalDocumentType } from 'src/app/models/document.model';
import { DocumentViewModalComponent } from '../document-view-modal/document-view-modal.component';

export interface DialogData {
  documents: MedicalDocument[];
}

@Component({
  selector: 'app-document-modal',
  templateUrl: './document-modal.component.html',
  styleUrls: ['./document-modal.component.scss']
})
export class DocumentModalComponent implements OnInit, OnChanges {
  @Input() documents: MedicalDocument[] = [];
  @Output() documentsChange = new EventEmitter<MedicalDocument[]>();
  
  files: MedicalDocument[] = [];
  documentExtensions = DocumentExtensions;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<DocumentModalComponent>,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.files = this.data.documents;
  }

  ngOnChanges(changes: SimpleChanges): void {

  }
  
  get medicalDocumentTypes(): string[] {
    return Object.values(MedicalDocumentType);
  }

  isDocument(document: MedicalDocument): boolean {
    return DocumentExtensions.has(document.extension);
  }

  setDocumentType(file: MedicalDocument, type: string): void {
    file.documentType = type as MedicalDocumentType;
  }

  remove(document: MedicalDocument): void {
    const fileIndex = this.files.indexOf(document);
    const documentIndex = this.documents.indexOf(document);

    if (fileIndex >= 0) {
      this.files.splice(fileIndex, 1);
    }

    if (documentIndex >= 0) {
      this.documents.splice(documentIndex, 1);
      this.documentsChange.emit(this.documents);
    }
  }

  attach(document: MedicalDocument): void {
    const documentIndex = this.documents.indexOf(document);
    document.attached = true;

    if (documentIndex < 0) {
      this.documents.push(document);
    }

    this.documentsChange.emit(this.documents);
  }

  attachAll(): void {
    this.files.forEach(file => file.attached = true);

    this.dialogRef.close(this.files);
  }

  onFilesSelected(event: any): void {    
    if (event.target.files.length > 0) {
      this.files = Array.from(event.target.files);
      
      this.files.forEach(file => {
        file.documentType = MedicalDocumentType.DialysisTreatment;
        
        const splitName = file.name.split('.');
        const extension = `.${splitName[splitName.length - 1]}`;
        file.extension = extension;
      });

      console.log(this.files);

      event.target.value = null;
    }
  }

  openViewDocument(document: MedicalDocument): void {
    this.dialog.open(DocumentViewModalComponent, {
      panelClass: 'document-viewer-dialog-container',
      autoFocus: false,
      data: document
    });
  }
}
