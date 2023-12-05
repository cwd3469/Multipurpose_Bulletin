import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { SettingMobileType, SettingTextType } from '../type';
import Input from '@components/common/inputs/Input';
import { ErrorType } from 'types/signin';
import useValidation from '@hooks/useValidation';
import { mobileFormat } from '@utils/formatNumber';
import { Box, Stack, Typography } from '@mui/material';
import WSubTitle from '@components/common/typography/WSubTitle';

const SettingMobile = ({
  stateOne,
  setStateOne,
  stateTwo,
  setStateTwo,
  mobileOneErr: errOne,
  setMobileOneErr: setErrOne,
  mobileTwoErr: errTwo,
  setMobileTwoErr: setErrTwo,
}: SettingMobileType) => {
  const valid = useValidation();

  const mobileOne = useCallback(() => {
    return mobileFormat(stateOne);
  }, [stateOne])();

  const mobileTwo = useCallback(() => {
    return mobileFormat(stateTwo);
  }, [stateTwo])();

  //의사 정보 입력
  const onChangeInfo = useCallback(
    (
      text: string,
      setState: Dispatch<SetStateAction<string>>,
      setErr: Dispatch<SetStateAction<ErrorType>>,
    ) => {
      if (text.length < 14) {
        if (text.length > 3 && text.substring(0, 3) !== '010') {
          const errorMsg = {
            msg: '11자리의 휴대폰 번호를 입력해 주세요.',
            boo: true,
          };
          setErr(errorMsg);
          return;
        } else {
          const form = text.replace(valid.regExpNum, '').replace(valid.regExpMobile, `$1-$2-$3`);
          setState(form);
          if (form.length >= 13) {
            const errorMsg = {
              msg: '',
              boo: false,
            };
            setErr(errorMsg);
          } else {
            const errorMsg = {
              msg: '11자리의 휴대폰 번호를 입력해 주세요.',
              boo: true,
            };
            const nullMsg = {
              msg: '',
              boo: false,
            };
            setErr(form.length === 0 ? nullMsg : errorMsg);
          }
        }
      }
    },
    [valid.regExpMobile, valid.regExpNum],
  );

  return (
    <Stack>
      <WSubTitle title={'알림 톡 발송 대상 휴대폰 번호'} titleSx={{ lineHeight: '1' }} />
      <Box height="8px" />
      <Typography variant="body2" color="#525362" paddingBottom="16px" letterSpacing="-0.3px">
        비대면 진료 접수 건 발생 시, 의사와 함께 알림 톡으로 알려드려요
      </Typography>
      <Input
        value={mobileOne}
        onChange={(e) => {
          const text = e.target.value;
          onChangeInfo(text, setStateOne, setErrOne);
        }}
        placeholder="알림 톡을 연락받을 번호를 입력해 주세요."
        error={errOne}
        sx={{ '& .input-msg': { padding: '3px 0px 3px', height: '18px' } }}
      />
      <Input
        value={mobileTwo}
        onChange={(e) => {
          const text = e.target.value;
          onChangeInfo(text, setStateTwo, setErrTwo);
        }}
        placeholder="알림 톡을 연락받을 번호를 입력해 주세요."
        error={errTwo}
        sx={{ '& .input-msg': { padding: '3px 0px 3px', height: '28px' } }}
      />
    </Stack>
  );
};

export default SettingMobile;
