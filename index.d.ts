declare module "exif-auto-rotate" {

  class Rotator {
    static RotateImage(
      image: HTMLImageElement,
      srcOrientation: number
    ): string | Blob;

    static b64toBlob(b64Data: string): Blob;
    
    static getOrientation(
      view: Blob,
      callback: Function
      ): void;

    static createRotatedImage(
      file: Blob,
      outputType: string,
      responseUriFunc: (
        value: string | Blob | ProgressEvent<FileReader>
      ) => void,
      errorHandler: (
        reason?: any
      ) => void
    ): void;

    static createRotatedImageAsync(
      file: Blob,
      outputType: string,
    ): Promise<Blob | string>;
  }

  const ImageRotator: { createRotatedImage: typeof Rotator.createRotatedImage, createRotatedImageAsync: typeof Rotator.createRotatedImageAsync };

  export default ImageRotator;
}