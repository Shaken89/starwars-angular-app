import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './character-list.html',
  styleUrls: ['./character-list.css']
})
export class CharacterList {
  characters: any[] = [];
  loading = false;

  constructor(private http: HttpClient) {}

  loadCharacters() {
    this.loading = true;
    this.http.get<any>('https://swapi.dev/api/people')
      .subscribe({
        next: (data) => {
          this.characters = data.results;
          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        }
      });
  }
}
