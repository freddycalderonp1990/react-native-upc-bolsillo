import { Upc } from '../../domain/entities/Upc';
import { UpcRepository } from '../../domain/repositories/UpcRepository';
import { fetchUpcsFromApi } from '../datasources/UpcApi';

export class UpcRepositoryImpl implements UpcRepository {
  async getUpcs(lat: number, lon: number): Promise<Upc[]> {
    return await fetchUpcsFromApi(lat, lon);
  }
}