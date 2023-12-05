import Image from 'next/image';
import { Box, Grid, Stack, Typography, styled } from '@mui/material';
import useMultiFileUpload from '@components/common/fileUpload/useMultiFileUpload';
import { WMultiDragDrop } from '@components/common/fileUpload/types';
import WaitingRoomPdfView from '../modules/WaitingRoomPdfView';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { forinArr, formDataFormat } from '@utils/file';
import WSubTitle from '@components/common/typography/WSubTitle';
import CircularProgress from '@mui/material/CircularProgress';

interface ExpensesFilePickerType extends WMultiDragDrop {
  defaultfile?: File | Promise<File | undefined> | null;
  setInFileData?: (fileDataForm: FormData, file?: File) => void;
  prescriptionUlid?: string;
}

const ExpensesFilePicker = (props: ExpensesFilePickerType) => {
  const { target, defaultfile, setInFileData, prescriptionUlid } = props;
  const [cycle, setCycle] = useState<boolean>(false);
  const { onChangeFile, dragRef, isDragging, imageSrc, files, err, onFile } =
    useMultiFileUpload(props);

  const onInChangeFile = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (e: ChangeEvent<HTMLInputElement> | any) => {
      if (setInFileData) {
        const selectFile =
          e.type === 'drop' ? e.dataTransfer.files : e.target.files;
        const fileList: File[] = forinArr(selectFile);
        await formDataFormat(fileList, 'file').then((res) => {
          setInFileData(res, fileList[0]);
        });
      }
      onChangeFile(e);
    },
    [onChangeFile, setInFileData],
  );

  const isFileUpload = files.length;

  useEffect(() => {
    if (prescriptionUlid) {
      setCycle(true);
    }
  }, [prescriptionUlid]);

  useEffect(() => {
    const defaultfileOn = async () => {
      if (defaultfile !== null) {
        setCycle(false);
        const dataFile = await defaultfile;
        if (typeof dataFile !== 'undefined') {
          onFile(dataFile);
        }
      }
    };

    defaultfileOn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultfile]);

  return (
    <Stack gap={isFileUpload ? '16px' : '0px'}>
      <input
        onChange={onInChangeFile}
        type="file"
        id={target}
        style={{ display: 'none' }}
        accept=".pdf,.jpg,.png"
      />

      {cycle ? (
        <Grid container width="100%" justifyContent="center">
          <CircularProgress size={50} />
        </Grid>
      ) : (
        <>
          <Grid
            container
            className={isFileUpload ? 'modify' : 'registration'}
            sx={{
              '&.modify': {
                justifyContent: 'space-between',
              },
              '&.registration': {
                alignItems: 'center',
                flexDirection: 'column',
                gap: '16px',
              },
            }}
          >
            <WSubTitle
              title="처방전 첨부"
              require
              subTitle="버튼을 클릭해 주세요"
              sx={{ width: isFileUpload ? 'auto' : '100%' }}
            />
            <FileLadelButton
              className={isDragging ? 'drag-in' : 'drag-out'}
              ref={dragRef}
              htmlFor={target}
              style={{ width: '154px' }}
            >
              <Image
                src={'/assets/icons/uploadBold.svg'}
                alt="업로드"
                width={18}
                height={18}
              />
              <Typography className="button-text">
                {isFileUpload ? '파일 변경하기' : '파일 첨부하기'}
              </Typography>
            </FileLadelButton>
          </Grid>

          {isFileUpload ? (
            <>
              <Grid
                container
                sx={{
                  width: '720px',
                  height: '444px',
                  overflowY: 'scroll',
                  justifyContent: 'center',
                  backgroundColor: '#f8f8f8',
                  padding: '45px 10px',
                  borderRadius: '12px',
                }}
              >
                {files[0].type === 'application/pdf' ? (
                  <WaitingRoomPdfView pdf={files[0]} />
                ) : (
                  <Box
                    width="580px"
                    height="auto"
                    minHeight={'800px'}
                    position="relative"
                  >
                    <Image
                      src={imageSrc[0]?.url}
                      alt="처방전"
                      layout="fill"
                      objectFit="contain"
                    />
                  </Box>
                )}
              </Grid>
            </>
          ) : (
            ''
          )}
        </>
      )}

      <Stack gap={'10px'} justifyContent={'center'} alignItems="center">
        {err.boo ? (
          <Box width="420px">
            <Typography color="red" lineHeight="1.4" align="left">
              {err.msg}
            </Typography>
          </Box>
        ) : (
          ''
        )}
      </Stack>
    </Stack>
  );
};
const FileLadel = styled('label')`
  width: 420px;
  height: 100px;
  border-radius: 2px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  text-align: center;
  flex-direction: column;
  gap: 10px;
  &.drag-in {
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='black' stroke-width='1' stroke-dasharray='6%2c 5' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
  }
  &.drag-out {
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='black' stroke-width='1' stroke-dasharray='6%2c 5' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
  }
`;
export const FileLadelButton = styled('label')(({ theme }) => ({
  border: '1px solid #dbdbdb',
  padding: '12px 19px',
  borderRadius: '6px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px',
  cursor: 'pointer',
  '& .button-text': {
    ...theme.typography.body1,
    color: '#333',
    lineHeight: '1',
    letterSpacing: '-0.5px',
  },
}));

export default ExpensesFilePicker;
