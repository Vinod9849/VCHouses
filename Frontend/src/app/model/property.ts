import { IProperrtyBase } from './ipropertybase';

export class Property implements IProperrtyBase {
  Id: number;
  SellRent: number;
  Name: string;
  PType: string;
  BHK: number;
  FType: string;
  Price: number;
  BuiltArea: number;
  CarpetArea?: number;
  Address: string;
  LandMark?: string;
  City: string;
  FloorNo?: string;
  TotalFloor?: string;
  RTM: number;
  AOP?: number;
  MainEntrance?: string;
  Security?: number;
  Gated?: number;
  Maintenance?: number;
  Posession?: string;
  Image?: string;
  Description?: string;
  PostedOn: string;
  PostedBy: string;
}
