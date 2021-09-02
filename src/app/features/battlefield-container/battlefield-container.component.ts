import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { RESOURCES } from 'src/app/data/dictionary-resources';
import { ResourceEnum } from 'src/app/enums/resource.enum';
import { IDictionary } from 'src/app/models/IDictionary';

import { BattlefieldContainerService } from './battlefield-container.service';

@Component({
  selector: 'swapi-battlefield-container',
  templateUrl: './battlefield-container.component.html',
  styleUrls: ['./battlefield-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BattlefieldContainerComponent implements OnInit {

  resources: Array<IDictionary> = RESOURCES;
  selectedResource: string = ResourceEnum.PEOPLE;

  constructor(private battlefieldContainerService: BattlefieldContainerService) { }

  ngOnInit(): void {
    this.setResource();
  }

  setNewResource(): void {
    this.setResource();
  }

  private setResource(): void {
    this.battlefieldContainerService.setResourceValue(this.selectedResource);
  }
}
