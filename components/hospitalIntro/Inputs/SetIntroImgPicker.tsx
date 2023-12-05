import { Box, Grid, Typography } from '@mui/material';
import { useContext, useEffect, useRef } from 'react';
import { DefaltInfo, HospitalIntroFileLadel, ImageView } from '../modules/SetIntroTheme';
import { blobToFile, forinArr, resizeFileCompression } from '@utils/file';
import { usePostHospitalImage } from '@hooks/api/hospitalAdmin/hospitalIntro';
import { FileUid } from '../type';
import useFileImageUpload from '@hooks/file/useFileImageUpload';
import { HospitalInfoContext } from '../contexts/HospitalInfoContext';
// import useDropDrag from '@hooks/file/useDropDrag';

export interface HospitalImgPickerType {
  modifyFile?: string[];
  onDeleteLogoUid: () => void;
  onUploadFile: (uid: FileUid) => void;
}

const SetIntroImgPicker = (props: HospitalImgPickerType) => {
  const { modifyFile, onDeleteLogoUid, onUploadFile } = props;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { imageSrc, setImageSrc } = useContext(HospitalInfoContext);
  const { mutate: postImgMutate } = usePostHospitalImage();
  const { onChangeFileDragDrop, onDeleteuidList, onModifyFile, err } = useFileImageUpload({
    multi: false,
    imageSrc,
    setImageSrc,
  });

  const fileDelete = (index: number) => {
    onDeleteuidList(index);
    onDeleteLogoUid();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChangeFileLoad = async (e: any) => {
    const info = e;
    const selectFile = info.type === 'drop' ? info.dataTransfer.files : info.target.files;
    const fileList = forinArr(selectFile);
    if (fileList.length) {
      const imgName = fileList[0].name;
      const item = fileList[0];
      const img = blobToFile(item, imgName);
      const file = img.size < 1000000 ? img : await resizeFileCompression(img);
      const formData = new FormData();
      formData.append('file', file);
      postImgMutate(formData, {
        onSuccess: (data) => {
          const { fileUlid } = data.data.data;
          const uid = { fileUlid: fileUlid, sort: 0 };
          onUploadFile(uid);
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
          - 로고 이미지
        </Typography>
      </Grid>
      <input
        onChange={onChangeFileLoad}
        type="file"
        id="setIntroImgPicker"
        style={{ display: 'none' }}
        accept=".jpg,.png"
        multiple={false}
        ref={fileInputRef}
      />
      <Box height="10px" />
      <Grid container gap="10px" justifyContent={'flex-start'}>
        <HospitalIntroFileLadel
          // className={isDragging ? 'drag-in' : 'drag-out'}
          // ref={dragRef}
          htmlFor="setIntroImgPicker"
        >
          <DefaltInfo />
        </HospitalIntroFileLadel>
        {imageSrc.length ? (
          imageSrc.map((img, inx) => {
            return <ImageView key={inx} inx={inx} img={img} deleteImg={fileDelete} />;
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

export default SetIntroImgPicker;
