import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ContainerDirective } from 'src/app/shared/directives/container.directive';
import { KidneyTransfer, TransplantStatus } from '../transplant.model';

@Component({
  selector: 'app-transplant-form',
  templateUrl: './transplant-form.component.html',
  styleUrls: ['./transplant-form.component.scss']
})
export class TransplantFormComponent implements AfterViewInit {
  @Input() transplant?: KidneyTransfer = undefined;
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild(ContainerDirective, { read: ElementRef }) header!: ElementRef;

  headerWidth: number = 0;

  ngAfterViewInit(): void {
    const observer = new ResizeObserver(entries => {
      entries.forEach(entry => {
        this.headerWidth = Math.floor(entry.contentRect.width);
        console.log("width", this.headerWidth);
      });
    });

    observer.observe(this.header.nativeElement);
  }

  onCancel(): void {
    this.cancel.emit();
  }

  latestStatus(statuses?: TransplantStatus[]): TransplantStatus | undefined {
    if (statuses) {
      return statuses[statuses.length - 1];
    } else {
      return undefined;
    }
  }
}
