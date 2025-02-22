'use client';

import { Box, Stack, Text, VStack, Divider, Icon, HStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiCloud} from 'react-icons/fi';
import { SiSlack, SiFigma, SiOracle, SiReact, SiNextdotjs, SiTypescript } from 'react-icons/si';
import { FaMicrosoft } from "react-icons/fa";
import { GoCodeReview } from "react-icons/go";
import { TbPlugConnected } from "react-icons/tb";
import { BsBuilding } from "react-icons/bs";
import { IconType } from 'react-icons';

const MotionBox = motion(Box);

interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  icon: IconType;
}

const experiences: Experience[] = [
  {
    id: "1",
    role: "Enterprise Solution Architect",
    company: "Figma",
    period: "Feb 2024 - Present",
    location: "London, England, United Kingdom",
    description: "Leading enterprise architecture initiatives and component design systems",
    highlights: [
      "Component Lens development",
      "Enterprise architecture solutions",
      "Technical leadership"
    ],
    icon: SiFigma
  },
  {
    id: "2",
    role: "Senior Solutions Engineer",
    company: "Slack",
    period: "Jan 2022 - Feb 2024",
    location: "London, England, United Kingdom",
    description: "2 years 2 months of driving technical solutions and integrations",
    highlights: [
      "Technical solution design",
      "Integration architecture",
      "Enterprise system optimization"
    ],
    icon: SiSlack
  },
  {
    id: "3",
    role: "Cloud Solution Architect - Azure Apps & Infra",
    company: "Microsoft",
    period: "Oct 2020 - Feb 2022",
    location: "Dublin City, County Dublin, Ireland",
    description: "Specialized in Azure solutions focusing on applications and infrastructure, supporting customers in pre- and post-sales scenarios",
    highlights: [
      "Azure architecture design",
      "Cloud infrastructure optimization",
      "Customer solution consulting"
    ],
    icon: FaMicrosoft
  },
  {
    id: "4",
    role: "Solutions Engineer (Infrastructure/Database)",
    company: "Oracle",
    period: "Dec 2018 - Sep 2020",
    location: "County Dublin, Ireland",
    description: "Proposed and designed solutions meeting customers' needs, specializing in Oracle Technology Portfolio",
    highlights: [
      "Database architecture",
      "Infrastructure solutions",
      "Technical consulting"
    ],
    icon: SiOracle
  }
];

const skills = [
  { name: "Figma", icon: SiFigma },
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Javascript / Typescript", icon: SiTypescript },
  { name: "Cloud Architecture", icon: FiCloud },
  { name: "Solution Design", icon: GoCodeReview },
  { name: "Infrastructure", icon: BsBuilding },
  { name: "API and System Integration", icon: TbPlugConnected }
];

export const CareerOverview = () => {
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
          {'>'} cat career.txt
        </Text>
        
        <Stack spacing={8} w="full">
          {experiences.map((exp) => (
            <MotionBox
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              borderLeft="2px solid"
              borderColor="whiteAlpha.200"
              pl={6}
              py={2}
              _hover={{
                borderColor: "white"
              }}
            >
              <HStack spacing={3} mb={1}>
                <Icon as={exp.icon} boxSize={5} color="whiteAlpha.900" />
                <Text
                  fontFamily="mono"
                  fontSize="sm"
                  color="whiteAlpha.700"
                >
                  {'>'} {exp.period}
                </Text>
              </HStack>
              <Text
                fontSize="xl"
                fontWeight="bold"
                mb={1}
                fontFamily="mono"
              >
                {exp.role}
              </Text>
              <Text
                fontSize="md"
                color="whiteAlpha.900"
                mb={2}
                fontFamily="mono"
              >
                @ {exp.company}
              </Text>
              <Text
                fontSize="sm"
                color="whiteAlpha.700"
                mb={3}
                fontFamily="mono"
              >
                {exp.location}
              </Text>
              <Text
                color="whiteAlpha.800"
                mb={4}
                fontFamily="mono"
              >
                {exp.description}
              </Text>
              <Stack spacing={2}>
                {exp.highlights.map((highlight, index) => (
                  <Text
                    key={index}
                    fontFamily="mono"
                    fontSize="sm"
                    color="whiteAlpha.800"
                  >
                    $ {highlight}
                  </Text>
                ))}
              </Stack>
            </MotionBox>
          ))}
        </Stack>

        <Divider borderColor="whiteAlpha.200" />

        <Box w="full">
          <Text
            fontSize="2xl"
            fontWeight="bold"
            mb={6}
            fontFamily="mono"
          >
            {'>'} ls ./skills
          </Text>
          <Stack direction="row" flexWrap="wrap" spacing={4}>
            {skills.map((skill, index) => (
              <MotionBox
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                bg="whiteAlpha.100"
                px={4}
                py={2}
                borderRadius="md"
                _hover={{
                  bg: "whiteAlpha.200"
                }}
              >
                <HStack spacing={2}>
                  <Icon as={skill.icon} />
                  <Text fontFamily="mono" fontSize="sm">
                    {skill.name}
                  </Text>
                </HStack>
              </MotionBox>
            ))}
          </Stack>
        </Box>
      </VStack>
    </Box>
  );
}; 