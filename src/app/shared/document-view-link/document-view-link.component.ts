import { Component, Input, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DocumentExtensions, MedicalDocument } from 'src/app/models/document.model';

@Component({
  selector: 'app-document-view-link',
  templateUrl: './document-view-link.component.html',
  styleUrls: ['./document-view-link.component.scss']
})
export class DocumentViewLinkComponent implements OnInit {
  @Input() document!: MedicalDocument;
  url: string = '';
  
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    const reader = new FileReader();
    reader.onload = (event: any) => this.url = reader.result as string;

    reader.readAsDataURL(this.document);
  }

  get documentRoute() {
    return decodeURIComponent(this.sanitizer.sanitize(SecurityContext.URL, `${DocumentExtensions.get(this.document.extension)?.application}${this.url}`)!);
  }
}
