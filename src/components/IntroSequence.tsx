'use client';

import { Box, Text } from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

const MotionBox = motion(Box);
const MotionText = motion(Text);

const commands = [
  "Loading profile...",
  "Initializing systems...",
  "Accessing data banks...",
  "> Oliver.init()",
  "> Loading skills...",
  "> Running background.start()"
];

export const IntroSequence = ({ onComplete }: { onComplete: () => void }) => {
  const [currentLine, setCurrentLine] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    const typeLines = async () => {
      for (let i = 0; i < commands.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 700));
        setCurrentLine(i);
        
        if (i === commands.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000));
          await controls.start({ opacity: 0 });
          await new Promise(resolve => setTimeout(resolve, 500));
          onComplete();
        }
      }
    };
    typeLines();
  }, [controls, onComplete]);

  return (
    <MotionBox
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="black"
      zIndex={50}
      display="flex"
      alignItems="center"
      justifyContent="center"
      animate={controls}
      initial={{ opacity: 1 }}
    >
      <Box maxW="600px" w="full">
        {commands.slice(0, currentLine + 1).map((command, index) => (
          <MotionText
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            mb={2}
            fontFamily="mono"
            fontSize="sm"
            color="rgba(255,255,255,0.7)"
            textAlign="center"
          >
            {command}
            {index === currentLine && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                _
              </motion.span>
            )}
          </MotionText>
        ))}
      </Box>
    </MotionBox>
  );
}; 