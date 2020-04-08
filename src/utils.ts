import { PhotoProps } from "./components/PhotoWallLayouts/PhotoWallLayoutTypes";

export const randomString = () => Math.random().toString(36).substring(2, 15);

export const arrayToChunks = <T>(array: Array<T>, chunkSize: number) => {
    const copy = Array.from(array); //Shallow copy to avoid mutating the original array
    const chunks = [];
    while (copy.length > 0) {
        chunks.push(copy.splice(0, chunkSize));
    }

    return chunks;
}

export const randomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Helper function sorting photos in three buckets.
 * 
 * First bucket contains requiredHorizontal horizontal images.
 * Second bucket contains requriedVertical vertical images.
 * Third bucket contains the remaining images, regardless of orientation.
 * 
 * @param images An array of photos in different orientations
 * @param requiredHorizontal Required size of the resulting array containing horizontal images
 * @param requiredVertical Required size of the resulting array containing vertical images
 */
export const splitImages = (images: Array<PhotoProps>, requiredHorizontal: number, requiredVertical: number): [Array<PhotoProps>, Array<PhotoProps>, Array<PhotoProps>] => {
    const verticalImages = images.filter(({orientation}) => orientation === "vertical");
    const horizontalImages = images.filter(({orientation}) => orientation === "horizontal");
    const otherImages = images.filter(({orientation}) => orientation !== "horizontal" && orientation !== "vertical");
    
    const pickedHorizontal = horizontalImages.splice(0, requiredHorizontal);
    const pickedVertical = verticalImages.splice(0, requiredVertical);
    otherImages.push(...verticalImages, ...horizontalImages);

    return [pickedHorizontal, pickedVertical, otherImages];
}
