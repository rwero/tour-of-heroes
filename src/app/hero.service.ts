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
httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

    
  constructor(private http:HttpClient,private messageService: MessageService) { }


  getHeroes():Observable<Hero[]>{
	return this.http.get<Hero[]>(this.heroesUrl).pipe(
		tap(_ => this.log('fetched heroes')),
		catchError(this.handleError<Hero[]>('getHeroes', []))
    );

  }
  getHero(id:number):Observable<Hero>{
	 return this.http.get<Hero>(this.heroesUrl+`/${id}`).pipe(
		tap(_ => this.log(`fetched hero ${id}`)),
		catchError(this.handleError<Hero> (`getHero ${id}`))
	);

  }
  updateHero(hero:Hero):Observable<any>{
	return this.http.put(this.heroesUrl+`/${hero.id}`,hero,this.httpOptions).pipe(
		tap(_ => this.log(`updated hero ${hero.id}`)),
		catchError(this.handleError<any>('updateHero'))
	);
  }
  addHero(hero:Hero):Observable<Hero>{
	return this.http.post<Hero>(this.heroesUrl,hero,this.httpOptions).pipe(
		tap((newHero:Hero)=> this.log(`Created new hero : ${newHero.id}`)),
		catchError(this.handleError<Hero>('Create hero'))
	);
  }
  deletehero(hero:Hero):Observable<any>{
	return this.http.delete<Hero>(this.heroesUrl+`/${hero.id}`,this.httpOptions).pipe(
		tap(_=> this.log(`Deleted hero ${hero.id}`)),
		catchError(this.handleError<Hero>(`Deletehero`))
	);
  }
  searchHero(term:string):Observable<Hero[]>{
        console.log("searching : ",term)
	if(!term.trim()){
      return this.http.get<Hero[]>(this.heroesUrl).pipe(
                tap(_ => this.log('fetched heroes')),
                catchError(this.handleError<Hero[]>('getHeroes', []))
            );
        }

return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
		tap(x =>x.length ?this.log(`Found ${x.length} heros`):this.log(`No heroes matching ${term}`)),
		catchError(this.handleError<Hero[]>('SearchHeroes',[]))
	);
    
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
