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
export interface IGameCreateResponse {
  id: number;
  title: string;
  description: string;
  platforms: any;
  releaseDate: Date;
  rating: number;
  coverImage: string;
}
