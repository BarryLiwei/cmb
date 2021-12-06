import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  tabs = [
    {
      id: 'frame000',
      text: '资产',
      src: '/fund'
    },
    {
      id: 'frame001',
      text: '业务',
      src: '/business'
    },
    {
      id: 'frame002',
      text: '追踪',
      src: '/track'
    },
    {
      id: 'frame003',
      text: '面板',
      src: '/panel'
    },
    {
      id: 'frame004',
      text: '英雄列表',
      src: '/heros'
    }
  ];

  actvTab = this.tabs[0].id;
  constructor() { }

  ngOnInit(): void {

  }

}
