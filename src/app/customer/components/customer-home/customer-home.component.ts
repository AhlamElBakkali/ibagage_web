import { Component, ElementRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Composant } from 'src/app/core/types/composant.base';
import { AppService } from 'src/app/core/types/services/app.service';
import { GeolocationService } from 'src/app/shared/services/geolocation.service';
import { environment } from 'src/environments/environment';

declare const google: any;
@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.scss'],
})
export class CustomerHomeComponent extends Composant {

  @ViewChild('map') mapRef!: ElementRef;
  centerPos: any;
  markers: any[] = [];
  api = environment.api;
  searchBox: any;
  latitude: any;
  longitude: any;
  map: any;

  constructor(
    protected override app: AppService,
    public translate: TranslateService,
    private geolocationService: GeolocationService
  ) {
    super(app)
    translate.use(localStorage.getItem('lang') || 'fr');
  }

  async ngAfterViewInit() {
    this.getGeoLocation();
  }

  async getGeoLocation() {
    try {
      const position = await this.geolocationService.getCurrentPosition();
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.showMap();
    } catch (error) {
      console.error('Error getting location', error);
    }
  }
  async showMap() {
    if (isNaN(this.latitude) || isNaN(this.longitude)) {
      console.error('Invalid latitude or longitude:', this.latitude, this.longitude);
      return;
    }

    const location = new google.maps.LatLng(this.latitude, this.longitude);

    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: location,
      zoom: 17,
      mapTypeId: 'roadmap',
      disableDefaultUI: true
    });

    const input = document.getElementById('pac-input') as HTMLInputElement;
    if (!input) {
      console.error('SearchBox input element not found');
      return;
    }
    const searchBox = new google.maps.places.SearchBox(input);

    this.map.addListener('bounds_changed', () => {
      const bounds = this.map.getBounds();
      if (bounds) {
        searchBox.setBounds(bounds);
      }
    });

    const currentLocationMarker = new google.maps.Marker({
      position: location,
      map: this.map,
      title: 'Current Location'
    });

    const infoWindow = new google.maps.InfoWindow({
      content: "C'est ma localisation !"
    });

    currentLocationMarker.addListener("click", () => {
      infoWindow.open(this.map, currentLocationMarker);
    });

    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces();
      if (!places || places.length === 0) {
        return;
      }
    
      const bounds = new google.maps.LatLngBounds();
    
      places.forEach((place: any) => {
        if (!place.geometry || !place.geometry.location) {
          console.log('Returned place contains no geometry');
          return;
        }
    
        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
    
      if (!bounds.isEmpty()) {
        this.map.fitBounds(bounds);
      } else {
        console.error("Invalid bounds:", bounds);
      }    
      try {
        this.map.fitBounds(bounds);
      } catch (error) {
        console.error('Error setting map bounds:', error);
      }
    });

    this.addMarkers();
  }

  onTypeVehiculeChange() {
    this.addMarkers();
  }

  async addMarkers() {
    const dataList = await this.getDataList("tiers.drivers");
    let filteredDataList = dataList;
    if (this.vars.type_vehicule) {
      this.clearMarkers();
      filteredDataList = dataList.filter(data =>
        data.vehicules.some((element: { type_vehicule: { id: any; }; }) => {
          return element.type_vehicule.id === this.vars.type_vehicule.id;
        })
      );
    }
    filteredDataList.forEach(data => {
      const iconUrl = 'assets/pictures/camionMap.png';
      const marker = new google.maps.Marker({
        position: { lat: Number(data.data_location.lt), lng: Number(data.data_location.lg) },
        map: this.map,
        title: data.nom,
        icon: {
          url: iconUrl,
          scaledSize: new google.maps.Size(70, 70),
          anchor: new google.maps.Point(20, 40),
        },
      });

      const infoWindowContent = `
        <div class="text-center w-full bg-[#e7e7e740] pb-4 px-4">
          <div class="flex justify-center w-full" style="padding-bottom: 1rem"> 
            <img style="height: 6.5rem; width: 6.5rem; border-radius: 100%; box-shadow: inset 0 0 10px rgba(0,0,0,0.5); object-fit: cover;"
              src="${this.api + '/files/' + (data.medias[0]?.fichier || 'fichiers_user') + '/' + (data.medias[0]?.nom || 'none.png')}" alt="icon" />
          </div>
          <div class="text-gray-600 font-medium text-left" style="font-size: 0.9rem; padding-bottom: 0.3rem">
            <span class="" style="color: #110088;font-size: 0.8rem;">Nom: </span> ${data.nom}
          </div>
          <div class="text-gray-600 font-medium text-left" style="font-size: 0.9rem; padding-bottom: 0.3rem">
            <span class="" style="color: #110088;font-size: 0.8rem;">Véhicule: </span>${data.vehicules[0]?.type_vehicule.libelle || 'Non specifie'}
          </div>
          <div class="text-gray-600 font-medium text-left" style="font-size: 0.9rem; padding-bottom: 0.3rem">
            <span class="" style="color: #110088;font-size: 0.8rem;">Téléphone: </span> ${data.data_adresse.tel}
          </div>
        </div>
      `;
      const infoWindow = new google.maps.InfoWindow({
        content: infoWindowContent
      });

      marker.addListener("click", () => {
        infoWindow.open(this.map, marker);
      });

      this.markers.push(marker);
    });
  }

  clearMarkers() {
    this.markers.forEach(marker => {
      marker.setMap(null);
    });
    this.markers = [];
  }

  createAnnonce() {
    this.app.navigate(['customer/departure'])
  }

}
