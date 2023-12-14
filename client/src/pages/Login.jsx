import { Box, Button, Text, theme, useColorMode } from "@chakra-ui/react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import client from "../api/client";
import { useEffect, useState } from "react";
import { MdOutlineDarkMode, MdDarkMode } from "react-icons/md";

const Login = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const supabase = client();

  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event) => {
      // console.log(event);
      if (event == "SIGNED_IN") {
        navigate("/user");
      } else {
        navigate("/");
      }
    });
  }, []);

  return (
    <Box>
      <div>
        <Text fontSize={"5xl"} as={"kbd"} onClick={toggleColorMode}>
          <span className="hover:font-semibold">
            {"{"}bitsbid{"}"}
          </span>
        </Text>
      </div>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        theme="dark"
        providers={["google"]}
      />
    </Box>
  );
};

export default Login;
