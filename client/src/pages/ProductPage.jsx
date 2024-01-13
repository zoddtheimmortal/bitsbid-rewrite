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
import ProductService from "../api/product.service";

const ProductPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [bid, setBid] = useState(0);
  const supabase = client();

  const [item, setItem] = useState({});
  const status = true;
  const toast = useToast();

  useEffect(() => {
    async function getUserInfo() {
      setLoading(true);
      const { data, error } = await supabase.auth.getSession();
      setUser(data.session.user.user_metadata);
      setLoading(false);
    }

    async function getInitData(id) {
      setLoading(true);
      const data = await ProductService.getProductUsingId(id);
      setItem(...data);
      setLoading(false);
    }

    getUserInfo();
    getInitData(id);
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
              src={item.img}
              alt={item.description}
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
            <Timer deadline={item.ends} active={item.is_active} />:
            <Card width={"sm"}>
              <CardBody>
                <Text marginTop={2}>
                  <span className="font-semibold">Asking Price: </span>
                  <span>{item.buy_price}</span>
                </Text>
                <Text>
                  <span className="font-semibold">Current Price: </span>
                  <span>{item.current_price}</span>
                </Text>
              </CardBody>
              <Divider />
              <CardFooter>
                <VStack>
                  <NumberInput
                    step={1}
                    min={item.current_price}
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
