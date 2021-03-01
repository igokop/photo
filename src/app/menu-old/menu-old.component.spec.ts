import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuOldComponent } from './menu-old.component';

describe('MenuOldComponent', () => {
  let component: MenuOldComponent;
  let fixture: ComponentFixture<MenuOldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuOldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
