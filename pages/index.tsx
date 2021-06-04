import { useTheme } from "../contexts/ThemeContext";
import Head from "next/head";
import Sidebar from "../component/Sidebar";
import { ThemeProvider } from "styled-components";

export default function Home() {
  const { theme } = useTheme();

  console.log(theme);
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Head>
          <title>Chatty</title>
          <meta name="description" content="Chat with whoever you want" />
        </Head>

        <Sidebar />
      </div>
    </ThemeProvider>
  );
}
