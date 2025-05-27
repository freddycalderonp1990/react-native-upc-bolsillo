import { FileRepository } from "@/domain/repositories/FileRepository";
import { saveFileApi } from "../datasources/FileApi";


export class FileRepositoryImpl implements FileRepository {
async  saveFile(uri: string, patch: string, nameFile: string): Promise<boolean> {
    return await saveFileApi(uri,patch,nameFile);
  }

}