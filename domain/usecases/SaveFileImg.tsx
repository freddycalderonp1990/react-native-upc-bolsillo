import { FileRepositoryImpl } from "@/data/repository/FileRepositoryImpl";

export class SaveFileImg {
  constructor(private repository: FileRepositoryImpl) {}

  async execute(uri: string, nameFile: string): Promise<boolean> {

   const PATH_IMG_ELECCIONES="../descargas/movil/upc/alertas/";
    return await this.repository.saveFile(uri,PATH_IMG_ELECCIONES,nameFile);
  }
}