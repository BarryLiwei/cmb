import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-fund',
  templateUrl: './fund.component.html',
  styleUrls: ['./fund.component.less']
})
export class FundComponent implements OnInit {
  @ViewChild('popoverStartTime') popoverStartTime: ElementRef;
  @ViewChild('popoverEndTime') popoverEndTime: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }



}
