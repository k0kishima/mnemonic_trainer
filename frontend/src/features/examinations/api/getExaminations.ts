import { ResourceServerRequest } from "$frontend/lib/ResourceServerRequest";
import { Examination } from "../types";

export const getExaminations = async ({ limit = 10, rememberedDate = undefined, answeredDate = undefined }): Promise<Examination[]> => {
  const apiClient = new ResourceServerRequest();
  const { examinations } = await apiClient.get("examinations", { limit, rememberedDate, answeredDate })

  return examinations.map((examination) => {
    switch (true) {
      case (!!examination.answeredAt):
        examination.status = 'done';
        break;
      case (!!examination.rememberedAt):
        examination.status = 'wait_for_answers';
        break;
      default:
        examination.status = 'memorizing';
        break;
    }
    return examination;
  });
}
