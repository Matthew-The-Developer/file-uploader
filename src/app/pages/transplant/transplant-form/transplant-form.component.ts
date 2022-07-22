import { Component, EventEmitter, Input, Output } from '@angular/core';
import { KidneyTransfer, TransplantStatus } from '../transplant.model';

@Component({
  selector: 'app-transplant-form',
  templateUrl: './transplant-form.component.html',
  styleUrls: ['./transplant-form.component.scss']
})
export class TransplantFormComponent {
  @Input() transplant?: KidneyTransfer = undefined;
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

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
