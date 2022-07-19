import { animate, style, transition, trigger } from '@angular/animations';
import { AfterViewChecked, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, Input, OnInit, Output, QueryList } from '@angular/core';
import { forkJoin, map, of, delay } from 'rxjs';
import { LeftDirective } from '../directives/left.directive';
import { RightDirective } from '../directives/right.directive';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit, AfterViewChecked {
  @Input() title: string = '';
  @Input() leftWidth: number = 0;
  @Input() rightWidth: number = 0;
  @Input() minHeight: string = 'auto';
  @Input() isOpen: boolean = false;
  @Input() isNested: boolean = false;
  @Input() mode: 'side' | 'over' = 'side';
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();

  @ContentChildren(RightDirective, { descendants: true, read: ElementRef }) rights: QueryList<ElementRef> = new QueryList<ElementRef>();
  @ContentChildren(LeftDirective, { descendants: true, read: ElementRef }) lefts: QueryList<ElementRef> = new QueryList<ElementRef>();

  leftHeight: number = 0;
  rightHeight: number = 0;
  height = 'auto';

  constructor(private cdref: ChangeDetectorRef) { }

  get left(): string {
    return `calc(${this.leftWidth}% - 2rem)`;
  }

  get right(): string {
    return `${this.rightWidth}%`;
  }

  get rightChildren() {
    if (this.rights?.length) {
      return this.rights.map((ref: ElementRef) => ref.nativeElement);
    } else {
      return [];
    }
  }

  get leftChildren() {
    if (this.lefts && this.lefts?.length) {
      return this.lefts.map((ref: ElementRef) => ref.nativeElement);
    } else {
      return [];
    }
  }

  ngOnInit(): void {
    this.leftWidth = this.leftWidth === 0 ? (100 - this.rightWidth) : this.leftWidth;
  }

  ngAfterViewChecked(): void {
    forkJoin([
      of(this.leftChildren),
      of(this.rightChildren),
    ]).pipe(
      delay(1),
    ).subscribe(([left, right]) => {
      this.height = this.isOpen && right[0].offsetHeight > left[0].offsetHeight ? `calc(${right[0].offsetHeight}px + 2rem)` : this.minHeight;

      this.cdref.detectChanges();
    });
  }

  close(): void {
    this.onClose.emit();
  }
}
