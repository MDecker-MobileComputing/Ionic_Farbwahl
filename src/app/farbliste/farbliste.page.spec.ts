import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FarblistePage } from './farbliste.page';

describe('FarblistePage', () => {
  let component: FarblistePage;
  let fixture: ComponentFixture<FarblistePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarblistePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FarblistePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
