import { ServiciosDetalleEntity } from "../entities/ServiciosDetalleEntity";
import { ServiciosEntity } from "../entities/ServiciosEntity";



export interface ServiciosRepository {
  getServicios(id: number): Promise<ServiciosEntity[]>;
  getServiciosDetalle(id: number): Promise<ServiciosDetalleEntity[]>;
}