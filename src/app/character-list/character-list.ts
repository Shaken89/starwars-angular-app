import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Subject, debounceTime, switchMap } from 'rxjs';

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
  private searchSubject = new Subject<string>();

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.searchSubject.pipe(
      debounceTime(400),
      switchMap(term => this.fetchCharacters(term))
    ).subscribe({
      next: data => {
        const results = data?.results || [];
        this.characters = this.filterCharacters(results, this.lastSearchTerm);
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  lastSearchTerm = '';

  onSearch(term: string) {
    this.lastSearchTerm = term.toLowerCase();
    this.loading = true;
    this.searchSubject.next(term);
  }

  fetchCharacters(term: string) {
    const url = term
      ? `https://swapi.dev/api/people/?search=${term}`
      : `https://swapi.dev/api/people/`;
    return this.http.get<any>(url);
  }

  filterCharacters(results: any[], term: string) {
    if (!term) return results;
    return results.filter((c: any) =>
      c.name.toLowerCase().startsWith(term)
    );
  }

  loadCharacters() {
    this.loading = true;
    this.searchSubject.next('');
  }
}
