'use client';

import { Box, Text, Stack, Flex, Image } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { MorphingText } from "@/components/magicui/morphing-text";
import { useEffect, useState } from 'react';

const MotionBox = motion(Box);
const MotionText = motion(Text);
const MotionImage = motion(Image);

export const Welcome = () => {
  const [currentFrame, setCurrentFrame] = useState(1);
  
  useEffect(() => {
    const animateSequence = async () => {
      // Frame 1 (medium pause)
      setCurrentFrame(1);
      await new Promise(resolve => setTimeout(resolve, 8000)); // Medium pause on frame 1
      
      // Frame 2 (quick)
      setCurrentFrame(2);
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Frame 3 (coffee drinking pause)
      setCurrentFrame(3);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Frame 4 (quick)
      setCurrentFrame(4);
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Start the sequence again
      animateSequence();
    };

    animateSequence();
    
    return () => {
      // Cleanup if needed
    };
  }, []);

  const morphingTexts = [
    "IT Architect",
    "Tech Nerd",
    "Runner",
    "Avid Reader",
    "Brew Lover",
    "Family Man",
    "Home Cook"
  ];

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="100vh"
      bg="black"
      color="white"
      px={4}
    >
      <Stack spacing={4} maxW="800px" textAlign="center">
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Text
            fontSize={{ base: "xl", md: "2xl" }}
            fontWeight="light"
            letterSpacing="wide"
            mb={1}
          >
            Hello, I'm
          </Text>
          <Text
            fontSize={{ base: "4xl", md: "7xl" }}
            fontWeight="bold"
            letterSpacing="tight"
            mb={4}
          >
            Oliver
          </Text>
        </MotionBox>

        <Box mb={4}>
          <Box 
            maxW="300px"
            mx="auto"
            position="relative"
            height="300px"
            borderRadius="full"
            overflow="hidden"
            bg="white"
            sx={{
              aspectRatio: "1/1",
              boxShadow: "0 0 20px rgba(255, 255, 255, 0.1)"
            }}
          >
            <AnimatePresence mode="wait">
              <MotionImage
                key={currentFrame}
                src={`/Frame ${currentFrame}.svg`}
                alt={`Animation frame ${currentFrame}`}
                initial={{ position: 'absolute' }}
                animate={{ position: 'absolute' }}
                transition={{ duration: 0 }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '85%',
                  height: '85%',
                  objectFit: 'contain',
                }}
              />
            </AnimatePresence>
          </Box>
        </Box>

        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          mb={8}
        >
          <MorphingText texts={morphingTexts} />
        </MotionBox>

        <MotionText
          fontSize={{ base: "md", md: "lg" }}
          opacity={0.8}
          maxW="600px"
          mx="auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          lineHeight="tall"
        >
          Brew-obsessed Tech Nerd turned Solution Architect, fueled by big ideas and bigger espresso shots. Outside the daily data-wrangling, you'll catch me running off the jitters, devouring books, cooking, and cherishing family time.
        </MotionText>
      </Stack>
    </Flex>
  );
}; 