import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Pokemon } from './pokemon';

@Injectable()
export class PokemonService {
	private pokeApiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=4';

  constructor(
  	private http: Http
	) { }

  getPokemons(): Promise<Array<Pokemon>> {
  	return this.http
  		.get(this.pokeApiUrl)
  		.toPromise()
  		.then((pokemonsResponse) => {
        let pokemons = Object.assign([], pokemonsResponse.json().results);
        pokemons.map(pokemon => {
          this.getPokemon(pokemon.url)
            .then((pokemonResponse) => {
              pokemon.id = pokemonResponse.id;
            })
        })
        return pokemons as Pokemon[];
  		})
  		.catch(this.handleError);
  }

  getPokemon(pokemonUrl: string): Promise<Pokemon> {
    return this.http
    	.get(pokemonUrl)
    	.toPromise()
    	.then((response) => {
    		return response.json();
    	})
    	.catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
	}

}
