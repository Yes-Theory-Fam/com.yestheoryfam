interface PhotoWallLayoutProps {
  totalImages: number;
  verticalImages: number;
  horizontalImages: number;
}

interface LayoutProps {
  images: Array<PhotoProps>;
}

interface PhotoProps {
  src: string | undefined;
  orientation: Orientation;
}

type Orientation = "square" | "vertical" | "horizontal";

export { PhotoWallLayoutProps, LayoutProps, PhotoProps, Orientation };
