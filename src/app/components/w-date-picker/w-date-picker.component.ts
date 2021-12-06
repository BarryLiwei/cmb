import {
  Component, OnInit, Input, Output, OnChanges,
  EventEmitter, SimpleChanges, ViewChild, ElementRef
} from '@angular/core';
import { DatePipe } from '@angular/common';
// import { getISOTimeString } from '../../../utils/time';
import { NzPopoverDirective } from 'ng-zorro-antd';
// import { reloadWdatePicker } from '@uino/app/shared/components/datetime-picker/datetime-picker.component';
// import { ONE_DAY_MS, ONE_HOUR_MS, ONE_MINUTE_MS } from '@uino/app/core/types/date-time-consts';
// import { TimeChangeEventData } from '@src/app/core/types';

@Component({
  selector: 'app-w-date-picker',
  templateUrl: './w-date-picker.component.html',
  styleUrls: ['./w-date-picker.component.less'],
  providers: [DatePipe]
})
export class WDatePickerComponent implements OnInit, OnChanges {

  private _entering: boolean;
  private _latest: boolean;

  @Input() readOnly: boolean;

  @Input() startTime: Date;
  @Input() endTime: Date;
  // @Output() timeChange = new EventEmitter<TimeChangeEventData>();

  @Input() showToday: boolean;
  @Input() showYesterday: boolean;

  // 重置
  @Input() showReset: boolean;
  @Input() resetStartTime: Date;
  @Input() resetEndTime: Date;

  // 最新
  @Input() showLatest: boolean;
  @Input() intervalHour: number;

  @Input() hideReloadLatest: boolean;
  @Input() lockVisible: boolean;
  @Input() lockShow: boolean;
  @Input() advanceType: boolean;

  @ViewChild('popoverStartTime') popoverStartTime: ElementRef;
  @ViewChild('popoverEndTime') popoverEndTime: ElementRef;
  @ViewChild('popover', { read: NzPopoverDirective }) popover: NzPopoverDirective;

  inputStartTime: string;
  inputEndTime: string;
  popoverVisible: boolean;
  hours = [3, 6, 12, 24, 36, 48];
  minutes = [10, 30];

  constructor(private datePipe: DatePipe) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.startTime && false === changes.startTime.isFirstChange()) {
      this.inputStartTime = this.formatDate(changes.startTime.currentValue);
    }
    if (changes.endTime && false === changes.endTime.isFirstChange()) {
      this.inputEndTime = this.formatDate(changes.endTime.currentValue);
    }
  }
  ngOnInit(): void {
    this.updateInputTimeValues(this.formatDate(this.startTime), this.formatDate(this.endTime));
  }

  formatDate(date: Date, format?: string): string {
    return this.datePipe.transform(date, format || 'yyyy-MM-dd HH:mm');
  }

  getDateDownToMinute(): Date {
    // return new Date(getISOTimeString(new Date(), 'minute'));
  }

  updateTimeValues(startTimeValue: string, endTimeValue: string): void {
    this.popoverStartTime.nativeElement.value = startTimeValue;
    this.popoverEndTime.nativeElement.value = endTimeValue;
  }

  updateInputTimeValues(startTimeValue: string, endTimeValue: string): void {
    this.inputStartTime = startTimeValue;
    this.inputEndTime = endTimeValue;
  }

  onPopoverChange(visible: boolean): void {
    if (this._latest) {
      this._latest = false;
      return;
    }

    if (this.readOnly) {
      (this.popover as any)?.triggerUnlisteners?.forEach(handler => handler());
    }

    this.popoverVisible = this.readOnly ? false : visible;

    if (!this.popoverVisible) {
        this.onConfirmClick(null);
    }
    if (this.popoverVisible) {
      setTimeout(() => {
        try {
          this.updateTimeValues(this.inputStartTime, this.inputEndTime);
        } catch (err) { }
      }, 100);
    }
  }
  onTodayClick($event: any) {
    const nowTime = new Date();
    const endTime = this.getDateDownToMinute();
    this.updateTimeValues(this.formatDate(nowTime, 'yyyy-MM-dd 00:00'), this.formatDate(endTime));
    this.onConfirmClick(null);
  }
  onYesterdayClick($event: any) {
    // const nowTime = new Date((new Date()).getTime() - ONE_DAY_MS);
    // this.updateTimeValues(this.formatDate(nowTime, 'yyyy-MM-dd 00:00'), this.formatDate(nowTime, 'yyyy-MM-dd 23:59'));
    // this.onConfirmClick(null);
  }
  onSelectClickMinute(minute: number) {
    const endTime = this.getDateDownToMinute();
    // const startTime = new Date(endTime.getTime() - ONE_MINUTE_MS * minute);
    // this.updateTimeValues(this.formatDate(startTime), this.formatDate(endTime));
    // this.onConfirmClick(null);
  }
  onSelectClick1(hour: number) {
    const endTime = this.getDateDownToMinute();
    // const startTime = new Date(endTime.getTime() - ONE_HOUR_MS * hour);
    // this.updateTimeValues(this.formatDate(startTime), this.formatDate(endTime));
    // this.onConfirmClick(null);
  }
  onSelectClick2(hour: number) {
    // const endTime = new Date(this.endTime.getTime() + hour * ONE_HOUR_MS);
    // const startTime = new Date(this.startTime.getTime() + hour * ONE_HOUR_MS);
    // this.updateTimeValues(this.formatDate(startTime), this.formatDate(endTime));
    // this.onConfirmClick(null);
  }

  onResetClick($event: any) {
    this.updateTimeValues(this.formatDate(this.resetStartTime), this.formatDate(this.resetEndTime));
    this.onConfirmClick(null);
  }
  onLatestClick($event: any) {
    const endTime = this.getDateDownToMinute();
    // const startTime = new Date(endTime.getTime() - (this.intervalHour ? this.intervalHour : 3) * ONE_HOUR_MS);
    // this.updateTimeValues(this.lockVisible
    //   ? this.formatDate(this.startTime)
    //   : this.formatDate(startTime), this.formatDate(endTime));
    // this.onConfirmClick(null, true);
  }
  onLatestClickEx($event: any) {
    const endTime = this.getDateDownToMinute();
    const startTime = new Date(endTime.getTime() - (this.intervalHour ? this.intervalHour : 3) * ONE_HOUR_MS);
    this.updateInputTimeValues(this.formatDate(this.lockVisible ? this.startTime : startTime), this.formatDate(endTime));
    // this.timeChange.emit({ startTime: this.inputStartTime, endTime: this.inputEndTime, latest: true });
  }
  onClearClick($event: any) {
    this.updateTimeValues('', '');
  }
  onConfirmClick($event: any, latest?: boolean): void {
    this.popoverVisible = false;
    this._latest = latest;
    const [startTime, endTime] = [this.popoverStartTime, this.popoverEndTime].map(ref => ref.nativeElement.value);
    if ([startTime, endTime].every(value => value.length === 16)) {
      this.updateInputTimeValues(startTime, endTime);
      // this.timeChange.emit({ startTime, endTime, latest });
    }
  }
  onLockClick() {
    this.lockVisible = !this.lockVisible;
  }

  onEnter($event: any) {
    this._entering = true;

    try {
      (window as any).$dp.hide();
    } catch (err) { }
  }
  onBlur($event: any) { }

  onKeydown(event: KeyboardEvent): void {
    if (this._entering) {
      this._entering = false;
      return;
    }

    // reloadWdatePicker(true);
  }
}
