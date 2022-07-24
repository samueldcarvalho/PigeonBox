import { Container } from "@mui/material";
import { NextPage } from "next";
import LoginForm from "../../src/components/LoginForm";

const AuthenticationPage: NextPage = () => {
  return (
    <Container>
      <LoginForm />
    </Container>
  );
};

export default AuthenticationPage;
