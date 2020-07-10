declare module "exif-auto-rotate" {

  class Rotator {
    static RotateImage(
      image: HTMLImageElement,
      srcOrientation: number
    ): string;

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
      ) => void
    ): void;
  }

  const ImageRotator: { createRotatedImage: typeof Rotator.createRotatedImage };

  export default ImageRotator;
}
