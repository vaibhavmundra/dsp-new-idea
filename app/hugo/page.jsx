import { getUserData } from "../actions/auth";
import Footer from "../components/footer";
import BuildBrain from "../components/hugo/buildbrain";
import Navbar from "../components/navbar";

export default async function ChatInterface() {
  const user = await getUserData();
  console.log(user);

  return (
    <>
      <Navbar />
      <BuildBrain user={user} />
    </>
  );
}
