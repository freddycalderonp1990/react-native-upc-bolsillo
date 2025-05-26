import { ServiciosDetalleEntity } from '../entities/ServiciosDetalleEntity';
import { ServiciosRepository } from '../repositories/ServiciosRepository';


export class GetServiciosDetalle {
  constructor(private repository: ServiciosRepository) {}

  async execute(id: number): Promise<ServiciosDetalleEntity[]> {
    return await this.repository.getServiciosDetalle(id);
  }
}