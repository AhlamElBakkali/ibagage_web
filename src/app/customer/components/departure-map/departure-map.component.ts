import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AppService } from 'src/app/core/types/services/app.service';
import { BackEndService } from 'src/app/store/services/back-end.service';
import { CustomerComposant } from '../../customer.composant';
declare const google: any;

@Component({
  selector: 'app-departure-map',
  templateUrl: './departure-map.component.html',
  styleUrl: './departure-map.component.scss'
})
export class DepartureMapComponent extends CustomerComposant implements AfterViewInit {

  @ViewChild('map') mapRef!: ElementRef;
  searchBox: any;
  latitude: any;
  longitude: any;

  constructor(
    protected override app: AppService,
    protected override backendService: BackEndService,
  ) {
    super(app, backendService);
  }

  ngAfterViewInit() {
    this.loadGoogleMaps().then(() => {
      this.getGeoLocation();
    });
  }

  loadGoogleMaps(): Promise<void> {
    return new Promise((resolve) => {
      if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCzzpiJE14khKNNvmckn3-9Kn6Wb8_ILvU&libraries=places`;
        script.onload = () => {
          resolve();
        };
        document.head.appendChild(script);
      } else {
        resolve();
      }
    });
  }

  async getGeoLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          this.vars.centerPos = { lat: latitude, lng: longitude };
          this.initializeMap(this.vars.centerPos);
        },
        (error) => {
          console.error('Error getting current position:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  async initializeMap(centerPos: { lat: number, lng: number }) {
    this.vars.map = new google.maps.Map(this.mapRef.nativeElement, {
      center: centerPos,
      zoom: 17,
      disableDefaultUI: true,
    });
    this.vars.mapInitialized = true;
    await this.dragMap();
    this.getAddressFromCoordinates(centerPos.lat, centerPos.lng);
    const input = document.getElementById('pac-input') as HTMLInputElement | null;
    if (input) {
      var searchBox = new google.maps.places.SearchBox(input);
      this.vars.map.addListener('bounds_changed', () => {
        searchBox.setBounds(this.vars.map.getBounds());
      });
      searchBox.addListener('places_changed', async () => {
        var places = searchBox.getPlaces();
        if (places.length == 0) {
          return;
        }
        var bounds = await new google.maps.LatLngBounds();
        var bounds = await new google.maps.LatLngBounds();
        await places.forEach((place: any) => {
          this.latitude = place.geometry.viewport.getCenter().lat();
          this.longitude = place.geometry.viewport.getCenter().lng();
          if (!place.geometry) {
            console.log('Returned place contains no geometry');
            return;
          }
          if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport);
          }
          else {
            bounds.extend(place.geometry.location);
          }
        });
        await this.vars.map.fitBounds(bounds);
        this.getAddressFromCoordinates(this.latitude, this.longitude);
      });
    }
  }

  dragMap() {
    if (this.vars.mapInitialized) {
      google.maps.event.addListener(this.vars.map, 'dragend', () => {
        const center = this.vars.map.getCenter();
        if (center) {
          this.vars.centerLocation = {
            lat: center.lat(),
            lng: center.lng(),
          };
          this.getAddressFromCoordinates(this.vars.centerLocation.lat, this.vars.centerLocation.lng);
        }
      });
    }
  }

  getAddressFromCoordinates(latitude: number, longitude: number) {
    this.backendService.customer().getAddress(latitude, longitude).subscribe(
      (response: any) => {
        this.vars.addressDeparture = response.address.neighbourhood || 'Route sans nom';
        this.backendService.customer().displayAddress(this.vars.addressDeparture, 'addressDeparture');
      },
      (error) => {
        console.error('Error getting address:', error);
      }
    );
  }
}