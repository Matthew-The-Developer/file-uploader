import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MedicalDocument, MedicalDocumentType } from 'src/app/models/document.model';
import { Column, KidneyCount } from './demographics.model';

@Component({
  selector: 'app-demographic',
  templateUrl: './demographic.component.html',
  styleUrls: ['./demographic.component.scss']
})
export class DemographicComponent implements OnInit {
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
      side: 'Left',
      count: 12,
      countedOn: new Date('7/20/2022'),
      countedBy: 'Nurse Granite',
      hasDocuments: true,
    }
  ];

  files: MedicalDocument[] = [];

  isOpen: boolean = false;
  actionsWidth: string = 'auto';

  constructor() { }

  ngOnInit(): void { }

  get names(): string[] {
    return [ ...this.columns.map(column => column.name), 'actions'];
  }

  get medicalDocumentTypes(): string[] {
    return Object.values(MedicalDocumentType);
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

  onFilesSelected(): void {
    const inputNode: any = document.querySelector('#uploader');

    this.files = Array.from(inputNode.files);
    this.files.forEach(file => file.documentType = MedicalDocumentType.DialysisTreatment);

    console.log(this.files, this.medicalDocumentTypes);
  }
}
