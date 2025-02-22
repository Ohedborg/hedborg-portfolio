'use client';

import * as React from "react";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { Camera, CameraTarget, useCamera } from "@/components/Camera";
import { Vector, CameraTarget as CameraTargetType } from "@/lib/utils";
import { useClock } from "@/hooks/camera";
import InfiniteBanner from "@/components/InfiniteBanner";
import { client } from '@/sanity/lib/client';
import { useEffect, useState } from 'react';
import { bookImagesQuery } from '@/sanity/lib/queries';
import { MotionValue } from "framer-motion";

interface BookImage {
  _id: string;
  title: string;
  imageUrl: string;
  review: string;
  bannerPosition: 'upper' | 'bottom';
}

const Photo = ({ src, alt, onClick, isSelected, title, review }: {
  src: string;
  alt: string;
  onClick: (target: CameraTargetType | null) => void;
  isSelected?: boolean;
  title: string;
  review: string;
}) => {
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
      <CameraTarget 
        ref={(el) => {
          if (targetRef) targetRef.current = el;
        }}
      >
        <Box position="relative">
          <Box
            as="img"
            tabIndex={0}
            src={src}
            alt={alt}
            onClick={() => targetRef.current && onClick(targetRef.current)}
            cursor="pointer"
            w={{ base: "120px", md: "160px" }}
            h={{ base: "180px", md: "240px" }}
            objectFit="cover"
            border="4px solid white"
            borderRadius="sm"
            boxShadow="lg"
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
              left={{ base: "0", md: "calc(100% + 16px)" }}
              top={{ base: "0", md: "0" }}
              h="100%"
              w={{ base: "100%", md: "160px" }}
              opacity={isVisible ? 1 : 0}
              transition="all 0.5s ease"
              bg="rgba(0,0,0,0.9)"
              p={4}
              borderRadius="md"
              zIndex={2000}
              overflowY="auto"
              onClick={(e) => {
                if (window.innerWidth <= 768) {
                  e.stopPropagation();
                  onClick(null);
                }
              }}
              cursor={{ base: "pointer", md: "auto" }}
              css={{
                '&::-webkit-scrollbar': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'rgba(0,0,0,0.1)',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: 'rgba(255,255,255,0.3)',
                  borderRadius: '3px',
                },
              }}
            >
              <Text 
                fontSize="xs"
                fontWeight="bold"
                color="white"
                mb={2}
              >
                {title}
              </Text>
              <Text
                fontSize="8px"
                lineHeight="1.2"
                color="white"
                sx={{
                  letterSpacing: "0.02em",
                  whiteSpace: "pre-wrap"
                }}
              >
                {review}
              </Text>
            </Box>
          )}
        </Box>
      </CameraTarget>
    </Box>
  );
};

export const Banners = () => {
  const camera = useCamera();
  const [target, setTarget] = React.useState<CameraTargetType | null>(null);
  const clock = useClock({
    defaultValue: Date.now(),
    reverse: false,
    speed: 0.15
  });
  const reverseClock = useClock({
    defaultValue: Date.now(),
    reverse: true,
    speed: 0.15
  });
  const [images, setImages] = useState<BookImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<BookImage | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      const data = await client.fetch(bookImagesQuery);
      setImages(data || []);
    };
    fetchImages();
  }, []);

  React.useEffect(() => {
    if (target) {
      clock.stop();
      reverseClock.stop();
      
      camera.setRotation(0);
      camera.setZoom(1);
      
      setTimeout(() => {
        camera.follow(target);
        camera.panTo(new Vector(-1200, 0));
        camera.setZoom(2.8, {
          type: "spring",
          stiffness: 80,
          damping: 20,
          mass: 1
        });
      }, 100);
    } else {
      camera.panTo(new Vector(0, 0));
      camera.setZoom(1);
      camera.setRotation(-10);
      clock.start();
      reverseClock.start();
    }
    return () => {
      if (target) camera.unfollow(target);
    };
  }, [camera, target, clock, reverseClock]);

  if (!images.length) return null;

  const topRowImages = images.filter(img => img.bannerPosition === 'upper');
  const bottomRowImages = images.filter(img => img.bannerPosition === 'bottom');

  const renderImageRow = (images: BookImage[], rowKey: string, clockValue: MotionValue<number>) => (
    <InfiniteBanner clock={clockValue}>
      <Flex gap={4} pr={4} width="max-content" mx="auto">
        {[...images, ...images, ...images, ...images].map((img, i) => (
          <Photo
            key={`${rowKey}-${i}`}
            src={img.imageUrl}
            alt={img.title}
            onClick={(t) => {
              setTarget((prev) => (prev !== t ? t : null));
              setSelectedImage((prev: BookImage | null) => (prev?._id !== img._id ? img : null));
            }}
            isSelected={selectedImage?._id === img._id}
            title={img.title}
            review={img.review}
          />
        ))}
      </Flex>
    </InfiniteBanner>
  );

  return (
    <Box width="100vw" overflow="hidden" position="relative" left="50%" transform="translateX(-50%)">
      <Stack spacing={20} width="100%" mt={20}>
        {renderImageRow(topRowImages, 'top', clock.value)}
        {renderImageRow(bottomRowImages, 'bottom', reverseClock.value)}
      </Stack>
    </Box>
  );
};

export default function BannersWrapper() {
  return (
    <Camera h="100vh" bg="black">
      <Box 
        h="100%" 
        w="100%"
        display="flex" 
        alignItems="center" 
        justifyContent="center"
        overflow="hidden"
      >
        <Banners />
      </Box>
    </Camera>
  );
} 