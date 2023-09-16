import { FieldHook } from "payload/types";

const getLogInitiator: FieldHook = async ({ data }) => {
  return data.initiator.username;
};

export default getLogInitiator;