import styled from "styled-components";
import { Avatar, Button, Drawer, IconButton } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVertOutlined";
import SearchIcon from "@material-ui/icons/SearchOutlined";
import * as EmailValidator from "email-validator";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";
import Chat from "./Chat";
import { Close, NightsStay, WbSunnyOutlined } from "@material-ui/icons";
import { useTheme } from "../contexts/ThemeContext";

const Sidebar = ({ type = "", isOpen = true, setIsOpen = () => {} }) => {
  const [user] = useAuthState(auth);
  const { theme, switchTheme } = useTheme();
  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);

  const [chatsSnapshot] = useCollection(userChatRef);

  const createChat = () => {
    const input = prompt("Please enter a email address");

    if (!input) return null;

    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExists(input) &&
      input !== user.email
    ) {
      db.collection("chats").add({
        users: [user.email, input],
      });
    }
  };

  const chatAlreadyExists = (recipientEmail) =>
    !!chatsSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === recipientEmail)?.length > 0
    );

  return (
    <>
      <DrawerContainer open={isOpen} variant="persistent" anchor="left">
        <Container className="drawer">
          <Header>
            <UserAvatar src={user.photoURL} onClick={() => auth.signOut()} />
            <IconsContainer>
              <IconButton onClick={() => switchTheme()}>
                {theme.title === "dark" ? <WbSunnyOutlined /> : <NightsStay />}
              </IconButton>

              <IconButton onClick={setIsOpen}>
                <Close />
              </IconButton>
            </IconsContainer>
          </Header>

          <Search>
            <SearchIcon />
            <SearchInput placeholder="Search" />
          </Search>

          <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>
          <ChatList>
            {chatsSnapshot?.docs.map((chat) => (
              <Chat
                key={chat.id}
                id={chat.id}
                users={chat.data().users}
                closeDrawer={setIsOpen}
              />
            ))}
          </ChatList>
        </Container>
      </DrawerContainer>

      <Container>
        <Header>
          <UserAvatar src={user.photoURL} onClick={() => auth.signOut()} />
          <IconsContainer>
            <IconButton onClick={() => switchTheme()}>
              {theme.title === "dark" ? <WbSunnyOutlined /> : <NightsStay />}
            </IconButton>

            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </IconsContainer>
        </Header>

        <Search>
          <SearchIcon />
          <SearchInput placeholder="Search" />
        </Search>

        <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>
        <ChatList>
          {chatsSnapshot?.docs.map((chat) => (
            <Chat key={chat.id} id={chat.id} users={chat.data().users} />
          ))}
        </ChatList>
      </Container>
    </>
  );
};

export default Sidebar;

const DrawerContainer = styled(Drawer)`
  display: none;
  height: 100vh;
  position: absolute;
  z-index: 200;

  &&& {
    .MuiDrawer-paper {
      height: unset;
      overflow-y: scroll;
    }
  }

  @media (max-width: 499px) {
    display: flex;
  }
`;

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.background_alt};
  color: ${(props) => props.theme.colors.text};
  flex: 0.45;
  border-right: ${(props) => "1px solid" + props.theme.colors.background};
  height: 100vh;
  min-width: 300px;
  max-width: 350px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;

  @media (max-width: 499px) {
    display: ${(props: any) => (props.className === "drawer" ? "block" : "none")};
    min-width: 100vw;
    max-width: 100vw;
    height: 80vh;
  }
`;

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: ${(props) => props.theme.colors.background_alt};
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: ${(props) => "1px solid" + props.theme.colors.background};
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;
  transition: 0.6 ease;

  :hover {
    opacity: 0.8;
  }
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`;

const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
  background-color: transparent;
`;

const ChatList = styled.div`
  flex: 1;
  height: calc(100vh - 182px);

  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const SidebarButton = styled(Button)`
  width: 100%;
  &&& {
    border-top: ${(props) => "1px solid" + props.theme.colors.background};
    border-bottom: ${(props) => "1px solid" + props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
  }
`;

const IconsContainer = styled.div`
  svg {
    fill: ${(props) => props.theme.colors.text};
    color: ${(props) => props.theme.colors.text};
  }
`;
