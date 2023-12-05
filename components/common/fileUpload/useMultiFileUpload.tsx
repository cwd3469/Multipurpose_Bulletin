/* eslint-disable @typescript-eslint/no-explicit-any */
import { resizeFileCompression } from '@utils/file';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import useValidation from '../../../hooks/useValidation';
import { ErrorType } from '../../../types/signin';
import { UidList, WMultiDragDrop } from './types';

const useMultiFileUpload = (props: WMultiDragDrop) => {
  const { files, setFileList, fileUpLoad, multi, limit } = props;
  const validation = useValidation();
  const dragRef = useRef<HTMLLabelElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<UidList[]>([]);
  const [err, setErr] = useState<ErrorType>({ msg: '', boo: false });
  const errorMsgOn = (msg: string) => {
    setErr({ msg, boo: true });
  };
  const deleteImg = (number: number) => {
    const newList = imageSrc.filter((x) => {
      return x.index !== number;
    });
    setImageSrc(newList);
  };

  const deleteFile = (number: number) => {
    const fileList = files.filter((x) => {
      return x.lastModified !== number;
    });
    if (setFileList) setFileList(fileList);
  };
  const { regExpFile, regExpImage } = validation;

  const onFilePreview = useCallback(
    (file: File[]) => {
      if (file.length) {
        let temp = file.map((item, index) => {
          const reader = new FileReader();
          const objectURL = URL.createObjectURL(item);
          const csv: string = reader.result as string;
          const itemObj = {
            id: item.name,
            src: csv,
            index: item.lastModified,
            type: item.type,
            url: objectURL,
          };
          return itemObj;
        });
        setImageSrc(temp);
        if (setFileList) setFileList(file);
      }
    },
    [setFileList],
  );

  const onFile = (file: File) => {
    let temp = [...imageSrc];
    let fileList = [...files];

    const reader = new FileReader();
    reader.onload = () => {
      const objectURL = URL.createObjectURL(file);
      const csv: string = reader.result as string;
      const fileObj = {
        id: file.name,
        src: csv,
        index: file.lastModified,
        type: file.type,
        url: objectURL,
      };
      temp = [fileObj];
      fileList = [file];
      return temp;
    };
    reader.onloadend = () => {
      setImageSrc(temp);
      if (setFileList) setFileList(fileList);
      fileUpLoad(fileList, temp);
      setErr({ msg: '', boo: true });
    };
    reader.readAsDataURL(file);
  };

  const onChangeFile = useCallback(
    (e: ChangeEvent<HTMLInputElement> | any) => {
      const selectFile =
        e.type === 'drop' ? e.dataTransfer.files : e.target.files;
      if (selectFile) {
        let temp: UidList[] = [];
        let fileList: File[] = [];
        [].forEach.call(selectFile, async function (file: File, index: number) {
          if (regExpImage.test(file.type)) {
            const reader = new FileReader();
            const imageImg =
              file.type === 'application/pdf'
                ? file
                : file.size < 1000000
                ? file
                : await resizeFileCompression(file);
            reader.readAsDataURL(imageImg);
            reader.onload = async () => {
              const csv: string = reader.result as string;
              const objectURL = URL.createObjectURL(imageImg);
              const fileObj = {
                id: imageImg.name,
                src: csv,
                index: imageImg.lastModified,
                type: imageImg.type,
                url: objectURL,
              };
              if (multi) {
                temp.push(fileObj);
                fileList.push(imageImg);
                return;
              } else {
                temp = [fileObj];
                fileList = [imageImg];
                return;
              }
            };
            reader.onloadend = () => {
              if (setImageSrc) {
                const arr = [...imageSrc, ...temp];
                const fileArr = [...files, ...fileList];
                if (multi) {
                  if (limit) {
                    if (arr.length <= limit) {
                      setImageSrc(arr);
                      fileUpLoad(fileArr, arr, selectFile.length);
                      if (setFileList) setFileList(fileArr);
                    } else {
                      const fileSlice = fileArr.slice(-limit);
                      const slice = arr.slice(-limit);
                      setImageSrc(slice);
                      fileUpLoad(fileSlice, slice, selectFile.length);
                      if (setFileList) setFileList(fileSlice);
                    }
                  }
                } else {
                  setImageSrc(temp);
                  fileUpLoad(fileList, temp, selectFile.length);
                  if (setFileList) setFileList(fileList);
                }
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
    [fileUpLoad, files, imageSrc, limit, multi, regExpImage, setFileList],
  );

  useEffect(() => {
    return () => {
      setImageSrc([]);
      setErr({ msg: '', boo: false });
    };
  }, []);

  // const handleDragIn = useCallback((e: DragEvent): void => {
  //   e.preventDefault();
  //   e.stopPropagation();
  // }, []);
  // const handleDragOut = useCallback((e: DragEvent): void => {
  //   e.preventDefault();
  //   e.stopPropagation();

  //   setIsDragging(false);
  // }, []);

  // const handleDragOver = useCallback((e: DragEvent): void => {
  //   e.preventDefault();
  //   e.stopPropagation();

  //   if (e.dataTransfer?.files) {
  //     setIsDragging(true);
  //   }
  // }, []);
  // const handleDrop = useCallback(
  //   (e: DragEvent): void => {
  //     e.preventDefault();
  //     e.stopPropagation();

  //     onChangeFile(e);
  //     setIsDragging(false);
  //   },
  //   [onChangeFile],
  // );

  // const initDragEvents = useCallback((): void => {
  //   if (dragRef.current !== null) {
  //     dragRef.current.addEventListener('dragenter', handleDragIn);
  //     dragRef.current.addEventListener('dragleave', handleDragOut);
  //     dragRef.current.addEventListener('dragover', handleDragOver);
  //     dragRef.current.addEventListener('drop', handleDrop);
  //   }
  // }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  // const resetDragEvents = useCallback((): void => {
  //   if (dragRef.current !== null) {
  //     dragRef.current.removeEventListener('dragenter', handleDragIn);
  //     dragRef.current.removeEventListener('dragleave', handleDragOut);
  //     dragRef.current.removeEventListener('dragover', handleDragOver);
  //     dragRef.current.removeEventListener('drop', handleDrop);
  //   }
  // }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  // useEffect(() => {
  //   initDragEvents();
  //   return () => resetDragEvents();
  // }, [files, initDragEvents, resetDragEvents]);

  return {
    onChangeFile,
    onFilePreview,
    dragRef,
    isDragging,
    imageSrc,
    files,
    err,
    deleteImg,
    deleteFile,
    onFile,
  };
};

export default useMultiFileUpload;
