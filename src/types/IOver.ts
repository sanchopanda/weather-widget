import { ICity } from "./ICity";

export interface IOver {
  city: ICity;
  pos: number;
  dir: "down" | "up";
}
