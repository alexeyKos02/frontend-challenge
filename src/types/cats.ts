interface Category {
  id: number;
  name: string;
}

export interface CatResponse {
  breeds: Array<string>;
  categories?: Category[];
  id: string;
  url: string;
  width: number;
  height: number;
}
export interface Cat extends CatResponse {
  liked: boolean;
}
