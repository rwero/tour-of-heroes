import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private heroService : HeroService) { }

  heroes :Hero[]= [];
  private searchTerms = new Subject<string>();
    
  ngOnInit(): void {
        this.heroService.getHeroes().subscribe((heroes:Hero[] )=>this.heroes = heroes);

	this.searchTerms.pipe(
		debounceTime(300),
		distinctUntilChanged(),
		switchMap((term:string)=> this.heroService.searchHero(term)),
	).subscribe((heroes:Hero[] )=>this.heroes = heroes);

  }
  search(term:string):void{
	    this.searchTerms.next(term);
        
  }

}
