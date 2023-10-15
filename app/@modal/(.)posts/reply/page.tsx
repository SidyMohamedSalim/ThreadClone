import React from "react";
import { getUser } from "../../../../src/query/user.query";
import ReplyModal from "./ReplyModal";
import { createPostReply } from "../../../posts/[postId]/reply/write.reply";

const page = async ({
  params,
}: {
  params: {
    postId: string;
  };
}) => {
  const user = await getUser();
  return (
    <ReplyModal
      user={user}
      createPostReply={async (values) => {
        "use server";
        const reply = await createPostReply(params.postId, values);
        return reply;
      }}
    />
  );
};

export default page;
