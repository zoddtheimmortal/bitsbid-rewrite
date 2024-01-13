import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import {
  Avatar,
  Box,
  Button,
  Spinner,
  Flex,
  VStack,
  Text,
  Spacer,
  Divider,
  StackDivider,
  Image,
  border,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Tab,
  Tabs,
  TabList,
  TabIndicator,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import client from "../api/client";
import ProductService from "../api/product.service";
import UserService from "../api/user.service";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { onOpen, isOpen, onClose } = useDisclosure();
  const initialRef = useRef();
  const finalRef = useRef();

  const supabase = client();

  const [user, setUser] = useState({});

  useEffect(() => {
    async function getUserInfo() {
      setLoading(true);
      const { data, error } = await supabase.auth.getSession();
      const res = await ProductService.getAllProducts();
      setUser(data.session.user.user_metadata);
      const set = await UserService.createOrUpdateUser(data.session.user.user_metadata);
      setLoading(false);
    }
    getUserInfo();
  }, []);

  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  } else {
    return (
      <div>
        <Navbar />
        {Object.keys(user) !== 0 ? (
          <div className="m-2 mt-4">
            {/* <div>{JSON.stringify(user)}</div> */}
            <Box borderWidth="1px" borderRadius="lg">
              <div className="grid md:grid-cols-2 sm:grid-cols-1 m-2 p-6 gap-2">
                <div>
                  <Image
                    src={user.picture}
                    size={"2xl"}
                    borderRadius={"full"}
                    minH={150}
                  />
                </div>
                <div>
                  <VStack gap={2}>
                    <Text>
                      <span className="font-semibold md:text-3xl text-xl">
                        Welcome, {user.full_name}!
                      </span>
                    </Text>
                    <Text>
                      <span className="md:text-lg text-sm">{user.email}</span>
                    </Text>
                    <Text>
                      <span className="font-semibold">
                        Wallet Balance: {0} BC
                      </span>
                    </Text>
                    <Button onClick={onOpen}>Add Balance</Button>
                    <Modal
                      initialFocusRef={initialRef}
                      finalFocusRef={finalRef}
                      isOpen={isOpen}
                      onClose={onClose}
                    >
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>Add Wallet Balance</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                          <FormControl>
                            <FormLabel>Add Amount</FormLabel>
                            <Input
                              ref={initialRef}
                              placeholder="Amount (In BC)"
                            />
                          </FormControl>
                        </ModalBody>

                        <ModalFooter>
                          <Button colorScheme="yellow" mr={3}>
                            Add
                          </Button>
                          <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  </VStack>
                </div>
              </div>
            </Box>
            <Box margin={2} marginTop={3}>
              <Tabs variant={"unstyled"}>
                <TabList>
                  <Tab>My Products</Tab>
                  <Tab>My Purchases</Tab>
                </TabList>
                <TabIndicator
                  mt="-1.5px"
                  height="2px"
                  bg="yellow.300"
                  borderRadius="1px"
                />
                <TabPanels>
                  <TabPanel>My Products</TabPanel>
                  <TabPanel>My Purchases</TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </div>
        ) : (
          <>Invalid Attempt</>
        )}
      </div>
    );
  }
};

export default Dashboard;
