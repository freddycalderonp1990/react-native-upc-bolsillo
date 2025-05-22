import { Upc } from '../entities/Upc';
import { UpcRepository } from '../repositories/UpcRepository';

export class GetUpcsCercanas {
  constructor(private repository: UpcRepository) {}

  async execute(lat: number, lon: number): Promise<Upc[]> {
    return await this.repository.getUpcs(lat, lon);
  }
}