import { server } from "../server";
import { SCHEDULE_LIST } from "./schedult.type";

export const getSchedule = async ({ id, token }: { id: number; token: string }) => {
  return (
    await server.get(`/schedule/detail/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;
};
