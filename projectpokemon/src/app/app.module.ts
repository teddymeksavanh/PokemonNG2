import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ModalModule } from 'ngx-modal';
import { LocalStorageModule } from 'angular-2-local-storage';

import { AppComponent } from './app.component';
import { PokemonService } from './pokemon.service';
import { PokemonsComponent } from './pokemons/pokemons.component';


@NgModule({
  declarations: [
    AppComponent,
    PokemonsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ModalModule,
    LocalStorageModule.withConfig({
      prefix: 'my-app',
      storageType: 'localStorage'
    })
  ],
  providers: [PokemonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
