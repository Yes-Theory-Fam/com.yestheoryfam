export const randomString = () => Math.random().toString(36).substring(2, 15);

export const arrayToChunks = <T>(array: Array<T>, chunkSize: number) => {
    const copy = Array.from(array); //Shallow copy to avoid mutating the original array
    const chunks = [];
    while (copy.length > 0) {
        chunks.push(copy.splice(0, chunkSize));
    }

    return chunks;
}
