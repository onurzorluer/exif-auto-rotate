# Exif Auto Rotate

[![Build Status](https://travis-ci.org/onurzorluer/exif-auto-rotate.svg?branch=master)](https://travis-ci.org/onurzorluer/exif-auto-rotate.svg?branch=master)

`exif-auto-rotate` is a module that helps you for applying the right orientation to JPEG images, based on its EXIF tag, automatically.

- Resets to orientation 1 from all orientation codes. It returns of new image's base64 URI or Blob.
- The URI can be used as the source of an `<Image>` component.

## Setup

Install the package:
```
npm i exif-auto-rotate
```
or
```
yarn add exif-auto-rotate
```

## Usage

```javascript
import Rotator from 'exif-auto-rotate';

Rotator.imageFileRotator(
    file, //is the file of the new image that can now be uploaded.
    outputType  // is the output type of the new image.
    responseUriFunc,  // is the callBack function of the new image URI
    );
```
## Example 
First, wrap this resizer:
```javascript
const autoRotateFile = (file) => new Promise(resolve => {
    Rotator.imageFileRotator(file, 'base64',
    uri => {
      resolve(uri);
    }
    );
});
```

And then use it in your async function:
```javascript
const onChange = async (event) => {
  try {
    const file = event.target.files[0];
    const image = await autoRotateFile(file);
    console.log(image);
  } catch(err) {
      console.log(err);
    }
}
```

Option | Description | Type | Required
------ | ----------- | ---- | --------
`file` | Path of image file | `object` | Yes
`outputType` | Can be either base64 or blob.(Default type is base64) | `string` | No
`responseUriFunc` | Callback function of URI. Returns URI of rotated image's base64 or Blob format. ex: `uri => {console.log(uri)});` | `function` | Yes


## License

[MIT](https://opensource.org/licenses/mit-license.html)

## Contributors

Contributions of any kind welcome!