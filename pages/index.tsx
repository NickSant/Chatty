import Head from "next/head";
import Sidebar from "../component/Sidebar";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Chatty</title>
        <meta name="description" content="Chat with whoever you want" />
      </Head>

      <Sidebar/>
    </div>
  );
}
