
export interface EventoRepository {
  guardarEvento(tipoEvento: string,descripcion: string,imagen: string,): Promise<boolean>;

}