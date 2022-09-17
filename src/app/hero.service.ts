import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HeroService {
	private heroesUrl  ='http://localhost:8000/api/heroes';

  constructor(private http:HttpClient,private messageService: MessageService) { }
  getHeroes():Observable<Hero[]>{
	const heroes = this.http.get<Hero[]>(this.heroesUrl).pipe(
		tap(_ => this.log('fetched heroes')),
		catchError(this.handleError<Hero[]>('getHeroes', []))
    );;
	return heroes;
  }
  getHero(id:number):Observable<Hero>{
	const hero = this.http.get<Hero>(this.heroesUrl+`/${id}`).pipe(
		tap(_ => this.log(`fetched hero ${id}`)),
		catchError(this.handleError<Hero> (`getHero ${id}`))
	);
	return hero;

  }
  private log(message: string){
	this.messageService.add(`HeroService: ${message}`);
  }
	/**
	 * Handle Http operation that failed.
	 * Let the app continue.
	 *
	 * @param operation - name of the operation that failed
	 * @param result - optional value to return as the observable result
	 */
	private handleError<T>(operation = 'operation', result?: T) {
	return (error: any): Observable<T> => {

		// TODO: send the error to remote logging infrastructure
		console.error(error); // log to console instead

		// TODO: better job of transforming error for user consumption
		this.log(`${operation} failed: ${error.message}`);

		// Let the app keep running by returning an empty result.
		return of(result as T);
	};
	}
}
