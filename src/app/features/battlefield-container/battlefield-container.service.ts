import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BehaviorSubject, Observable } from "rxjs";

import { IApiDataPage } from "src/app/models/IApiDataPage";
import { IPerson } from "src/app/models/IPerson";
import { IPlanet } from "src/app/models/IPlanet";
import { ISpecies } from "src/app/models/ISpecies";

type ApiData = IPerson | IPlanet | ISpecies;

@Injectable({
  providedIn: "root",
})
export class BattlefieldContainerService {
  baseUrl = "https://swapi.dev/api";

  resourceSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private http: HttpClient) {}

  getData(dataSource: string, id: number): Observable<ApiData> {
    const url = `${this.baseUrl}/${dataSource}/${id}`;
    return this.http.get<ApiData>(url);
  }

  getDataCount(dataSource: string): Observable<IApiDataPage> {
    const url = `${this.baseUrl}/${dataSource}`;
    return this.http.get<IApiDataPage>(url);
  }

  setResourceValue(resourceValue: string): void {
    this.resourceSubject.next(resourceValue);
  }
}
