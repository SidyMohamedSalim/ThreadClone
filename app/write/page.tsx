import { getUser } from "@/src/query/user.query";
import React from "react";
import WritePostForm from "./WritePostForm";
import { createPost } from "./write.action";

const page = async () => {
  const user = await getUser();
  return <WritePostForm user={user} onSubmit={createPost}></WritePostForm>;
};

export default page;
