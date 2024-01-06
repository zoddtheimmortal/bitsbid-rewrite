import {
  SimpleGrid,
  Input,
  Box,
  IconButton,
  HStack,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import ProductService from "../api/product.service";

const Products = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const getInitData = async () => {
    setLoading(true);
    const res = await ProductService.getAllProducts();
    setItems(res);
    // console.log(res);
    setLoading(false);
  };

  useEffect(() => {
    getInitData();
  }, []);

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div>
        <Navbar />
        <Box>
          <HStack>
            <Input placeholder="Search Products" marginY={3} />
            <Button aria-label="Search database" colorScheme={"yellow"}>
              <SearchIcon />
            </Button>
          </HStack>
        </Box>
        <SimpleGrid columns={{ sm: 1, md: 3 }} gap={3}>
          {items.map((item) => {
            return <ProductCard item={item} />;
          })}
        </SimpleGrid>
      </div>
    );
  }
};

export default Products;
