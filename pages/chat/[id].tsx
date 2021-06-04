import GlobalStyles from "../../styles/global";
import Head from "next/head";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled, { ThemeProvider } from "styled-components";
import ChatScreen from "../../component/ChatScreen";
import Sidebar from "../../component/Sidebar";
import { useTheme } from "../../contexts/ThemeContext";
import { auth, db } from "../../firebase";
import getRecipientEmail from "../../utils/getRecipientEmail";

const Chat = ({ chat, messages }) => {
  const [user] = useAuthState(auth);
  const { theme } = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Container>
        <Head>
          <title> Chat with {getRecipientEmail(chat.users, user)}</title>
        </Head>

        <Sidebar
          type="drawer"
          isOpen={isDrawerOpen}
          setIsOpen={() => setIsDrawerOpen(!isDrawerOpen)}
        />

        <ChatContainer>
          <ChatScreen
            openChats={() => setIsDrawerOpen(!isDrawerOpen)}
            chat={chat}
            messages={messages}
          />
        </ChatContainer>
      </Container>
    </ThemeProvider>
  );
};

export default Chat;

export async function getServerSideProps(context) {
  const ref = db.collection("chats").doc(context.query.id);

  const messagesRes = await ref
    .collection("messages")
    .orderBy("timestamp", "asc")
    .get();

  const messages = messagesRes.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((messages: any) => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime(),
    }));

  const chatRes = await ref.get();
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  };

  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat,
    },
  };
}

const Container = styled.div`
  display: flex;
`;

const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100vh;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
