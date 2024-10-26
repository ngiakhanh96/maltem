import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  convertFileToByteArray(selectedFile?: File | null): Promise<number[]> {
    return new Promise((resolve, reject) => {
      var fileByteArray: number[] = [];
      if (selectedFile == null) {
        return resolve(fileByteArray);
      }
      var reader = new FileReader();
      reader.onloadend = function (evt) {
        if (evt.target!.readyState == FileReader.DONE) {
          const array = new Uint8Array(evt.target!.result as ArrayBufferLike);
          for (var i = 0; i < array.length; i++) {
            fileByteArray.push(array[i]);
          }
          resolve(fileByteArray);
        }
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(selectedFile);
    });
  }

  convertByteArrayToImageSource(logo: number[]) {
    return (
      'data:image/png;base64,' +
      btoa(
        logo
          .map((byte) => {
            return String.fromCharCode(byte);
          })
          .join('')
      )
    );
  }
}
