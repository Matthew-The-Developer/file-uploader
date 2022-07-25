import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { MedicalDocument } from 'src/app/models/document.model';

@Component({
  selector: 'app-document-view-modal',
  templateUrl: './document-view-modal.component.html',
  styleUrls: ['./document-view-modal.component.scss']
})
export class DocumentViewModalComponent implements OnInit {
  document: MedicalDocument | undefined = undefined;
  url: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MedicalDocument,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.document = this.data;

    const reader = new FileReader();
    reader.onload = (event: any) => this.url = reader.result as string;

    reader.readAsDataURL(this.document);
  }
}
