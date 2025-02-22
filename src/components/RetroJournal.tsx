'use client';

import { Box, Stack, Text, VStack } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { client } from "@/sanity/lib/client";

const MotionBox = motion(Box);

interface JournalEntry {
  id: string;
  date: Date;
  title: string;
  content: string;
}

interface RetroJournalProps {
  entries: JournalEntry[];
}

export const RetroJournal: React.FC<RetroJournalProps> = ({ entries }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const getPreviewContent = (content: string) => {
    if (content.length > 250) {
      return content.slice(0, 250) + '...';
    }
    return content;
  };

  return (
    <Box 
      w="full" 
      bg="black" 
      color="white" 
      py={20}
    >
      <VStack spacing={12} maxW="800px" mx="auto" px={4}>
        <Text
          fontSize="4xl"
          fontWeight="bold"
          textAlign="center"
          mb={8}
        >
          Unstructured Thoughts
        </Text>
        
        <Stack spacing={8} w="full">
          {entries.map((entry) => (
            <MotionBox
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              borderLeft="2px solid"
              borderColor="whiteAlpha.300"
              pl={4}
              py={2}
              onClick={() => setExpandedId(expandedId === entry.id ? null : entry.id)}
              _hover={{
                borderColor: "white",
                transform: "translateX(10px)",
                transition: "all 0.2s",
                cursor: "pointer"
              }}
            >
              <Text
                fontFamily="mono"
                fontSize="sm"
                color="whiteAlpha.700"
                mb={2}
              >
                {'>'} {format(entry.date, 'yyyy-MM-dd HH:mm')}
              </Text>
              <Text
                fontSize="xl"
                fontWeight="bold"
                mb={4}
              >
                {entry.title}
              </Text>
              <AnimatePresence initial={false}>
                <MotionBox
                  initial={{ height: "auto" }}
                  animate={{ height: "auto" }}
                  exit={{ height: "auto" }}
                  transition={{ duration: 0.3 }}
                >
                  <Text
                    whiteSpace="pre-wrap"
                    color="whiteAlpha.900"
                    fontFamily="mono"
                    fontSize="md"
                    lineHeight="1.6"
                  >
                    {expandedId === entry.id ? entry.content : getPreviewContent(entry.content)}
                  </Text>
                  {entry.content.length > 100 && (
                    <Text
                      mt={3}
                      color="whiteAlpha.700"
                      fontSize="sm"
                      fontFamily="mono"
                    >
                      {expandedId === entry.id ? "< Click to collapse >" : "< Click to expand >"}
                    </Text>
                  )}
                </MotionBox>
              </AnimatePresence>
            </MotionBox>
          ))}
        </Stack>
      </VStack>
    </Box>
  );
};