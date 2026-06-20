import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DocumentExtensions, ImageExtensions, MedicalDocument, PDFExtensions } from 'src/app/models/document.model';

@Component({
  selector: 'app-document-view-modal',
  templateUrl: './document-view-modal.component.html',
  styleUrls: ['./document-view-modal.component.scss']
})
export class DocumentViewModalComponent implements OnInit {
  document!: MedicalDocument;
  url: string = '';

  imageExtensions = ImageExtensions;
  documentExtensions = DocumentExtensions;
  pdfExtensions = PDFExtensions;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MedicalDocument,
  ) { }

  ngOnInit(): void {
    this.document = this.data;
    console.log((this.document.size / (1024*1024)).toFixed(2));

    const reader = new FileReader();
    reader.onload = (event: any) => this.url = reader.result as string;

    reader.readAsDataURL(this.document);
  }
}
