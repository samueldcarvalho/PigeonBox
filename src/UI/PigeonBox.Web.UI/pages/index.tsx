/** @format */

import { GetServerSidePropsContext, NextPage } from "next";
import { useRouter } from "next/router";
import nookies from "nookies";
import { memo, useContext, useEffect } from "react";
import ChatBox from "../src/components/ChatBoxLayout";
import { AuthContext } from "../src/shared/contexts/AuthProvider";

const Chat: NextPage = () => {
  const { User, GetUser } = useContext(AuthContext);
  const router = useRouter();

  const ValidateUser = async () => {
    if (!User) {
      const logged = await GetUser();

      if (logged == false) {
        await router.push("/login", "");
        return;
      }
    }
  };

  useEffect(() => {
    ValidateUser();
  }, []);

  return <ChatBox />;
};

export default memo(Chat);

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
  const cookies = nookies.get(ctx)["TkCredUsr"];

  if (!cookies)
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };

  return {
    props: {},
  };
};
