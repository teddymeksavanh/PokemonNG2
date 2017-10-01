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
    return new Promise((resolve, reject) => {
      this.http
      .get(this.pokeApiUrl)
      .toPromise()
      .then((pokemonsResponse) => {
        const pokemons = Object.assign([], pokemonsResponse.json().results)
        const pokemonPromises = pokemons.map( pokeObj =>
          this.getPokemon(pokeObj.url)
        )
                                             
        Promise.all(pokemonPromises)
          .then((values) => {
              resolve(values)
          })
          .catch(reject)
       
      })
      .catch(this.handleError);
    })
    
  }

  getPokemon(pokemonUrl: string): Promise<Pokemon> {
    return new Promise((resolve, reject) => {
      this.http
        .get(pokemonUrl)
        .toPromise()
        .then((response) => {
          resolve(response.json())
        })
        .catch(reject);
    })
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}