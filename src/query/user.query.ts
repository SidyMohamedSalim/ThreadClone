import { getAuthSession } from "../../lib/authOptions";
import { prisma } from "../../lib/prisma";
export const getUser = async () => {
  const session = await getAuthSession();
  if (!session?.user.email) {
    throw new Error("No User Found");
  }
  const user = await prisma.user.findFirstOrThrow({
    where: {
      email: session.user.email,
    },
  });
  return user;
};
