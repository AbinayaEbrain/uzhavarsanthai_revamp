import { Component, OnInit, Input, ElementRef, OnChanges } from '@angular/core';

@Component({
  selector: 'app-ticketreadmore',
  templateUrl: './ticketreadmore.component.html',
  styleUrls: ['./ticketreadmore.component.css']
})
export class TicketreadmoreComponent implements OnInit, OnChanges {
  @Input() text: string;
  @Input() maxLength: number = 200;
  currentText: string;
  hideToggle: boolean = true;
  show: boolean = true;
  public isCollapsed: boolean = true;
  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
  }

  toggleView() {
    this.isCollapsed = !this.isCollapsed;
    this.determineView();
  }

  determineView() {
    if (!this.text || this.text.length <= this.maxLength) {
      this.currentText = this.text;
      this.isCollapsed = false;
      this.hideToggle = true;

      if (this.text.length < 200) {
        this.show = false;
      }
      return;
    }

    this.show = true;
    this.hideToggle = false;

    if (this.isCollapsed == true) {
      this.currentText = this.text.substring(0, this.maxLength) + '...';
    } else if (this.isCollapsed == false) {
      this.currentText = this.text;
    }
  }

  ngOnChanges() {
    this.determineView();
  }
}
