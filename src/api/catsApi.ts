import { IMG_PER_PAGE } from "../consts";
import { ResponseCats } from "../types/api";
import { CatResponse } from "../types/cats";
import { request } from "./apiClient";

export const fetchCats = async (page: number): Promise<ResponseCats> => {
  const response = await request<ResponseCats>("get", `/images/search`, {
    limit: IMG_PER_PAGE,
    page: page,
  });
  return response.data;
};

export const fetchCatsByID = async (IDs: string[]): Promise<ResponseCats> => {
  const requests = IDs.map(async (id) => {
    try {
      return (await request<CatResponse>("get", `/images/${id}`)).data;
    } catch (error) {
      console.error(`Error fetching cat with ID ${id}:`, error);
      return null;
    }
  });
  const results = await Promise.all(requests);
  return results.filter((result) => result !== null);
};
