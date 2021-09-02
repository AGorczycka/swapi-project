import { Component } from '@angular/core';

@Component({
  selector: 'swapi-battlefield-container',
  templateUrl: './battlefield-container.component.html',
  styleUrls: ['./battlefield-container.component.scss']
})
export class BattlefieldContainerComponent {

  resources: Array<{ name: string, value: string }> = [ // move to models
    { name: 'People', value: 'people' }, //mass
    { name: 'Planets', value: 'planets' }, //population
    { name: 'Species', value: 'species' }, //average_lifespan
  ];

  selectedResource = 'people';

}
