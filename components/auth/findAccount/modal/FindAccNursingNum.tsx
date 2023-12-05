import { useCallback, useEffect, useState } from 'react';
import { Stack, Typography, Box } from '@mui/material';
import { ErrorType, ModalType } from 'types/signin';
import WAlertModal from '@components/common/modal/WAlertModal';
import { WDialogTitle } from '@components/common/modal/modules/WModalModules';
import FindAccountStepOne from './FindAccountStepOne';
import { useToastContext } from '@hooks/useToastContext';
import { useHospitalCode } from '@hooks/api/user/findAccount';
import WHealthcareFacility from '@components/common/inputs/textField/modules/WHealthcareFacility';
import { useDebounceFn } from 'ahooks';

const FindAccNursingNum = (props: ModalType) => {
  const { open, handleClose } = props;
  const toast = useToastContext();
  const { mutate: postHospitalMutate } = useHospitalCode();
  const [modalOn, setModalOn] = useState<boolean>(false);
  const [bgDisable, setBgDisable] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [nursNum, setNursNum] = useState<string>('');
  const [err, setErr] = useState<ErrorType>({ msg: '', boo: false });

  // 리셋
  const reset = useCallback(() => {
    setDisabled(true);
  }, []);

  // 리셋 모달 끄기
  const resetModalClose = () => {
    setModalOn(false);
    setBgDisable(false);
    setNursNum('');
    handleClose();
    reset();
  };
  // 요양기관 번호 확인
  const onClickNext = useCallback(() => {
    const data = { hospitalCode: nursNum };
    postHospitalMutate(data, {
      onSuccess: (res) => {
        if (res.data.code !== '0000') {
          toast?.on(
            '요양기관 번호 확인을 실패하였습니다. \n 입력 내용을 다시 한번 확인해 주세요.',
            'error',
          );
          return;
        }
        setModalOn(true);
        setBgDisable(true);
        reset();
      },
      onError: (err) => {
        toast?.on(
          '요양기관 번호 확인을 실패하였습니다. \n 입력 내용을 다시 한번 확인해 주세요.',
          'error',
        );
      },
    });
  }, [nursNum, postHospitalMutate, reset, toast]);

  useEffect(() => {
    if (!err.boo) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [err.boo, nursNum]);

  const onDebounceFnClickNext = useDebounceFn(onClickNext, {
    wait: 300,
  });
  return (
    <WAlertModal
      open={open}
      handleClose={resetModalClose}
      maxWidth={'xl'}
      handleEvent={onDebounceFnClickNext.run}
      bgDisable={bgDisable}
      disabled={disabled}
      activeOn
      btnTitle="다음"
      closeBtnOn
    >
      <Stack justifyContent="center" width={'720px'} alignItems="center">
        <WDialogTitle sx={{ padding: '64px 20px 16px' }}>
          요양기관번호 인증
        </WDialogTitle>
        <Stack>
          <Typography variant="body1" color="#00" textAlign={'center'}>
            요양기관 번호를 입력해 주세요.
          </Typography>
          <Typography variant="body1" color="#00" textAlign={'center'}>
            요양기관 번호를 모를 경우 해당 기관의 관리자에게 문의해주세요 .
          </Typography>
        </Stack>
        <Box height="60px" />
        <Stack width="320px" gap="8px" sx={{ minHeight: '300px' }}>
          {/* 요양기관 번호 입력 */}
          <WHealthcareFacility
            state={nursNum}
            error={err}
            setState={(txt: string, keyId: string) => setNursNum(txt)}
            setError={(errMsg: ErrorType, keyId: string) => setErr(errMsg)}
            keyId={'hospitalCode'}
          />
        </Stack>
        <FindAccountStepOne
          open={modalOn}
          handleClose={resetModalClose}
          hospitalCode={nursNum}
        />
      </Stack>
    </WAlertModal>
  );
};

export default FindAccNursingNum;
