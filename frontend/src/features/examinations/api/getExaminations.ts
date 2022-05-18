import { ResourceServerRequest } from "$frontend/lib/ResourceServerRequest";
import { Examination } from "../types";

export const getExaminations = async (): Promise<Examination[]> => {
  const limit = 10;

  const apiClient = new ResourceServerRequest();
  const { examinations } = await apiClient.get("examinations", { limit: limit })

  return examinations;
}
