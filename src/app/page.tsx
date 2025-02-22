'use client';

import { useState } from 'react';
import { Welcome } from "@/components/Welcome";
import { IntroSequence } from "@/components/IntroSequence";
import { Center } from "@chakra-ui/react";
import { Camera } from "@/components/Camera";
import { Banners } from "@/components/Banners";
import { RetroJournal } from "@/components/RetroJournal";
import { TechProjects } from "@/components/TechProjects";
import { CareerOverview } from "@/components/CareerOverview";
import { Footer } from "@/components/Footer";

const journalEntries = [
  {
    id: "1",
    date: new Date('2024-01-15T20:30:00'),
    title: "On Building Digital Gardens",
    content: "Started working on this digital space. A place for books, thoughts, and code experiments. Sometimes the best projects are the ones we build for ourselves."
  },
  {
    id: "2",
    date: new Date('2024-01-10T18:15:00'),
    title: "API Musings",
    content: "Been tinkering with some new API patterns. There's something satisfying about crafting clean, intuitive interfaces. More to come on this..."
  }
];

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      {!introComplete && <IntroSequence onComplete={() => setIntroComplete(true)} />}
      {introComplete && (
        <div className="min-h-screen bg-black text-white">
          <main className="w-full">
            <Welcome />
            <CareerOverview />
            <RetroJournal entries={journalEntries} />
            <TechProjects />
            <h1 className="text-4xl font-bold mb-8 text-center">Books I Enjoy</h1>
            <div className="h-[80vh] w-full relative overflow-hidden">
              <Camera w="100%" h="100%" bg="black">
                <Center h="100%" w="100%" position="relative">
                  <Banners />
                </Center>
              </Camera>
            </div>
            <div className="mt-8 text-lg text-center px-4">
           
            </div>
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}
