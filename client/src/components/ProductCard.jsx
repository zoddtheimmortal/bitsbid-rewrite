import { Box, Badge, Image, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function ProductCard() {
  const property = {
    id: 3,
    imageUrl: "https://bit.ly/2Z4KKcF",
    imageAlt: "Rear view of modern home with pool",
    beds: 3,
    baths: 2,
    title: "Modern home in city center in the heart of historic Los Angeles",
    formattedPrice: "1,900.00",
    isActive: true,
  };
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${property.id}`);
  };

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      onClick={handleClick}
    >
      <Image src={property.imageUrl} alt={property.imageAlt} />

      <Box p="6">
        <Box display="flex" alignItems="baseline">
          {property.isActive ? (
            <Badge borderRadius="full" px="2" colorScheme="green">
              ONGOING
            </Badge>
          ) : (
            <Badge borderRadius="full" px="2" colorScheme="red">
              CONCLUDED
            </Badge>
          )}
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {property.beds} beds &bull; {property.baths} baths
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={1}
        >
          {property.title}
        </Box>

        <Box>
          BC {property.formattedPrice}
          <Box as="span" color="gray.600" fontSize="sm">
            / wk
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
export default ProductCard;
