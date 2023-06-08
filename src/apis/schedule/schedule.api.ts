import { server } from "../server";

export const getSchedule = async ({ id, token }: { id: number; token: string }) => {
  return (
    await server.get(`/schedule/detail/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;
};
