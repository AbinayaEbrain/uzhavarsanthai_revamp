/// <reference types="@types/googlemaps" />
import { Directive, ElementRef, OnInit } from '@angular/core';

 //const google = require('@types/googlemaps');
import {} from "googlemaps";
declare var google: any;
@Directive({
  selector: '[google-place]'
})
export class GooglePlacesDirective implements OnInit {
  private element: HTMLInputElement;
  

  constructor(private elRef: ElementRef) {

    this.element = elRef.nativeElement;

   }

  ngOnInit() {
    const autocomplete = new google.maps.places.Autocomplete(this.element);
  }

}
