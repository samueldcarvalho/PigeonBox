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
