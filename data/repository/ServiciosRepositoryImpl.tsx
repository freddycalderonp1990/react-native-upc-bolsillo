import { ServiciosDetalleEntity } from "@/domain/entities/ServiciosDetalleEntity";
import { ServiciosEntity } from "@/domain/entities/ServiciosEntity";
import { ServiciosRepository } from "@/domain/repositories/ServiciosRepository";
import { fetchServiciosFromApi } from "../datasources/ServiciosApi";
import { fetchServiciosDetalleFromApi } from "../datasources/ServiciosDetalleApi";


export class ServiciosRepositoryImpl implements ServiciosRepository {
 async getServiciosDetalle(id: number): Promise<ServiciosDetalleEntity[]> {
        return await fetchServiciosDetalleFromApi(id);
  }
  async getServicios(id: number): Promise<ServiciosEntity[]> {
    return await fetchServiciosFromApi(id);
  }

}