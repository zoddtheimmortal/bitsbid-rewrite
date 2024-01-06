import { Box, Badge, Image, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Timer from "./Timer";

function ProductCard({ item }) {
  const [loading, setLoading] = useState(false); //change to true for actual application
  // const item = {
  //   id: 3,
  //   imageUrl: "https://bit.ly/2Z4KKcF",
  //   imageAlt: "Rear view of modern home with pool",
  //   beds: 3,
  //   baths: 2,
  //   name: "Modern home",
  //   title: "Modern home in city center in the heart of historic Los Angeles",
  //   formattedPrice: "1,900.00",
  //   isActive: true,
  // };
  const navigate = useNavigate();

  const handleClick = () => {
    console.log(item);
    navigate(`/products/${item.id}`);
  };

  if (loading) {
    return <div>Put Skeleton Here Later</div>;
  } else {
    return (
      <Box
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        onClick={handleClick}
      >
        <Image
          height={"250"}
          src={item.img ? item.img : "https://bit.ly/2Z4KKcF"}
          alt={item.description}
          objectPosition={"end"}
          objectFit={"cover"}
        />

        <Box p="6">
          <Box display="flex" alignItems="baseline" gap={1}>
            {item.is_active ? (
              <Badge borderRadius="full" px="2" colorScheme="green">
                ONGOING
              </Badge>
            ) : (
              <Badge borderRadius="full" px="2" colorScheme="red">
                CONCLUDED
              </Badge>
            )}
            <Badge borderRadius={"full"} px="2">
              Ends on {item.ends}
            </Badge>
          </Box>

          <Box
            mt="2"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            noOfLines={1}
            fontSize={"xl"}
          >
            {item.name}
          </Box>

          <Box fontWeight="bold" as="h4" lineHeight="tight" noOfLines={1}>
            {item.title}
          </Box>

          <Box fontWeight={"thin"} noOfLines={2}>
            {item.description}
          </Box>

          <Box fontWeight={"semibold"}>
            {item.current_price ? item.current_price : 0} BC
          </Box>
        </Box>
      </Box>
    );
  }
}
export default ProductCard;
