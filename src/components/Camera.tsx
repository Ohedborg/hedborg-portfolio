'use client';

import * as React from "react";
import { Box, BoxProps } from "@chakra-ui/react";
import { motion, MotionProps, useTransform } from "framer-motion";
import * as utils from "@/lib/utils";

const CameraContext = React.createContext<utils.Camera | null>(null);
    
export const useCamera = () => {
  const camera = React.useContext(CameraContext);
  if (!camera) {
    throw new Error("useCamera can only be called inside of a Camera");
  }
  return camera;
};

interface CameraProps extends Omit<BoxProps & MotionProps, 'transition'> {
  className?: string;
}

export const Camera = ({ children, ...otherProps }: CameraProps) => {
  const [camera] = React.useState(() => new utils.Camera());
  const containerRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;
    camera.containerEl = containerRef.current;
    camera.contentEl = contentRef.current;
  }, [camera]);

  const translate = useTransform(
    [camera.motionValues.posX, camera.motionValues.posY],
    (latest: number[]) => `${-latest[0]}px ${-latest[1]}px`
  );

  const transformOrigin = useTransform(
    [camera.motionValues.posX, camera.motionValues.posY],
    ([x, y]) => `calc(50% + ${x}px) calc(50% + ${y}px)`
  );

  return (
    <CameraContext.Provider value={camera}>
      <Box
        as={motion.div}
        overflow="hidden"
        position="relative"
        {...otherProps}
      >
        <Box ref={containerRef} position="absolute" inset={0}>
          <Box
            as={motion.div}
            ref={contentRef}
            position="relative"
            style={{
              translate,
              transformOrigin,
              scale: camera.motionValues.zoom,
              rotate: camera.motionValues.rotation
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </CameraContext.Provider>
  );
};

export interface CameraTargetProps extends Omit<BoxProps, "children"> {
  children:
    | ((target: utils.CameraTarget) => React.ReactNode)
    | BoxProps["children"];
}

export const CameraTarget = React.forwardRef<
  utils.CameraTarget,
  CameraTargetProps
>(({ children, ...otherProps }, forwardedRef) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const camera = useCamera();
  const [cameraTarget] = React.useState(() => new utils.CameraTarget(camera));
  React.useLayoutEffect(() => {
    if (!ref.current) return;
    cameraTarget.el = ref.current;
    if (typeof forwardedRef === "function") {
      forwardedRef(cameraTarget);
    } else if (forwardedRef) {
      forwardedRef.current = cameraTarget;
    }
  }, []);

  return (
    <Box ref={ref} {...otherProps}>
      {typeof children === "function" ? children(cameraTarget) : children}
    </Box>
  );
});

CameraTarget.displayName = 'CameraTarget';
