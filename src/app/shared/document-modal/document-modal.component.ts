import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MedicalDocument, MedicalDocumentType } from 'src/app/models/document.model';

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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<DocumentModalComponent>
  ) {}

  ngOnInit(): void {
    this.files = this.data.documents;
  }

  ngOnChanges(changes: SimpleChanges): void {

  }
  
  get medicalDocumentTypes(): string[] {
    return Object.values(MedicalDocumentType);
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
      this.files.forEach(file => file.documentType = MedicalDocumentType.DialysisTreatment);

      console.log(this.files);

      event.target.value = null;
    }
  }
}
