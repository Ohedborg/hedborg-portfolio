'use client';

import { Box, Container, HStack, Link, Text, Image } from "@chakra-ui/react";
import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { useEffect, useRef, useState } from 'react';

export const Footer = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const eyeContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (eyeContainerRef.current) {
        const { left, top, width, height } = eyeContainerRef.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        
        // Calculate angle between center and mouse
        const angle = Math.atan2(event.clientY - centerY, event.clientX - centerX);
        
        // Maximum movement radius (in pixels)
        const maxMovement = 3;
        
        // Calculate eye position
        const x = Math.cos(angle) * maxMovement;
        const y = Math.sin(angle) * maxMovement;
        
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <Box 
      as="footer" 
      py={24}
      position="relative"
      bg="black"
      color="white"
    >
      {/* Profile circle with animated eyes */}
      <Box
        position="absolute"
        top="-150px"
        left="50%"
        transform="translateX(-50%)"
        width="400px"
        height="400px"
        overflow="hidden"
        sx={{
          maskImage: 'radial-gradient(circle at center, black 100%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 100%, transparent 100%)',
          '& > img': {
            background: 'transparent',
          }
        }}
      >
        <Image
          src="/Frame 5.svg"
          alt="Profile"
          width="100%"
          height="100%"
          objectFit="contain"
          transform="translateY(80px)"
          style={{
            background: 'transparent',
            filter: 'none'
          }}
        />
        {/* Animated eyes container */}
        <Box
          ref={eyeContainerRef}
          position="absolute"
          top="48%"  // Adjust these values to position the eyes correctly
          left="50%"
          transform="translate(-50%, -50%)"
          width="54px"  // Adjust based on face size
          height="30px"  // Adjust based on face size
          display="flex"
          justifyContent="space-between"
        >
          {/* Left eye */}
          <Box
            width="25px"
            height="25px"
            borderRadius="full"
            position="relative"
          >
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform={`translate(calc(-50% + ${mousePosition.x}px), calc(-50% + ${mousePosition.y}px))`}
              width="8px"
              height="8px"
              borderRadius="full"
              bg="black"
              transition="transform 0.1s ease"
            />
          </Box>
          {/* Right eye */}
          <Box
            width="25px"
            height="25px"
            borderRadius="full"
            position="relative"
          >
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform={`translate(calc(-50% + ${mousePosition.x}px), calc(-50% + ${mousePosition.y}px))`}
              width="8px"
              height="8px"
              borderRadius="full"
              bg="black"
              transition="transform 0.1s ease"
            />
          </Box>
        </Box>
      </Box>

      {/* Rest of the footer content remains the same */}
      <Container maxW="container.md" textAlign="center" pt={40}>
        <HStack justify="center" spacing={8} mb={8}>
          <Link href="https://github.com/ohedborg" isExternal color="white" _hover={{ color: "whiteAlpha.800" }}>
            <FaGithub size={28} />
          </Link>
          <Link href="https://twitter.com/ohedborg" isExternal color="white" _hover={{ color: "whiteAlpha.800" }}>
            <FaTwitter size={28} />
          </Link>
          <Link href="https://linkedin.com/in/ohedborg" isExternal color="white" _hover={{ color: "whiteAlpha.800" }}>
            <FaLinkedin size={28} />
          </Link>
          <Link href="mailto:oliver@hedborg.com" color="white" _hover={{ color: "whiteAlpha.800" }}>
            <FaEnvelope size={28} />
          </Link>
        </HStack>
        
        <Text mb={4} fontSize="lg">
          Made with ♥️ and lots of coffee
        </Text>
        <Box position="relative">
          {/* <Bricks /> */}
        </Box>
        <Text fontSize="md" color="whiteAlpha.700">
          © 2025 Oliver Hedborg. All rights reserved.
        </Text>
      </Container>
    </Box>
  );
}; 