import { Component, Inject, OnInit, inject } from '@angular/core';
import { Beer } from './beer';
import { HttpErrorResponse } from '@angular/common/http';
import { BeerService } from './beer.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Inter Mikrum & brewdog-app';
  beers: Beer[] = [];
  selectedBeer? : Beer;
  page : number = 1;
 totalItems : number = 325;
   
  tableSize : number = 6;
  tableSizes: any = [3,6,9,12];
  

  constructor(private beerService: BeerService, private sanitizer : DomSanitizer){}

  ngOnInit() {
    this.getBeers(this.page, this.tableSize);
  }
  

  public sanitizeImageURL(image_url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(image_url);
  }

  public getBeers(page : number, tableSize: number) : void{
    this.beerService.getBeers(this.page, this.tableSize).subscribe(
      (response : Beer[]) => {
        this.beers = response;
        this.beers.forEach(function(beer){
        beer.toggle= true;
       })
      }, (error : HttpErrorResponse) => {alert(error.message)}
    );
  }

  onSelected(beer: Beer): void{
    this.toggleChange(beer);
    this.selectedBeer = beer;
    this.beers.forEach(others => {
      if(others !== beer){
        others.toggle = true;
      }
    })
  }
  
  onTableDataChange(event : number){
    this.page = event;
    this.getBeers(this.page, this.tableSize);
  }

  onTableSizeChange(event : any): void {
   this.tableSize = event.target.value;
   this.page = 1;
   this.getBeers(this.page, this.tableSize);
  }

  toggleChange(beer: Beer){
    beer.toggle = !beer.toggle;
  }
}
