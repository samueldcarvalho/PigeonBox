import { Container } from "@mui/material";
import { NextPage } from "next";
import SignUpForm from "../../src/components/SignUpForm";

const SignUpPage: NextPage = () => {
  return (
    <Container>
      <SignUpForm />
    </Container>
  );
};

export default SignUpPage;
