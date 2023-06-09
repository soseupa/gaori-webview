import { server } from "../server";
import { SCHEDULE } from "./schedult.type";

export const getSchedule = async ({ id, token }: { id: number; token: string }) => {
  return (
    await server.get(`/schedule/detail/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;
};

export const addSchedule = async ({ data, token }: { data: SCHEDULE; token: string }) => {
  return (
    await server.post(`/schedule/detail`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;
};
