import { FieldHook } from "payload/types";

const getUsername: FieldHook = async ({ data }) => {
  return `@${data.tg.username}`;
};

export default getUsername;