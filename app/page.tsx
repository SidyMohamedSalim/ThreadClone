import { getAuthSession } from "../lib/authOptions";
export default async function Home() {
  const session = await getAuthSession();
  return <div>{JSON.stringify(session, null, 2)}</div>;
}
