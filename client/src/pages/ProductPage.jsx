import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import {
  Box,
  Image,
  SimpleGrid,
  Text,
  VStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Button,
  useToast,
  Spinner,
  Divider,
} from "@chakra-ui/react";
import client from "../api/client";

const ProductPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const supabase = client();

  const [item, setItem] = useState({
    id: 3,
    imageUrl: "https://bit.ly/2Z4KKcF",
    imageAlt: "Rear view of modern home with pool",
    beds: 3,
    baths: 2,
    name: "Modern home",
    description:
      "Modern home in city center in the heart of historic Los Angeles",
    formattedPrice: 1900,
    isActive: true,
  });
  const status = true;
  const toast = useToast();

  useEffect(() => {
    async function getUserInfo() {
      setLoading(true);
      const { data, error } = await supabase.auth.getSession();
      setUser(data.session.user.user_metadata);
      setLoading(false);
    }
    getUserInfo();
  }, []);

  const handleBid = () => {
    console.log("Clicked");
    if (status) {
      toast({
        title: "Bid Placed.",
        description: `Bid For ${item.formattedPrice} BC Has Been Placed.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Failed",
        description: `Please Try Again Later`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div>
        <Navbar />
        <SimpleGrid columns={{ sm: 1, md: 2 }} marginTop={2} gap={4}>
          <Box>
            <Image
              src={item.imageUrl}
              alt={item.imageAlt}
              borderRadius={"lg"}
            />
          </Box>
          <VStack>
            <Text marginTop={6}>
              <span className="font-semibold text-3xl">{item.name}</span>
            </Text>
            <Divider />
            <Text>
              <span className="text-xl">{item.description}</span>
            </Text>
            <Button colorScheme="yellow">TIMER</Button>
            <Text marginTop={2}>
              <span>Asking Price: {item.formattedPrice}</span>
            </Text>
            <Text>
              <span>Current Price: {item.formattedPrice}</span>
            </Text>
            <NumberInput step={1} min={item.formattedPrice} marginTop={4}>
              <NumberInputField placeholder="Bid Amount" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Button colorScheme="yellow" onClick={() => handleBid()}>
              Place Bid
            </Button>
          </VStack>
        </SimpleGrid>
      </div>
    );
  }
};

export default ProductPage;
