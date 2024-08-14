import { LocationService } from './../../../services/location.service';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  icon,
  LatLng,
  latLng,
  LatLngExpression,
  LatLngTuple,
  LeafletMouseEvent,
  map,
  Map,
  marker,
  Marker,
  tileLayer,
} from 'leaflet';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  @Input()
  order!: Order;
  private readonly MARKER_ZOOM_LEVEL = 16;
  private readonly MARKER_ICON = icon({
    iconUrl:
      'https://res.cloudinary.com/foodmine/image/upload/v1638842791/map/marker_kbua9q.png',
    iconSize: [42, 42],
    iconAnchor: [21, 42],
  });
  private readonly DEFAULT_LATLNG: LatLngTuple = [13.75, 21.62];

  @ViewChild('map', { static: true }) //makes this avaliable inside ngOnInit
  mapRef!: ElementRef;

  map!: Map;
  currentMarker!: Marker;

  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
    this.initializeMap();
  }

  initializeMap() {
    if (this.map) return; //if map is initialized

    this.map = map(this.mapRef.nativeElement, {
      attributionControl: false, //to not show the leaflet in the botton  right of the map
    }).setView(this.DEFAULT_LATLNG, 1); //default location, 1 = zoom of the world

    tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map); //for default tiles, tile layer system of open street map

    this.map.on('click', (e: LeafletMouseEvent) => {
      //update the leaflet location with a click
      this.setMarker(e.latlng);
    });
  }

  findMyLocation() {
    this.locationService.getCurrentLocation().subscribe({
      next: (latLng) => {
        this.map.setView(latLng, this.MARKER_ZOOM_LEVEL);
        this.setMarker(latLng);
      },
    });
  }

  setMarker(latLng: LatLngExpression) {
    this.addressLatLng= latLng as LatLng;
    if (this.currentMarker) {
      this.currentMarker.setLatLng(latLng);
      return;
    }
    this.currentMarker = marker(latLng, {
      draggable: true,
      icon: this.MARKER_ICON,
    }).addTo(this.map);


    this.currentMarker.on('dragend', ()=>{//when dragged is end, save last location
      this.addressLatLng = this.currentMarker.getLatLng();
    })
  }

  set addressLatLng(latlng:LatLng){
    latlng.lat = parseFloat(latlng.lat.toFixed(8));
    latlng.lng = parseFloat(latlng.lng.toFixed(8));
    this.order.addressLatLng = latlng;

    console.log(this.order.addressLatLng);
  }
}
