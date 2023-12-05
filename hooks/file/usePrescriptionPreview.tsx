import { apiPrescriptionFileBase } from '@hooks/api/hospitalDoctor/prescription';
import useCodeMsgBundle from '@hooks/api/useCodeMsgBundle';
import { useToastContext } from '@hooks/useToastContext';
import { blobToFile, dataURItoFile } from '@utils/file';
import { useDebounceFn } from 'ahooks';
import { useCallback, useEffect, useState } from 'react';

const usePrescriptionPreview = (props: {
  registrationUlid?: string;
  fileInfoUlid?: string;
  handleClose: () => void;
}) => {
  const [fileArr, setFileArr] = useState<File[]>([]);
  const from =
    typeof window === 'undefined' ? undefined : new window.FormData();
  const [fileForm, setFileForm] = useState<FormData | undefined>(from);
  const toast = useToastContext();
  const msg = useCodeMsgBundle();
  const reset = useCallback(() => {
    setFileArr([]);
    setFileForm(undefined);
  }, []);

  const onFileForm = useCallback(async (fileList: File[]) => {
    if (fileList.length) {
      const form = new FormData();
      const item = fileList[0];
      const imgName = item.name;
      const img = blobToFile(item, imgName);
      form.append('file', img);
      setFileForm(form);
    }
  }, []);

  const onImagePreview = async (
    registrationUlid: string,
    fileInfoUlid: string,
  ) => {
    let arr: File[] = [];

    await apiPrescriptionFileBase({ registrationUlid, fileInfoUlid })
      .then(async (data) => {
        const code = data.data.code;
        if (code !== '0000') {
          toast?.on(msg.errMsg(code), 'error');
          props.handleClose();
          return;
        } else {
          const res = data.data.data;
          const file = dataURItoFile(res, '처방전');
          arr.push(file);
        }
      })
      .catch((res) => {
        toast?.on(
          `처방전 조회에 실패 하셨습니다. \n 잠시후 다시 시도하세요.`,
          'error',
        );
      });
    if (arr.length) {
      setFileArr(arr);
      onFileForm(arr);
    }
  };
  const onDebounceImagePreview = useDebounceFn(onImagePreview, {
    wait: 300,
  });
  useEffect(() => {
    if (props.fileInfoUlid) {
      if (props.registrationUlid) {
        onDebounceImagePreview.run(props.registrationUlid, props.fileInfoUlid);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.fileInfoUlid, props.registrationUlid]);

  return { fileArr, fileForm, reset };
};

export default usePrescriptionPreview;
