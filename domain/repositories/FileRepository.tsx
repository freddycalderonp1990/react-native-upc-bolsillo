
export interface FileRepository {
  saveFile(uri: string, patch: string, nameFile: string): Promise<boolean>;
}