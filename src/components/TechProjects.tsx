'use client';

import { Box, Stack, Text, VStack, Link, Icon, HStack, Tag } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiGithub, FiFigma, FiBookOpen, FiExternalLink } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { client } from "@/sanity/lib/client";

const MotionBox = motion(Box);

interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  Figma?: string;
}

const getIconForType = (type: string) => {
  switch (type) {
    case 'github':
      return FiGithub;
    case 'figma':
      return FiFigma;
    case 'live':
      return FiExternalLink;
    default:
      return FiExternalLink;
  }
};

export const TechProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const query = `*[_type == "project"] | order(createdAt desc) {
        _id,
        title,
        description,
        technologies,
        githubUrl,
        liveUrl,
        Figma
      }`;
      
      const fetchedProjects = await client.fetch<Project[]>(query);
      setProjects(fetchedProjects);
    };

    fetchProjects();
  }, []);

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
          fontFamily="mono"
        >
          > ./list-projects
        </Text>
        
        <Stack spacing={12} w="full">
          {projects.map((project) => (
            <MotionBox
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              bg="whiteAlpha.50"
              borderRadius="md"
              p={6}
              _hover={{
                bg: "whiteAlpha.100",
                transform: "translateY(-5px)",
                transition: "all 0.2s"
              }}
            >
              <Text
                fontSize="xl"
                fontWeight="bold"
                mb={3}
                fontFamily="mono"
              >
                $ {project.title}
              </Text>
              
              <Text
                color="whiteAlpha.900"
                mb={4}
                fontFamily="mono"
                fontSize="md"
              >
                {project.description}
              </Text>

              <HStack spacing={2} mb={4} flexWrap="wrap">
                {project.technologies.map((tech) => (
                  <Tag
                    key={tech}
                    size="sm"
                    variant="subtle"
                    colorScheme="gray"
                    fontFamily="mono"
                  >
                    {tech}
                  </Tag>
                ))}
              </HStack>

              <HStack spacing={4}>
                {project.githubUrl && (
                  <Link
                    href={project.githubUrl}
                    isExternal
                    color="whiteAlpha.700"
                    _hover={{ color: "white" }}
                  >
                    <Icon as={getIconForType('github')} boxSize={5} />
                  </Link>
                )}
                {project.Figma && (
                  <Link
                    href={project.Figma}
                    isExternal
                    color="whiteAlpha.700"
                    _hover={{ color: "white" }}
                  >
                    <Icon as={getIconForType('figma')} boxSize={5} />
                  </Link>
                )}
                {project.liveUrl && (
                  <Link
                    href={project.liveUrl}
                    isExternal
                    color="whiteAlpha.700"
                    _hover={{ color: "white" }}
                  >
                    <Icon as={getIconForType('live')} boxSize={5} />
                  </Link>
                )}
              </HStack>
            </MotionBox>
          ))}
        </Stack>
      </VStack>
    </Box>
  );
}; 