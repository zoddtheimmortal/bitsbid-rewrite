import {
  SimpleGrid,
  Input,
  Box,
  IconButton,
  HStack,
  Button,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

const Products = () => {
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
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
      </SimpleGrid>
    </div>
  );
};

export default Products;
