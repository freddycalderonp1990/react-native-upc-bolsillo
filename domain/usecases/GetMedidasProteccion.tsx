import { ServiciosEntity } from "../entities/ServiciosEntity";
import { ServiciosRepository } from "../repositories/ServiciosRepository";


export class GetMedidasProteccion {
  constructor(private repository: ServiciosRepository) {}

  async execute(): Promise<ServiciosEntity[]> {
    return await this.repository.getServicios(2);
  }
}