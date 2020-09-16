declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: any;
  export default content;
}

declare module "*.jpg" {
  const content: any;
  export default content;
}

declare module "*.scss" {
  const content: { [className: string]: string };
  export default content;
}
