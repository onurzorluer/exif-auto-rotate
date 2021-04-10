# Exif Auto Rotate

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

[![Build Status](https://travis-ci.org/onurzorluer/exif-auto-rotate.svg?branch=master)](https://travis-ci.org/onurzorluer/exif-auto-rotate.svg?branch=master)

`exif-auto-rotate` is a module that helps you for applying the right orientation to JPEG images, based on its EXIF tag.

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

// sync
Rotator.createRotatedImage(
  file, // the file of the new image that can now be uploaded.
  outputType  // the output type of the new image.
  responseUriFunc,  // the callBack function of the new image URI
);

// async
Rotator.createRotatedImageAsync(
  file, // the file of the new image that can now be uploaded.
  outputType  // the output type of the new image.
);
```

## Examples

```javascript
// sync
Rotator.createRotatedImage(file, "base64", (uri) => {
  console.log(uri);
});

// async
try {
  const file = event.target.files[0];
  const uri = Rotator.createRotatedImageAsync(file, "base64");
  console.log(uri);
} catch (err) {
  console.log(err);
}
```

| Option            | Description                                                                                                       | Type       | Required        |
| ----------------- | ----------------------------------------------------------------------------------------------------------------- | ---------- | --------------- |
| `file`            | Path of image file                                                                                                | `object`   | Yes             |
| `outputType`      | Can be either base64 or blob.(Default type is base64)                                                             | `string`   | No              |
| `responseUriFunc` | Callback function of URI. Returns URI of rotated image's base64 or Blob format. ex: `uri => {console.log(uri)});` | `function` | Yes (sync only) |

## License

[MIT](https://opensource.org/licenses/mit-license.html)

## Contributors

Contributions of any kind welcome!

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/pabs97"><img src="https://avatars.githubusercontent.com/u/4089816?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Pablo Suarez</b></sub></a><br /><a href="#maintenance-pabs97" title="Maintenance">🚧</a> <a href="https://github.com/onurzorluer/exif-auto-rotate/commits?author=pabs97" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/StephanBijzitter"><img src="https://avatars.githubusercontent.com/u/1649903?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Stephan Bijzitter</b></sub></a><br /><a href="#maintenance-StephanBijzitter" title="Maintenance">🚧</a> <a href="https://github.com/onurzorluer/exif-auto-rotate/commits?author=StephanBijzitter" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
