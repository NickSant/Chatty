import styled from "styled-components";
import Head from "next/head";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";

const Login = () => {
  const signIn = () => {
    auth.signInWithPopup(provider).catch(alert);
  };


  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>
      <LoginContainer>
        <Logo>Chatty</Logo>
        <Button variant="outlined" onClick={signIn}>
          {" "}
          Sign in with Google{" "}
        </Button>
      </LoginContainer>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: whitesmoke;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 100px;
  background-color: white;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.2);
`;

const Logo = styled.h1`
  font-family: Poppins;
  font-size: 3rem;
`;
