import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Beer } from "./beer";
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: "root",
})

export class BeerService{
    private apiServerURL = 'https://api.punkapi.com/v2/beers';

    constructor(private http: HttpClient){}
        
        public getBeers(page:number, tableSize: number): Observable<Beer[]> {
            return this.http.get<Beer[]>(`${this.apiServerURL}?page=${page}&per_page=${tableSize}`);
        }
         
        public getAllBeers(): Observable<Beer[]> {
            return this.http.get<Beer[]>(`${this.apiServerURL}`);
        }
        
        public getImage(image_url : string) : Observable<Blob>{
            return this.http.get(image_url, {responseType: 'blob'});
        }
          
        public addBeer(beer : Beer): Observable<void> {
            return this.http.post<void>(`${this.apiServerURL}/add`, beer);
        }
        
        public updateBeer(beer : Beer): Observable<void> {
            return this.http.put<void>(`${this.apiServerURL}/update`, beer);
        }

        public deleteBeer(id : number): Observable<void> {
            return this.http.delete<void>(`${this.apiServerURL}/delete/${id}`);
        }
    }
