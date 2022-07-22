import { Component, EventEmitter, Output } from '@angular/core';
import { MedicalDocument, MedicalDocumentType } from 'src/app/models/document.model';

@Component({
  selector: 'app-file-form',
  templateUrl: './file-form.component.html',
  styleUrls: ['./file-form.component.scss']
})
export class FileFormComponent {
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  files: MedicalDocument[] = [];

  get medicalDocumentTypes(): string[] {
    return Object.values(MedicalDocumentType);
  }

  onCancel(): void {
    this.cancel.emit();
  }

  setDocumentType(file: MedicalDocument, type: string): void {
    file.documentType = type as MedicalDocumentType;
  }

  onFilesSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.files = Array.from(event.target.files);
      this.files.forEach(file => file.documentType = MedicalDocumentType.DialysisTreatment);

      event.target.value = null;
    }
  }

  remove(file: MedicalDocument): void {
    const index = this.files.indexOf(file);

    if (index >= 0) {
      this.files.splice(index, 1);
    }
  }
}
