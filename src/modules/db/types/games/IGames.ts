export interface IGames {
  id: number;
}

export interface IGameCreate {
  title: string;
  description: string;
  platforms: any;
  releaseDate: Date;
  rating: number;
  coverImage: string;
}
