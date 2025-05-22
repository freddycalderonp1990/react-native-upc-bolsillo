import { Upc } from "../entities/Upc";


export interface UpcRepository {
  getUpcs(lat: number, lon: number): Promise<Upc[]>;
}