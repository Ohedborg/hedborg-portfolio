import * as React from "react";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { CameraTarget } from "@/components/Camera";
import { CameraTarget as CameraTargetType } from "@/lib/utils";

interface PhotoProps {
  src: string;
  alt: string;
  onClick: (target: CameraTargetType | null) => void;
  isSelected?: boolean;
  title: string;
  review: string;
  rating: number;
  strengths: string[];
  weaknesses: string[];
  finalVerdict: string;
}

export const Photo = ({ src, alt, onClick, isSelected, title, review, rating, strengths, weaknesses, finalVerdict }: PhotoProps) => {
  const targetRef = React.useRef<CameraTargetType>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(!!isSelected);
    }, 600);
    return () => clearTimeout(timer);
  }, [isSelected]);

  return (
    <Box position="relative" zIndex={isSelected ? 1000 : 1}>
      <CameraTarget ref={targetRef}>
        <Box position="relative">
          <Box
            as="img"
            tabIndex={-1}
            src={src}
            alt={alt}
            onClick={() => targetRef.current && onClick(targetRef.current)}
            cursor="pointer"
            w="20vw"
            h="20vh"
            objectFit="cover"
            border="6px solid white"
            opacity={isSelected ? 1 : 0.3}
            transition="all 0.5s ease"
            _hover={{
              opacity: isSelected ? 1 : 0.5,
              transform: "scale(1.02)",
              transition: "all 0.3s ease"
            }}
          />
          {isSelected && (
            <Box
              position="absolute"
              left="120%"
              top="50%"
              transform="translateY(-50%)"
              w="500px"
              maxW="90vw"
              opacity={isVisible ? 1 : 0}
              transition="all 0.5s ease"
            >
              <Stack spacing={6} color="white">
                <Text fontSize="4xl" fontWeight="bold">{title}</Text>
                
                <Flex align="center" gap={2}>
                  <Text>Rating:</Text>
                  <Text color="yellow.400">{'★'.repeat(rating)}</Text>
                  <Text>({rating}/5)</Text>
                </Flex>

                <Text whiteSpace="pre-line">{review}</Text>

                <Box>
                  <Text fontWeight="bold" mb={2}>Strengths</Text>
                  <Stack spacing={2}>
                    {strengths.map((strength, i) => (
                      <Flex key={i} gap={2}>
                        <Text color="green.400">✓</Text>
                        <Text>{strength}</Text>
                      </Flex>
                    ))}
                  </Stack>
                </Box>

                <Box>
                  <Text fontWeight="bold" mb={2}>Weaknesses</Text>
                  <Stack spacing={2}>
                    {weaknesses.map((weakness, i) => (
                      <Flex key={i} gap={2}>
                        <Text color="red.400">▲</Text>
                        <Text>{weakness}</Text>
                      </Flex>
                    ))}
                  </Stack>
                </Box>

                <Box>
                  <Text fontWeight="bold" mb={2}>Final Verdict</Text>
                  <Text>{finalVerdict}</Text>
                </Box>
              </Stack>
            </Box>
          )}
        </Box>
      </CameraTarget>
    </Box>
  );
}; ``