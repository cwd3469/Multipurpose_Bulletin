import { Box, Grid, Typography } from '@mui/material';
import { ChangeEvent, useContext, useEffect, useRef } from 'react';
import { DefaltInfo, HospitalIntroFileLadel, ImageView } from '../modules/SetIntroTheme';
import { FileUid } from '../type';
import { usePostHospitalImgList } from '@hooks/api/hospitalAdmin/hospitalIntro';
import { blobToFile, forinArr, resizeFileCompression } from '@utils/file';
import { HospitalInfoMultiContext } from '../contexts/HospitalInfoMultiContext';
import useFileImageUpload from '@hooks/file/useFileImageUpload';
// import useDropDrag from '@hooks/file/useDropDrag';

export interface SetIntroImgPickerType {
  modifyFile?: string[];
  onDeleteLogoUid: (sort: number) => void;
  onUploadFile: (uidList: FileUid[]) => void;
}

const SetIntroImgMultiPicker = (props: SetIntroImgPickerType) => {
  const { modifyFile, onDeleteLogoUid, onUploadFile } = props;
  const { imageSrc, setImageSrc } = useContext(HospitalInfoMultiContext);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const limit = 5;
  const { mutate: postImgListMutate } = usePostHospitalImgList();
  const { onChangeFileDragDrop, onDeleteuidList, onModifyFile, err } = useFileImageUpload({
    multi: true,
    limit: limit,
    imageSrc,
    setImageSrc,
  });

  const onDeleteFileList = (index: number, sort: number) => {
    onDeleteuidList(sort);
    onDeleteLogoUid(sort);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChangeFileLoad = async (e: ChangeEvent<HTMLInputElement> | any) => {
    const selectFile = e.type === 'drop' ? e.dataTransfer.files : e.target.files;
    const fileList = forinArr(selectFile);
    if (fileList.length) {
      let formData = new FormData();
      for (let i = 0; i < fileList.length; i++) {
        if (i < limit) {
          const item = fileList[i];
          const imgName = item.name;
          const img = blobToFile(item, imgName);
          const file = img.size < 1000000 ? img : await resizeFileCompression(img);
          formData.append('files', file);
        }
      }
      postImgListMutate(formData, {
        onSuccess: (res) => {
          const dataList = res.data.data;
          const ulidList: FileUid[] = dataList.map((item: { fileUlid: string }, index: number) => {
            return { fileUlid: item.fileUlid, sort: index + 1 };
          });
          onUploadFile(ulidList);
          onChangeFileDragDrop(selectFile);
        },
      });
    }
  };

  // const { dragRef, isDragging } = useDropDrag({
  //   onChangeFile: onChangeFileLoad,
  // });

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
      <Grid container alignItems="center" gap="10px">
        <Typography variant="subtitle2" lineHeight="1.5">
          - 소개 이미지
        </Typography>
        <Typography variant="caption" color="#999" lineHeight="1">
          - 소개 이미지는 최대 5장까지 등록 가능합니다.
        </Typography>
      </Grid>
      <input
        ref={fileInputRef}
        onChange={onChangeFileLoad}
        type="file"
        id={'setIntroImgMultiPicker'}
        style={{ display: 'none' }}
        accept=".jpg,.png"
        multiple={true}
      />
      <Box height="10px" />
      <Grid container gap="10px" justifyContent={'flex-start'}>
        <HospitalIntroFileLadel
          // className={isDragging ? 'drag-in' : 'drag-out'}
          // ref={dragRef}
          htmlFor={'setIntroImgMultiPicker'}
        >
          <DefaltInfo />
        </HospitalIntroFileLadel>
        {modifyFile ? (
          imageSrc.map((img, inx) => {
            return (
              <ImageView
                key={inx}
                inx={inx}
                img={img}
                deleteImg={(number) => onDeleteFileList(number, inx)}
              />
            );
          })
        ) : (
          <></>
        )}
      </Grid>

      <Box height="5px" />
      <Box width="100%" height="12px">
        <Typography color="red" lineHeight="1">
          {err.boo ? err.msg : ''}
        </Typography>
      </Box>
    </Grid>
  );
};

export default SetIntroImgMultiPicker;
