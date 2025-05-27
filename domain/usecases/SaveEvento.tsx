import { EventoRepositoryImpl } from "@/data/repository/EventoRepositoryImpl";

export class SaveEvento {
  constructor(private repository: EventoRepositoryImpl) {}

  async execute(tipoEvento: string, descripcion: string, imagen: string): Promise<boolean> {

    return await this.repository.guardarEvento(tipoEvento,descripcion,imagen);
  }
}