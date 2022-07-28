import { Container } from "@mui/material";
import { NextPage } from "next";
import SignUpForm from "../../src/components/SignUpForm";
import nookies from "nookies";

const SignUpPage: NextPage = () => {
  return (
    <Container>
      <SignUpForm />
    </Container>
  );
};

export default SignUpPage;

export const getServerSideProps = (ctx: any) => {
  const cookies = nookies.get(ctx)["TkCredUsr"];

  if (cookies)
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };

  return {
    props: {},
  };
};
