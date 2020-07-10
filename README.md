# React Exif Auto Rotate

[![Build Status](https://travis-ci.org/onurzorluer/exif-auto-rotate.svg?branch=master)](https://travis-ci.org/onurzorluer/exif-auto-rotate.svg?branch=master)

`exif-auto-rotate` is a module that rerotate local images.

- It resets orientation of image. It returns of new image's base64 URI or Blob.
- The URI can be used as the source of an <Image> component.

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

```javascript
import React, { Component } from 'react';
import Rotator from 'exif-auto-rotate';

class App extends Component {
    constructor(props) {
        super(props);
        this.fileChangedHandler = this.fileChangedHandler.bind(this);
    }

    fileChangedHandler(event) {
        var fileInput = false
        if(event.target.files[0]) {
            fileInput = true
        }
        if(fileInput) {
            Rotator.imageFileRotator(
                event.target.files[0],
                'base64',
                uri => {
                    console.log(uri)
                },
            );
        }
    }

    render() {
        return (
            <div className="App">
                <input type="file" onChange={this.fileChangedHandler}/>
            </div>
        );
    }
}

export default App;
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
