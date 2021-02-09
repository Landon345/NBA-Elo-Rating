import React from "react";
import { Box, Grid, Skeleton } from "@chakra-ui/core";

export const FailedState = ({
  message = "We are having trouble fetching our data, try again later.",
  ...props
}) => (
  <Box {...props}>
    <Box textAlign="center" color="black" fontSize="30px">
      {message}
    </Box>
  </Box>
);

export const LoadingState = (props: any) => (
  <Box>
    {[...Array(20)].map((e, i) => (
      <Skeleton
        height="60px"
        my="10px"
        key={i}
        borderRadius="10px"
        colorStart="Black"
        colorEnd="White"
      />
    ))}
  </Box>
);
