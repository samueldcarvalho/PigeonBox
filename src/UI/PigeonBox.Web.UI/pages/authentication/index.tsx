import { Container } from "@mui/material";
import { NextPage } from "next";
import LoginForm from "../../src/components/LoginForm";
import nookies from "nookies";

const AuthenticationPage: NextPage = () => {
  return (
    <Container>
      <LoginForm />
    </Container>
  );
};

export default AuthenticationPage;
