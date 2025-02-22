'use client';

import * as React from "react";
import { Camera } from "@/components/Camera";
import { Banners } from "@/components/Banners";
import { Box } from "@chakra-ui/react";

const ClientPage = () => {
  return (
    <Box 
      position="fixed"
      top={0}
      left={0}
      w="100vw"
      h="100vh"
      overflow="hidden"
      bg="navy.900"  // Dark navy background
    >
      <Camera w="100%" h="100%">
        <Banners />
      </Camera>
    </Box>
  );
};

export default ClientPage; 