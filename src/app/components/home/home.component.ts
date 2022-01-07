import { Component, OnInit } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent {
  // paises: any[] = [];

  // constructor(private http: HttpClient) {
  //   this.http
  //     .get('https://restcountries.com/v3.1/lang/spa')
  //     .subscribe((resp: any) => {
  //       this.paises = resp;
  //     });
  // }
  nuevasCanciones: any[] = [];
  loading: boolean;
  error: boolean;
  mensajeError: string = '';

  constructor(private spotify: SpotifyService) {
    this.loading = true;
    this.error = false;

    this.spotify.getNewRelease().subscribe(
      (data: any) => {
        this.nuevasCanciones = data;
        this.loading = false;
      },
      (errorServicio) => {
        this.loading = false;
        this.error = true;
        this.mensajeError = errorServicio.error.error.message;
      }
    );
  }
}
