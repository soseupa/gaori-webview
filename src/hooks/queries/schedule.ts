import { GET_SCHEDULE } from "@/apis/schedule/schedule.key";
import { useQuery } from "react-query";
import { getSchedule } from "../../apis/schedule/schedule.api";
import { useLocation, useSearchParams } from "react-router-dom";

export const getScheduleQuery = () => {
  const [params] = useSearchParams(useLocation().search);
  return useQuery([GET_SCHEDULE], () =>
    getSchedule({ id: Number(params.get("id") as string), token: params.get("token") as string })
  ).data;
};
