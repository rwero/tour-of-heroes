import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
@Injectable({
  providedIn: 'root'
})
export class HeroService {
	private heroesUrl  ='http://localhost:8000/api/heroes';

  constructor(private http:HttpClient,private messageService: MessageService) { }
  getHeroes():Observable<Hero[]>{
	const heroes = this.http.get<Hero[]>(this.heroesUrl);
  this.log('fetched heroes');
	return heroes;
  }
  getHero(id:number):Observable<Hero>{
	const hero = this.http.get<Hero>(this.heroesUrl+`/${id}`);
	this.log(`fetched hero with id :${id}`);
	return hero;

  }
  private log(message: string){
	this.messageService.add(`HeroService: ${message}`);
  }
}
