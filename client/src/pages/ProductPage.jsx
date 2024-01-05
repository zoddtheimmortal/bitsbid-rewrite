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
  Card,
  CardBody,
  CardFooter,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import client from "../api/client";
import { parse } from "postcss";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Timer from "../components/Timer";

const ProductPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [bid, setBid] = useState(0);
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
        description: `Bid For ${bid} BC Has Been Placed.`,
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
    return (
      <div>
        <Spinner />
      </div>
    );
  } else {
    return (
      <div>
        <Navbar />
        <Breadcrumb
          spacing="8px"
          separator={<ChevronRightIcon color="gray.500" />}
        >
          <BreadcrumbItem>
            <BreadcrumbLink href="/products">Products</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">{item.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
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
            <Timer deadline="2023-12-31T23:40:48" active={true} />
            <Card width={"sm"}>
              <CardBody>
                <Text marginTop={2}>
                  <span className="font-semibold">Asking Price: </span>
                  <span>{item.formattedPrice}</span>
                </Text>
                <Text>
                  <span className="font-semibold">Current Price: </span>
                  <span>{item.formattedPrice}</span>
                </Text>
              </CardBody>
              <Divider />
              <CardFooter>
                <VStack>
                  <NumberInput
                    step={1}
                    min={item.formattedPrice}
                    marginTop={4}
                    onChange={(value) => {
                      setBid(value);
                    }}
                  >
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
              </CardFooter>
            </Card>
          </VStack>
        </SimpleGrid>
      </div>
    );
  }
};

export default ProductPage;
