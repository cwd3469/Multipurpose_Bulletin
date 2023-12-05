/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import useValidation from '../useValidation';
import { ErrorType } from '../../types/signin';
import { UidList } from '@components/common/fileUpload/types';

export interface UseMultiFileUpload {
  multi: boolean;
  limit?: number;
  imageSrc: UidList[];
  setImageSrc: Dispatch<SetStateAction<UidList[]>> | undefined;
}

const useFileImageUpload = (props: UseMultiFileUpload) => {
  const { multi, limit, imageSrc, setImageSrc } = props;
  const validation = useValidation();

  const [err, setErr] = useState<ErrorType>({ msg: '', boo: false });
  const errorMsgOn = (msg: string) => {
    setErr({ msg, boo: true });
  };
  // url to File
  const onURLtoFile = async (url: string) => {
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
  /**파일 삭제 */
  const onDeleteuidList = (number: number) => {
    if (imageSrc.length === 1) {
      if (setImageSrc) setImageSrc([]);
      return;
    }
    const newList = imageSrc.filter((item, index) => {
      return index !== number;
    });
    if (setImageSrc) setImageSrc(newList);
  };
  /**파일 업로드 */
  const onChangeFileDragDrop = useCallback(
    (file: FileList, callback?: () => void) => {
      const selectFile = file;
      if (selectFile) {
        let temp: UidList[] = [];
        [].forEach.call(selectFile, async function (file: File, index: number) {
          if (validation.regExpImage.test(file.type)) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              const csv: string = reader.result as string;
              const objectURL = URL.createObjectURL(file);
              const fileObj = {
                id: file.name,
                src: csv,
                index: file.lastModified,
                type: file.type,
                url: objectURL,
              };
              if (multi) {
                temp.push(fileObj);
                return;
              } else {
                temp = [fileObj];
                return;
              }
            };
            reader.onloadend = () => {
              if (setImageSrc) {
                const arr = [...imageSrc, ...temp];
                const slice = arr.slice(-5);
                if (multi) {
                  if (limit) {
                    if (arr.length <= limit) {
                      setImageSrc(arr);
                    } else {
                      setImageSrc(slice);
                    }
                  }
                } else {
                  setImageSrc(temp);
                }
                if (callback) callback();
              }
              setErr({ msg: '', boo: true });
            };
          } else {
            errorMsgOn('첨부파일은 pdf, jpg, png로 된 이미지만 가능합니다.');
            return;
          }
        });
      }
    },
    [imageSrc, limit, multi, setImageSrc, validation.regExpImage],
  );
  /**파일 새로 받기 */
  const onModifyFile = useCallback(
    async (modifyFile: string[], callback?: () => void) => {
      if (modifyFile.length) {
        let list: UidList[] = [];
        for (let i = 0; i < modifyFile.length; i++) {
          const file = await onURLtoFile(modifyFile[i]);
          if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              const objectURL = URL.createObjectURL(file);
              const csv: string = reader.result as string;
              let fileObj: UidList = {
                id: file.name,
                src: csv,
                index: file.lastModified,
                type: file.type,
                url: objectURL,
              };
              list.push(fileObj);
              setErr({ msg: '', boo: true });
              return;
            };
          }
          if (i === modifyFile.length - 1) {
            if (callback) {
              callback();
            }
          }
        }
        if (setImageSrc) setImageSrc(list);
      } else {
        if (setImageSrc) {
          setImageSrc([]);
        }
        if (callback) {
          callback();
        }
      }
    },
    [setImageSrc],
  );

  useEffect(() => {
    return () => {
      if (setImageSrc) setImageSrc([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    onChangeFileDragDrop,
    onDeleteuidList,
    onModifyFile,
    err,
  };
};

export default useFileImageUpload;
