import { Box, Button, Text, theme } from "@chakra-ui/react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import client from "../api/client";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const Login = () => {
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
        <Text fontSize={"5xl"} as={"kbd"}>
          {"{"}bitsbid{"}"}
        </Text>
        {/* <div>
            <Button
              onClick={() => {}}
              margin={2}
              leftIcon={<FaGoogle></FaGoogle>}
            >
              Login with Google
            </Button>
          </div> */}
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
