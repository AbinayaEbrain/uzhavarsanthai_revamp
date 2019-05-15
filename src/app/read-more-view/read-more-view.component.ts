import { Component, OnInit, Input, ElementRef, OnChanges } from '@angular/core';

@Component({
  selector: 'app-read-more-view',
  templateUrl: './read-more-view.component.html',
  styleUrls: ['./read-more-view.component.css']
})
export class ReadMoreViewComponent implements OnInit {

  @Input() text: string;
  @Input() maxLength: number = 200;
  review: string;
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
      this.review = this.text;
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
      this.review = this.text.substring(0, this.maxLength) + '...';
    } else if (this.isCollapsed == false) {
      this.review = this.text;
    }
  }
  ngOnChanges() {
    this.determineView();
  }

}
