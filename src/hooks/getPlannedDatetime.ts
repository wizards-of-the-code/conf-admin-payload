import { FieldHook } from "payload/types";
import formatDateToDdMmYyyyHHmm from "../utils/datetimeFormat";

const getPlannedDatetime: FieldHook = async ({ data }) => {
  return `${formatDateToDdMmYyyyHHmm(new Date(data.datetime_to_send))}`;
};

export default getPlannedDatetime;