import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        margin: 0,
        fontFamily: "'Geist Mono', monospace",
        letterSpacing: "-0.02em"
      }
    }
  },
  fonts: {
    heading: "'Geist Mono', monospace",
    body: "'Geist Mono', monospace",
    mono: "'Geist Mono', monospace"
  }
});

export default theme;
