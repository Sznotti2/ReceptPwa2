import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeEditor } from './recipe-editor';

describe('RecipeEditor', () => {
  let component: RecipeEditor;
  let fixture: ComponentFixture<RecipeEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeEditor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeEditor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
