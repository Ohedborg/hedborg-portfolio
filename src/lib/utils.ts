import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  MotionValue,
  motionValue,
  animate,
  Spring
} from "framer-motion";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type AnimationConfig = Spring;

const DEFAULT_PAN_TRANSITON: AnimationConfig = {
  type: "spring",
  damping: 23,
  mass: 0.85,
  stiffness: 100,
  restDelta: 0.0
};

const DEFAULT_ZOOM_TRANSITON: AnimationConfig = {
  type: "spring",
  damping: 23,
  mass: 0.85,
  stiffness: 100,
  restDelta: 0.001
};

const DEFAULT_ROTATE_TRANSITON: AnimationConfig = {
  type: "spring",
  damping: 23,
  mass: 0.85,
  stiffness: 100,
  restDelta: 0.001
};

export class Vector {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(other: Vector) {
    this.x += other.x;
    this.y += other.y;
    return this;
  }

  sub(other: Vector) {
    this.x -= other.x;
    this.y -= other.y;
    return this;
  }

  multiplyScalar(factor: number) {
    this.x *= factor;
    this.y *= factor;
    return this;
  }

  distanceTo(other: Vector) {
    return Math.sqrt((other.x - this.x) ** 2 + (other.y - this.y) ** 2);
  }

  clone() {
    return new Vector(this.x, this.y);
  }
}

enum PointType {
  Center = "center",
  TopLeft = "top-left",
  TopRight = "top-right",
  BottomLeft = "bottom-left",
  BottomRight = "bottom-right"
}

function getElementPoint(el: HTMLElement, pointType: PointType): Vector {
  const rect = el.getBoundingClientRect();
  switch (pointType) {
    case PointType.Center:
      return new Vector(rect.x + rect.width / 2, rect.y + rect.height / 2);
    case PointType.TopLeft:
      return new Vector(rect.x, rect.y);
    case PointType.TopRight:
      return new Vector(rect.x + rect.width, rect.y);
    case PointType.BottomLeft:
      return new Vector(rect.x, rect.y + rect.height);
    case PointType.BottomRight:
      return new Vector(rect.x + rect.width, rect.y + rect.height);
  }
}

export class Camera {
  containerEl!: HTMLElement;
  contentEl!: HTMLElement;
  motionValues: {
    zoom: MotionValue<number>;
    posX: MotionValue<number>;
    posY: MotionValue<number>;
    rotation: MotionValue<number>;
  };
  following: {
    interval: ReturnType<typeof setInterval>;
    target: CameraTarget;
  } | null = null;

  constructor() {
    this.motionValues = {
      posX: motionValue(0),
      posY: motionValue(0),
      zoom: motionValue(1),
      rotation: motionValue(0)
    };
  }

  get position() {
    return new Vector(
      this.motionValues.posX.get(),
      this.motionValues.posY.get()
    );
  }

  get rotation() {
    return this.motionValues.rotation.get();
  }

  get zoom() {
    return this.motionValues.zoom.get();
  }

  panTo(
    position: Vector,
    transition: AnimationConfig = DEFAULT_PAN_TRANSITON
  ) {
    animate(this.motionValues.posX, position.x, transition);
    animate(this.motionValues.posY, position.y, transition);
  }

  setZoom(
    zoom: number,
    transition: AnimationConfig = DEFAULT_ZOOM_TRANSITON
  ) {
    animate(this.motionValues.zoom, zoom, transition);
  }

  setRotation(
    rotation: number,
    transition: AnimationConfig = DEFAULT_ROTATE_TRANSITON
  ) {
    animate(this.motionValues.rotation, rotation, transition);
  }

  follow(
    target: CameraTarget,
    transition: AnimationConfig = DEFAULT_PAN_TRANSITON
  ) {
    if (this.following) {
      clearInterval(this.following.interval);
      this.following = null;
    }
    const panToTarget = () => {
      this.panTo(target.center, transition);
    };
    panToTarget();
    this.following = {
      target,
      interval: setInterval(panToTarget, 100)
    };
  }

  unfollow(target: CameraTarget) {
    if (this.following?.target === target) {
      clearInterval(this.following.interval);
      this.following = null;
    }
  }
}

export class CameraTarget {
  el!: HTMLElement;
  camera: Camera;

  constructor(camera: Camera) {
    this.camera = camera;
  }

  getPoint(pointType: PointType) {
    const targetCenter = getElementPoint(this.el, pointType);
    const containerCenter = getElementPoint(
      this.camera.containerEl,
      PointType.Center
    );
    const targetOffset = targetCenter
      .clone()
      .sub(containerCenter)
      .multiplyScalar(1 / this.camera.zoom);
    return this.camera.position.clone().add(targetOffset);
  }

  get center(): Vector {
    return this.getPoint(PointType.Center);
  }

  get topLeft(): Vector {
    return this.getPoint(PointType.TopLeft);
  }

  get topRight(): Vector {
    return this.getPoint(PointType.TopRight);
  }

  get bottomLeft(): Vector {
    return this.getPoint(PointType.BottomLeft);
  }

  get bottomRight(): Vector {
    return this.getPoint(PointType.BottomRight);
  }
}
