import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ContainerDirective } from 'src/app/shared/directives/container.directive';
import { KidneyTransfer, TransplantStatus } from '../transplant.model';

@Component({
  selector: 'app-transplant-center',
  templateUrl: './transplant-center.component.html',
  styleUrls: ['./transplant-center.component.scss']
})
export class TransplantCenterComponent implements AfterViewInit {
  @Input() center!: KidneyTransfer;
  @Output() onOpen: EventEmitter<KidneyTransfer> = new EventEmitter<KidneyTransfer>();
  @Output() onAttachFile: EventEmitter<KidneyTransfer> = new EventEmitter<KidneyTransfer>();
  @ViewChild(ContainerDirective, { read: ElementRef }) header!: ElementRef;

  centerWidth: number = 0

  constructor() { }

  ngAfterViewInit(): void {
    const observer = new ResizeObserver(entries => {
      entries.forEach(entry => {
        this.centerWidth = Math.floor(entry.contentRect.width);
        console.log("width", this.centerWidth);
      });
    });

    observer.observe(this.header.nativeElement);
  }

  latestStatus(statuses: TransplantStatus[]): TransplantStatus {
    return statuses[statuses.length - 1];
  }

  open(center: KidneyTransfer): void {
    this.onOpen.emit(center);
  }

  attachFile(center: KidneyTransfer): void {
    this.onAttachFile.emit(center);
  }
}
