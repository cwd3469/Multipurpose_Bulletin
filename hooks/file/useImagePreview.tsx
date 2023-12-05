import { DocumentsType, DownloadPreView } from '@components/common/modal/WDetailModal';
import { apiImageEncode } from '@hooks/api/hospitalDoctor/doctorReception';
import { useDebounceEffect } from 'ahooks';
import { useCallback, useState } from 'react';

const useImagePreview = (props: { imgList?: DocumentsType[] }) => {
  const [fileArr, setFileArr] = useState<DownloadPreView[]>([]);

  // Encoding UTF8 ⇢ base64
  function b64EncodeUnicode(str: string) {
    return btoa(
      encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
        return String.fromCharCode(parseInt(p1, 16));
      }),
    );
  }

  // Decoding base64 ⇢ UTF8
  function b64DecodeUnicode(str: string) {
    return decodeURIComponent(
      Array.prototype.map
        .call(atob(str), function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(''),
    );
  }

  const onImagePreview = useCallback(async (uildList: DocumentsType[]) => {
    let fileArr: DownloadPreView[] = [];
    if (typeof window !== 'undefined') {
      for (let i = 0; i < uildList.length; i++) {
        const item = uildList[i];
        await apiImageEncode(item.fileUlid).then((data) => {
          const res: string = data.data.data;
          const decode = b64DecodeUnicode(res);
          const fileContent = {
            url: decode,
            name: item.fileOriginalName,
          };
          fileArr.push(fileContent);
        });
      }
    }
    return fileArr;
  }, []);

  useDebounceEffect(
    () => {
      if (!props.imgList) return;
      onImagePreview(props.imgList).then((res) => {
        setFileArr(res);
      });
    },
    [],
    {
      wait: 200,
    },
  );

  return { fileArr };
};

export default useImagePreview;
