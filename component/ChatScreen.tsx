import { Avatar, IconButton } from "@material-ui/core";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth, db } from "../firebase";
import MoreVerticalIcon from "@material-ui/icons/MoreVertOutlined";
import { AttachFileOutlined, InsertEmoticon, Menu } from "@material-ui/icons";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";
import MicIcon from "@material-ui/icons/Mic";
import { useRef, useState } from "react";
import firebase from "firebase";
import getRecipientEmail from "../utils/getRecipientEmail";
import Timeago from "timeago-react";

const ChatScreen = ({ chat, messages, openChats }) => {
  const endOfMessageRef = useRef(null);
  const [user] = useAuthState(auth);
  const [input, setInput] = useState("");
  const router = useRouter();
  const [messagesSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id.toString())
      .collection("messages")
      .orderBy("timestamp", "asc")
  );

  const [recipientSnapshot] = useCollection(
    db
      .collection("users")
      .where("email", "==", getRecipientEmail(chat.users, user))
  );

  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    } else {
      return JSON.parse(messages).map((message) => (
        <Message key={message.id} user={message.user} message={message} />
      ));
    }
  };

  const scrollToBottom = () => {
    endOfMessageRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("users").doc(user.uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      {
        merge: true,
      }
    );

    db.collection("chats")
      .doc(router.query.id.toString())
      .collection("messages")
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        user: user.email,
        photoURL: user.photoURL,
      });

    setInput("");
    scrollToBottom();
  };

  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(chat.users, user);

  return (
    <Container>
      <Header>
        <IconButtonContainer className="menu" onClick={openChats}>
          <Menu />
        </IconButtonContainer>

        {recipient ? (
          <Avatar src={recipient?.photoURL} />
        ) : (
          <Avatar>{recipientEmail[0]}</Avatar>
        )}

        <HeaderInformation>
          <h3>{recipientEmail}</h3>
          {recipientSnapshot ? (
            <p>
              Last active:{" "}
              {recipient?.lastSeen?.toDate() ? (
                <Timeago datetime={recipient?.lastSeen?.toDate()} />
              ) : (
                "Unavaiable"
              )}
            </p>
          ) : (
            <p>"Loading..."</p>
          )}
          <p></p>
        </HeaderInformation>
        <HedaerIcons>
          <IconButton>
            <AttachFileOutlined />
          </IconButton>
          <IconButton>
            <MoreVerticalIcon />
          </IconButton>
        </HedaerIcons>
      </Header>

      <MessageContainer>
        {showMessages()}
        <EndOfMessage ref={endOfMessageRef} />
      </MessageContainer>

      <InputContainer>
        <InsertEmoticon />
        <Input value={input} onChange={(e) => setInput(e.target.value)} />
        <button hidden disabled={!input} type="submit" onClick={sendMessage}>
          SendMessage
        </button>
        <MicIcon />
      </InputContainer>
    </Container>
  );
};

export default ChatScreen;

const IconButtonContainer = styled(IconButton)`

`;

const Container = styled.div``;

const Header = styled.div`
  position: sticky;
  background-color: white;
  z-index: 100;
  top: 0;
  display: flex;
  padding: 11px;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;

  .menu {
    display: none;

    @media (max-width: 499px) {
      display: block;
    }
  }
`;

const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 1;

  > h3 {
    margin-bottom: 3px;
    word-break: break-all;

    @media (max-width: 499px) {
      font-size: 15px;
    }
  }

  > p {
    font-size: 14px;
    color: grey;
  }
`;

const HedaerIcons = styled.div``;

const MessageContainer = styled.div`
  padding: 30px;
  background-color: #e5ded8;
  min-height: 90vh;
`;

const EndOfMessage = styled.div`
  margin-bottom: 50px;
`;

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 100;
`;

const Input = styled.input`
  flex: 1;
  outline: 0;
  border: none;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: whitesmoke;
  border-radius: 10px;
`;
