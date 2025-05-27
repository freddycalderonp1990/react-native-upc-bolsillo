import { EventoRepository } from "@/domain/repositories/EventoRepository";
import { fetchSaveEventoFromApi } from "../datasources/EventoApi";



export class EventoRepositoryImpl implements EventoRepository {
  async guardarEvento(tipoEvento: string, descripcion: string, imagen: string): Promise<boolean> {
    return await fetchSaveEventoFromApi(tipoEvento, descripcion, imagen);
  }


}