import React from "react";
import { getUser } from "../../../src/query/user.query";
import WriteModal from "./WriteModal";
import { createPost } from "../../write/write.action";

const page = async () => {
  const user = await getUser();
  return <WriteModal path="write" user={user} createPost={createPost} />;
};

export default page;
