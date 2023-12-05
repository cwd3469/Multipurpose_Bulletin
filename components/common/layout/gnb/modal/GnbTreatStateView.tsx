import React from 'react';
import WConfirmModal from '@components/common/modal/WConfirmModal';
import { Box, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { GnbTreatStateMobalType } from '../types';
import GnbTreatSetModal from './GnbTreatSetModal';
import { useDebounceFn } from 'ahooks';

interface GnbTreatStateViewType extends GnbTreatStateMobalType {
  setting: boolean;
  onClickExtensionOpen: () => void;
  onClickExtensionClose: () => void;
  setSetting?: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  contentsText?: JSX.Element;
  nameKo: string;
  setRouter: string;
}

const GnbTreatStateView = (props: GnbTreatStateViewType) => {
  const onDebounceFnHandleClose = useDebounceFn(props.onClickExtensionClose, {
    wait: 300,
  });
  const onDebounceFnHandleOpen = useDebounceFn(props.onClickExtensionOpen, {
    wait: 300,
  });
  return (
    <WConfirmModal
      open={props.open}
      bgDisable={props.setting}
      handleClose={props.handleClose}
      title={props.title ? props.title : '진료 접수 상태 변경'}
      btnTitle={props.status ? '접수 마감' : '접수 시작'}
      handleEvent={
        props.status ? onDebounceFnHandleClose.run : onDebounceFnHandleOpen.run
      }
      maxWidth="lg"
      activeOn
    >
      {props.open ? (
        <Stack width="420px" paddingTop="10px" gap="24px">
          {props.status ? (
            <>
              <Image
                src={'/assets/icons/processStatusClose.svg'}
                alt="접수 마감 아이콘"
                width="55px"
                height="55px"
              />
              <Stack justifyContent="center" alignItems="center" gap="6px">
                <Typography
                  color="#666"
                  textAlign="center"
                  fontSize="22px"
                  sx={{
                    '& .bold': {
                      fontWeight: 'bold',
                    },
                  }}
                >
                  {props.contentsText ? (
                    props.contentsText
                  ) : (
                    <>
                      <span className="bold">마감</span>하시겠습니까?
                    </>
                  )}
                </Typography>
                <Typography color="#ff5953" textAlign="center" fontSize="20px">
                  수락하지 않은 접수 건은 자동으로 취소됩니다.
                </Typography>
              </Stack>
              <Box height="50px" />
            </>
          ) : (
            <>
              <Image
                src={'/assets/icons/processStatusCheck.svg'}
                alt="접수 시작 아이콘"
                width="55px"
                height="55px"
              />
              <Typography
                color="#666"
                textAlign="center"
                fontSize="22px"
                sx={{
                  '& .bold': {
                    fontWeight: 'bold',
                  },
                }}
              >
                {props.contentsText ? (
                  props.contentsText
                ) : (
                  <>
                    접수를 <span className="bold">시작</span>
                    하시겠습니까?
                  </>
                )}
              </Typography>
              <Box height="100px" />
            </>
          )}
          <GnbTreatSetModal
            setRouter={props.setRouter}
            nameKo={props.nameKo}
            open={props.setting}
            handleClose={() => {
              if (props.setSetting) {
                props.setSetting(false);
              }
              props.handleClose();
            }}
          />
        </Stack>
      ) : (
        <Stack width="420px" paddingTop="10px" gap="24px" height="250px" />
      )}
    </WConfirmModal>
  );
};

export default GnbTreatStateView;
