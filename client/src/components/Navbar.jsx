import {
  HStack,
  Box,
  Spacer,
  Button,
  StackDivider,
  Avatar,
  Text,
  useColorMode,
  Tooltip,
} from "@chakra-ui/react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import client from "../api/client";
import { useEffect, useState } from "react";
import { MdOutlineDarkMode, MdDarkMode } from "react-icons/md";
import ProductService from "../api/product.service";

const Navbar = () => {
  const supabase = client();

  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();

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
    <div className="">
      <HStack paddingY={1} align={"center"}>
        <Box pos={"left"}>
          <Text fontSize={"3xl"} as={"kbd"}>
            {"{"}bitsbid{"}"}
          </Text>
        </Box>
        <Spacer />
        <HStack divider={<StackDivider border={"gray.200"} />}>
          <Tooltip hasArrow label="Dashboard" bg="gray.300" color="black">
            <Avatar
              size={"md"}
              src={user.picture}
              onClick={() => navigate("/user")}
              className="hover:scale-105"
            />
          </Tooltip>
          <Button colorScheme="yellow" onClick={() => navigate("/products")}>
            Products
          </Button>
          <Button colorScheme="yellow" onClick={() => signOut()}>
            Sign Out
          </Button>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <MdOutlineDarkMode /> : <MdDarkMode />}
          </Button>
        </HStack>
      </HStack>
    </div>
  );
};

export default Navbar;
