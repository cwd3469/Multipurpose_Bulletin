import React, { useCallback } from 'react';
import WConfirmModal from '@components/common/modal/WConfirmModal';
import { Box, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ModalType } from 'types/signin';
import { useDebounceFn } from 'ahooks';

interface GnbTreatSetModalType extends ModalType {
  nameKo: string;
  setRouter: string;
}

const GnbTreatSetModal = (props: GnbTreatSetModalType) => {
  const { open, handleClose, nameKo, setRouter } = props;

  const router = useRouter();

  const handleEvent = useCallback(() => {
    router.push(setRouter, undefined, {
      shallow: true,
    });
    handleClose();
  }, [router, setRouter, handleClose]);

  const onDebounceFnHandleEvent = useDebounceFn(handleEvent, {
    wait: 300,
  });

  return (
    <WConfirmModal
      maxWidth="lg"
      title="진료 접수 상태 변경"
      btnTitle={'의사 진료 설정 이동'}
      handleClose={handleClose}
      handleEvent={onDebounceFnHandleEvent.run}
      open={open}
      activeOn
    >
      {open ? (
        <Stack width="420px" paddingTop="10px" gap="24px">
          <Image
            src={'/assets/icons/processStatusCheck.svg'}
            alt="접수 시작 아이콘"
            width="55px"
            height="55px"
          />
          <Stack justifyContent="center" alignItems="center">
            <Typography color="#666" textAlign="center" fontSize="22px">
              {nameKo} 의사의 진료 설정을
            </Typography>
            <Typography color="#666" textAlign="center" fontSize="22px">
              완료해주셔야 의사 접수 상태 변경이 가능합니다.
            </Typography>
          </Stack>
          <Box height="60px" />
        </Stack>
      ) : (
        <Stack width="420px" paddingTop="10px" gap="24px" height="200px" />
      )}
    </WConfirmModal>
  );
};

export default GnbTreatSetModal;
