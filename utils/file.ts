/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { FileDto, FileUid } from '@components/hospitalIntro/type';
import { Validation } from '@hooks/useValidation';
import imageCompression from 'browser-image-compression';

export function blobToFile(theBlob: Blob, fileName: string) {
  return new File([theBlob], fileName, {
    type: theBlob.type,
  });
}
// image 파일 만들기
export const convertURLtoFile = async (url: string) => {
  if (typeof window !== 'undefined') {
    const response = await fetch(url);
    const data = await response.blob();
    const ext = url.split('.').pop();
    const filename = url.split('/').pop();
    const metadata = { type: `image/${ext}` };
    const file = new File([data], filename!, metadata);
    return file;
  }
};

export const dataURItoFile = (dataURI: string, name: string) => {
  const decode = decodeURIComponent(window.atob(dataURI));
  const mime = decode.charAt(0);
  const extens = fileExtension(mime);
  const bstr = window.atob(decode);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  const file = new File(
    [u8arr],
    `${name}.${extens === 'application/pdf' ? 'pdf' : extens}`,
    {
      type: extens,
    },
  );
  return file;
};
export const forinArr = (obj: any) => {
  let arr = [];
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const element = obj[key];
      arr.push(element);
    }
  }
  return arr;
};
export const forinKeyArr = (obj: any) => {
  let arr = [];
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const element = key;
      arr.push(element);
    }
  }
  return arr;
};

export const resizeFileCompression = async (file: File) => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 400,
  };

  return await imageCompression(file, options);
};

export const formDataFormat = async (fileList: File[], name: string) => {
  const valid = new Validation();
  let formData = new FormData();
  for (let i = 0; i < fileList.length; i++) {
    const item = fileList[i];
    const imgName = item.name;
    const regBoo = valid.regExpFile.test(item.type);
    let resizeFile =
      item.size < 1000000
        ? item
        : regBoo
        ? item
        : await resizeFileCompression(item);
    const img = blobToFile(resizeFile, imgName);
    formData.append(name, img);
  }

  return formData;
};

export const fileExtension = (first: string) => {
  switch (first) {
    case '/':
      return 'jpg';
    case 'i':
      return 'png';
    case 'R':
      return 'gif';
    case 'U':
      return 'webp';
    default:
      return 'application/pdf';
  }
};
