import { Box, Grid } from '@mui/material';

import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import {
  DefaltInfo,
  ImageView,
} from '@components/hospitalIntro/modules/SetIntroTheme';
import {
  blobToFile,
  forinArr,
  formDataFormat,
  resizeFileCompression,
} from '@utils/file';
import useValidation from '@hooks/useValidation';
import WSubTitle from '@components/common/typography/WSubTitle';
import { DoctorInfoFilePickerLabel } from '../DoctorInfoTheme';
import { usePostPofileImg } from '@hooks/api/hospitalAdmin/doctorMgt';
import { ErrorType } from 'types/signin';
import useFileImageUpload from '@hooks/file/useFileImageUpload';
import { DoctorInfoContext } from '../contexts/DoctorInfoContext';
import { WTextError } from '@components/common/typography/WCommonText';
// import useDropDrag from '@hooks/file/useDropDrag';

export interface HospitalImgPickerType {
  modifyFile?: string[];
  keyId: string;
  setState: (info: string, medicalType: string) => void;
  setErr: (err: ErrorType, keyId: string) => void;
}

const DoctorInfoFilePicker = (props: HospitalImgPickerType) => {
  const { modifyFile, setState, keyId, setErr } = props;
  const [error, setError] = useState<string>('');
  const { imageSrc, setImageSrc } = useContext(DoctorInfoContext);
  const { mutate: MutatePostPofileImg } = usePostPofileImg();
  const valid = useValidation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { onChangeFileDragDrop, onDeleteuidList, onModifyFile, err } =
    useFileImageUpload({
      multi: false,
      imageSrc,
      setImageSrc,
    });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChangeFileLoad = async (e: ChangeEvent<HTMLInputElement> | any) => {
    const selectFile =
      e.type === 'drop' ? e.dataTransfer.files : e.target.files;
    const fileList = forinArr(selectFile);

    if (fileList.length) {
      if (valid.regExpOnlyImage.test(fileList[0].type)) {
        const form = await formDataFormat(fileList, 'file');
        MutatePostPofileImg(form, {
          onSuccess: (data) => {
            const { fileUlid } = data.data.data;
            setState(fileUlid, keyId);
            onChangeFileDragDrop(selectFile);
          },
        });
        setError('');
      } else {
        setError('Jpg, jpeg, png 형식의 파일만 첨부 할수 있습니다.');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    }
  };
  // const { dragRef, isDragging } = useDropDrag({
  //   onChangeFile: onChangeFileLoad,
  // });

  const fileDelete = (index: number) => {
    onDeleteuidList(index);
    setState('', keyId);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  useEffect(() => {
    if (modifyFile) {
      if (modifyFile.length) {
        onModifyFile(modifyFile);
      } else {
        if (setImageSrc) {
          setImageSrc([]);
        }
      }
    }
  }, [modifyFile, onModifyFile, setImageSrc]);

  return (
    <Grid container flexDirection="column">
      <WSubTitle title={'의사 프로필 사진'} titleSx={{ lineHeight: '24px' }} />
      <input
        onChange={onChangeFileLoad}
        type="file"
        id="doctorInfoFilePicker"
        style={{ display: 'none' }}
        accept=".jpg,.png,.jpeg"
        multiple={false}
        ref={fileInputRef}
      />
      <Box height="10px" />
      <Grid container gap="10px" justifyContent={'flex-start'}>
        <DoctorInfoFilePickerLabel
          // className={isDragging ? 'drag-in' : 'drag-out'}
          // ref={dragRef}
          htmlFor="doctorInfoFilePicker"
        >
          <DefaltInfo />
        </DoctorInfoFilePickerLabel>
        {imageSrc.map((img, inx) => {
          return (
            <ImageView
              key={inx}
              inx={inx}
              img={img}
              deleteImg={fileDelete}
              sx={{
                width: '196px',
                height: '196px',
                '& .wimageBox': {
                  width: '196px',
                  height: '196px',
                },
              }}
            />
          );
        })}
      </Grid>
      <Box height="5px" />
      <WTextError color={'#FC5935'} sx={{ paddingTop: '8px', height: '16px' }}>
        {imageSrc.length
          ? error
            ? error
            : ''
          : '의사 프로필 사진을 1개는 필수로 등록해 주세요.'}
      </WTextError>
    </Grid>
  );
};

export default DoctorInfoFilePicker;
