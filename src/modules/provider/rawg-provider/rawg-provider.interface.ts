export interface RawgProviderInterface {
  getGameByTitle(title: string): Promise<any>;
}
