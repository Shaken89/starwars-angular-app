import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterList } from './character-list';

describe('CharacterListComponent', () => {
  let component: CharacterList;
  let fixture: ComponentFixture<CharacterList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharacterList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
