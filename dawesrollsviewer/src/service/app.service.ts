import { Injectable } from '@angular/core';
import { AddIndianTable } from '../model/add-indian-table';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public allInputBehaviorSubject:BehaviorSubject<object[]> = new BehaviorSubject<object[]>([]);
  public cherokeeInputBehaviorSubject:BehaviorSubject<object[]> = new BehaviorSubject<object[]>([]);
  public chickasawInputBehaviorSubject:BehaviorSubject<object[]> = new BehaviorSubject<object[]>([]);
  public choctawInputBehaviorSubject:BehaviorSubject<object[]> = new BehaviorSubject<object[]>([]);
  public creekInputBehaviorSubject:BehaviorSubject<object[]> = new BehaviorSubject<object[]>([]);
  public seminoleInputBehaviorSubject:BehaviorSubject<object[]> = new BehaviorSubject<object[]>([]);
  public refreshTables:BehaviorSubject<string> = new BehaviorSubject<string>("");
  public activeIndex:BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public addIndianTitles?: AddIndianTable[] = [
    { titleName: "ID", formName: "ID" },
    { titleName: "Tribe", formName: "Tribe" },
    { titleName: "Page", formName: "Page" },
    { titleName: "Last Name", formName: "LastName" },
    { titleName: "First Name", formName: "FirstName" },
    { titleName: "Middle Name", formName: "MiddleName" },
    { titleName: "Suffix", formName: "Suffix" },
    { titleName: "Age", formName: "Age" },
    { titleName: "Year", formName: "Year" },
    { titleName: "Sex", formName: "Sex" },
    { titleName: "Blood", formName: "Blood" },
    { titleName: "Relationship", formName: "Relationship" },
    { titleName: "Roll Num", formName: "RollNum" },
    { titleName: "Source", formName: "Source" }];
  constructor() { 

  }

  public getFilterInputFromAllSearch(event:Event, filter: string) {
    this.allInputBehaviorSubject.next([event, filter as unknown as object]);
  }
  public getFilterInputFromCherokeeSearch(event:Event, filter: string) {
    this.cherokeeInputBehaviorSubject.next([event, filter as unknown as object]);
  }

  public getFilterInputFromChickasawSearch(event:Event, filter: string) {
    this.chickasawInputBehaviorSubject.next([event, filter as unknown as object]);
  }

  public getFilterInputFromChoctawSearch(event:Event, filter: string) {
  this.choctawInputBehaviorSubject.next([event, filter as unknown as object]); 
  }

  public getFilterInputFromCreekSearch(event:Event, filter: string) {
    this.creekInputBehaviorSubject.next([event, filter as unknown as object]);
  }

  public getFilterInputFromSeminoleSearch(event:Event, filter: string) {
    this.seminoleInputBehaviorSubject.next([event, filter as unknown as object]);
  }
  refreshHeaderTable(refresh: string) {
    this.refreshTables.next(refresh);
  }
  
  setActiveIndex(index: number){
    this.activeIndex.next(index);
  }
}


