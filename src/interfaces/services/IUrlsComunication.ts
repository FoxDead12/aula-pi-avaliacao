export interface IUrlsComunication {
  getUrlsList(mainUrl: string): Promise<string[]>;
  separateUrls(
    mainUrl: string,
    urlsList: string[],
  ): { docentes: string[]; turma: string[] };

  InsertUrls(data: string[]): Promise<void>;
}
