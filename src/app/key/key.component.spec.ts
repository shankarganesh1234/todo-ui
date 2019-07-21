import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { KeyComponent } from './key.component';

describe('TodoComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        KeyComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(KeyComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-todo-app'`, () => {
    const fixture = TestBed.createComponent(KeyComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('angular-todo-app');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(KeyComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to angular-todo-app!');
  });
});
