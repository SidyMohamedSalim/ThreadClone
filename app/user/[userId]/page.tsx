import { getUserProfile } from "@/src/query/user.query";
import React from "react";
import { getAuthSession } from "../../../lib/authOptions";
import Profile from "./Profile";
import { notFound } from "next/navigation";

const page = async ({
  params,
}: {
  params: {
    userId: string;
  };
}) => {
  const session = await getAuthSession();
  const user = await getUserProfile(params.userId);

  if (!user) {
    return notFound();
  }

  return (
    <div>
      <Profile user={user} />
    </div>
  );
};

export default page;
