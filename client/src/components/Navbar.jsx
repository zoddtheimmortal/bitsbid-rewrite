import {
  HStack,
  Box,
  Spacer,
  Button,
  StackDivider,
  Avatar,
  Text,
} from "@chakra-ui/react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import client from "../api/client";
import { useEffect, useState } from "react";

const Navbar = () => {
  const supabase = client();

  const navigate = useNavigate();

  const [user, setUser] = useState({});

  useEffect(() => {
    async function getUserInfo() {
      const { data, error } = await supabase.auth.getSession();
      setUser(data.session.user.user_metadata);
    }
    getUserInfo();
  }, []);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div>
      <HStack paddingY={1} align={"center"}>
        <Box pos={"left"}>
          <Text fontSize={"3xl"} as={"kbd"}>
            {"{"}bitsbid{"}"}
          </Text>
        </Box>
        <Spacer />
        <HStack divider={<StackDivider border={"gray.200"} />}>
          <Avatar
            size={"md"}
            src={user.picture}
            onClick={() => navigate("/user")}
          />
          <Button colorScheme="yellow">Products</Button>
          <Button colorScheme="yellow" onClick={() => signOut()}>
            Sign Out
          </Button>
        </HStack>
      </HStack>
    </div>
  );
};

export default Navbar;
