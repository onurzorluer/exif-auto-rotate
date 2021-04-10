/** 
*
* @author Onur Zorluer
*
**/

function throwError(msg) {
    throw Error(msg);
}
class Rotator {

    static rotateImage(image, srcOrientation) {
        var width = image.width,
        height = image.height,
        canvas = document.createElement('canvas'),
        ctx = canvas.getContext("2d");

        // set proper canvas dimensions before transform & export
        canvas.width = width;
        canvas.height = height;

        // transform context before drawing image
        switch (srcOrientation) {
            case 2: ctx.transform(-1, 0, 0, 1, width, 0); ctx.translate(width, 0); ctx.scale(-1, 1); break;
            case 3: ctx.transform(-1, 0, 0, -1, width, height ); ctx.translate(width, height); ctx.rotate(Math.PI); break;
            case 4: ctx.transform(1, 0, 0, -1, 0, height ); ctx.translate(0, height); ctx.scale(1, -1); break;
            case 5: ctx.transform(0, 1, 1, 0, 0, 0); ctx.rotate(-0.5 * Math.PI); ctx.scale(-1, 1); break;
            case 6: ctx.transform(0, 1, -1, 0, width , 0); ctx.rotate(-0.5 * Math.PI); ctx.translate(-width, 0); break;
            case 7: ctx.transform(0, -1, -1, 0, width , height); ctx.rotate(-0.5 * Math.PI); ctx.translate(-width, height); ctx.scale(1, -1); break;
            case 8: ctx.transform(0, -1, 1, 0, 0, height); ctx.rotate(0.5 * Math.PI); ctx.translate(0, -height); break;
            default: break;
        }
		// draw image
        ctx.drawImage(image, 0, 0, width, height); 
        var finalImage = canvas.toDataURL(`image/${'JPEG'}`, 100);
		// export base64
		return finalImage;
    }

    static b64toBlob(b64Data) {
        var contentType = 'image/jpeg';
        var sliceSize = 512;
    
        var byteCharacters = atob(b64Data.toString().replace(/^data:image\/(jpeg|jpg);base64,/, ''));
        var byteArrays = [];
    
        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);
    
            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
    
            var byteArray = new Uint8Array(byteNumbers);
    
            byteArrays.push(byteArray);
        }
    
        var blob = new Blob(byteArrays, {type: contentType});
        return blob;
    }

    static getOrientation(file, callback) {
        var reader = new FileReader();
      
        reader.onload = function(event) {
          var view = new DataView(event.target.result);
      
          if (view.getUint16(0, false) != 0xFFD8) return callback(-2);
      
          var length = view.byteLength,
              offset = 2;
      
          while (offset < length) {
            var marker = view.getUint16(offset, false);
            offset += 2;
      
            if (marker == 0xFFE1) {
              if (view.getUint32(offset += 2, false) != 0x45786966) {
                return callback(-1);
              }
              var little = view.getUint16(offset += 6, false) == 0x4949;
              offset += view.getUint32(offset + 4, little);
              var tags = view.getUint16(offset, little);
              offset += 2;
      
              for (var i = 0; i < tags; i++)
                if (view.getUint16(offset + (i * 12), little) == 0x0112)
                  return callback(view.getUint16(offset + (i * 12) + 8, little));
            }
            else if ((marker & 0xFF00) != 0xFF00) break;
            else offset += view.getUint16(offset, false);
          }
          return callback(-1);
        };
      
        reader.readAsArrayBuffer(file.slice(0, 64 * 1024));
      };



    static createRotatedImage(file, outputType = 'base64', responseUriFunc, errorHandler = throwError) {
        var blob = null
        var rotatedDataUrl = null
        const reader = new FileReader();
        if(file) {
            if(file.type && !file.type.includes("image")) {
                errorHandler("File Is NOT Image");
              } else {           
                reader.readAsDataURL(file);
                reader.onload = () => {
                    var image = new Image();
                    image.src = reader.result;
                    image.onload = function () {
                        Rotator.getOrientation(file, function (orientation) {
                            rotatorFunction(orientation, image);
                        });
                    }; 
                function rotatorFunction(imageOrientation, image) {
                    if(imageOrientation == -2) {
                        errorHandler("Image is NOT JPEG");
                    } else if(imageOrientation == -1) {
                        errorHandler("Image is NOT have a exif code");
                    }
                    rotatedDataUrl = Rotator.rotateImage(image, imageOrientation);
                    blob = Rotator.b64toBlob(rotatedDataUrl);
                    outputType === 'blob' ?
                        responseUriFunc(blob)
                        :
                        responseUriFunc(rotatedDataUrl)
                    }   
                };
                reader.onerror = error => {
                    errorHandler(error);
                }; 
            }
        } else {
            errorHandler("File Not Found!");
          }
    }

    static createRotatedImageAsync(file, outputType = 'base64') {
        return new Promise((resolve, reject) => {
            Rotator.createRotatedImage(file, outputType, resolve, reject);
        });
    }
}   

export default {
    createRotatedImage: (file, outputType, responseUriFunc) => {
        return Rotator.createRotatedImage(file, outputType, responseUriFunc)
    },
    createRotatedImageAsync: (file, outputType) => {
        return Rotator.createRotatedImageAsync(file, outputType);
    }
}
