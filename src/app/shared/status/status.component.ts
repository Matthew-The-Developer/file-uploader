import { Component, Input } from '@angular/core';
import { TransplantStatus } from 'src/app/pages/transplant/transplant.model';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent {
  @Input() statuses: TransplantStatus[] = [];
  @Input() viewableCount: number = 4;
  @Input() width: number = 0;
  @Input() readonly: boolean = false;

  constructor() { }
  
  get clipped(): boolean {
    return ((this.statuses.length * 32) + ((this.statuses.length - 1) * 24) + 142 + 40 + 32) > this.width;
  }

  get visibleStatuses(): TransplantStatus[] {
    if (this.statuses.length > 0) {
      const start = this.statuses.length - this.viewableCount;
      return this.statuses.slice(start);
    } else {
      return [];
    }
  }

  get hiddenStatusCount(): number {
    return this.statuses.length - this.viewableCount;
  }
}
