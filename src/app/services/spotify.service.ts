import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  constructor(private http: HttpClient) {}

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      Authorization:
        'Bearer BQCoXl5rsJ9pUpvtlYjeP-YRTYB80f3gw4fyKmFVpnJ10M2OMwhbPKc-ORgReBY0OdnJr6A0A9sNyz1x0lo',
    });

    return this.http.get(url, { headers });
  }

  getNewRelease() {
    return this.getQuery('browse/new-releases').pipe(
      map((data: any) => data['albums'].items)
    );
  }

  getArtistas(termino: string) {
    return this.getQuery(
      `search?query=${termino}&type=artist&locale=es-ES%2Ces%3Bq%3D0.9&offset=0&limit=15`
    ).pipe(map((data: any) => data['artists'].items));
  }
  getArtista(id: string) {
    return this.getQuery(`artists/${id}`);
    //.pipe(
    //map((data: any) => data['artists'].items)
    //);
  }

  getTopTracks(id: string) {
    return this.getQuery(`artists/${id}/top-tracks?country=us`).pipe(
      map((data: any) => data['tracks'])
    );
  }
}
