import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CharacterList } from './character-list/character-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CharacterList],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  title = 'Star Wars Characters';
}
