import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {
    console.log('spotify service listo');    
   }

   getQuery( query: string){
       const url = `https://api.spotify.com/v1/${ query }`;

       const headers = new HttpHeaders({
        'Authorization': 'Bearer BQBgJcARNjB5PmfTrdgtefCuzXeyy8Pco-jc8pKNqO2GGlPixJqQvmrYuQzS2uRAleY3gl0ZaSXa6Pq-Ydg0babHSgFDNibLc0QxZd0RuGpFi9k7whb3eCg8uBRq-P835MxUhYwpwg_TXtem'
    });

    return this.http.get(url, {headers});
   }
  
   getNewReleases(){

      return this.getQuery('browse/new-releases?limit=20')  
          .pipe( map(data => data['albums'].items));

   }
   getArtistas(termino: string){
  return this.getQuery(`search?query=${termino}&type=artist&offset=0&limit=15`)
             .pipe(map(data =>  data['artists'].items));
      

   }

   getArtista(id: string){
    return this.getQuery(`artists/${ id }`);
               //.pipe(map(data =>  data['artists'].items));
        
  
     }

     getTopTracks(id: string){
      return this.getQuery(`artists/${ id }/top-tracks?country=us`)
                 .pipe(map(data =>  data['tracks']));
          
    
       }  

}
