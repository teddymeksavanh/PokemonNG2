import { Component, OnInit } from '@angular/core';

import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'my-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss']
})
export class PokemonsComponent implements OnInit {
	pokemons: Pokemon[];
	selectedPokemon: Pokemon;
	error: any;
	showNgFor = false;

  constructor(
  	private pokemonService: PokemonService
	) { }

	getPokemons(): void {
		this.pokemonService
			.getPokemons()
			.then(pokemons => this.pokemons = pokemons)
			.catch(error => this.error = error);
	} 

	gotoDetail(pokemon: Pokemon): void {
	}

  ngOnInit() {
  	this.getPokemons();
  }

}
