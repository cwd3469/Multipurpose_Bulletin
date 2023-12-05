import { SaveButton } from '@components/hospitalIntro/modules/SetIntroTheme';
import { ContentsBox } from '@components/setting/SettingTheme';
import {
  useApiGetSecuritySettingVaild,
  useApiPutSecuritySettingVaild,
} from '@hooks/api/hospitalAdmin/securitySet';
import useCodeMsgBundle from '@hooks/api/useCodeMsgBundle';
import { useToastContext } from '@hooks/useToastContext';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { ContantsLayout } from '@components/common/layout/Layout';
import { useDebounceFn } from 'ahooks';
import { useCallback, useEffect, useState } from 'react';
import SecuritySetCheckBox from './inputs/SecuritySetCheckBox';
import { RadioGroupListType } from './type';

export type SecuritySetDto = {
  accessTokenExpireTime: number;
  privacyRetentionPeriod: number;
};

const SecuritySetPage = () => {
  const toast = useToastContext();
  const msg = useCodeMsgBundle();
  const { data } = useApiGetSecuritySettingVaild();
  const { mutate: mutateApiPutSecuritySettingVaild } = useApiPutSecuritySettingVaild();
  const [timeList, setTimeList] = useState<RadioGroupListType[]>([]);
  const [dateList, setDateList] = useState<RadioGroupListType[]>([]);
  const [validTime, setValidTime] = useState<string>('0');
  const [validPeriod, setValidPeriod] = useState<string>('365');
  const [onDisabled, setOnDisabled] = useState<boolean>(true);
  const onChengeTime = useCallback((value: string) => {
    setValidTime(value);
  }, []);
  const onChengePeriod = useCallback((value: string) => {
    setValidPeriod(value);
  }, []);

  const onClickDateSet = useCallback(() => {
    const dto = {
      accessTokenExpireTime: Number(validTime),
      privacyRetentionPeriod: Number(validPeriod),
    };
    mutateApiPutSecuritySettingVaild(dto, {
      onSuccess(data, variables, context) {
        if (data.data.code !== '0000') {
          toast?.on(msg.errMsg(data.data.code), 'error');
        } else {
          toast?.on('수정에 성공하였습니다.', 'success');
        }
      },
      onError(error, variables, context) {
        toast?.on('수정에 실패하였습니다. \n 잠시후 , 다시 시도해 주세요.', 'error');
      },
    });
  }, [msg, mutateApiPutSecuritySettingVaild, toast, validPeriod, validTime]);

  useEffect(() => {
    const time: RadioGroupListType[] = [
      {
        data: '10',
        name: '10분',
      },
      {
        data: '30',
        name: '30분',
      },
      {
        data: '60',
        name: '60분',
      },
      {
        data: '0',
        name: '사용하지 않음',
        notRecommended: true,
      },
    ];
    const date: RadioGroupListType[] = [
      {
        data: '30',
        name: '30일',
      },
      {
        data: '60',
        name: '60일',
      },
      {
        data: '90',
        name: '90일',
      },
      {
        data: '100',
        name: '100일',
      },
      {
        data: '365',
        name: '365일',
      },
    ];
    setTimeList(time);
    setDateList(date);

    if (data) {
      const res: SecuritySetDto = data.data.data;
      setValidTime(String(res.accessTokenExpireTime));
      setValidPeriod(String(res.privacyRetentionPeriod));
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      const res: SecuritySetDto = data.data.data;
      const dto: SecuritySetDto = {
        accessTokenExpireTime: Number(validTime),
        privacyRetentionPeriod: Number(validPeriod),
      };

      if (res.accessTokenExpireTime !== dto.accessTokenExpireTime) {
        setOnDisabled(false);
        return;
      }
      if (res.privacyRetentionPeriod !== dto.privacyRetentionPeriod) {
        setOnDisabled(false);
        return;
      }
      setOnDisabled(true);
    }
  }, [data, validPeriod, validTime]);

  const onDebounceFnDateSet = useDebounceFn(onClickDateSet, {
    wait: 300,
  });

  return (
    <ContantsLayout bg="#F8F8F8" containerColor="#F8F8F8" sx={{ padding: '40px 0' }}>
      <ContentsBox sx={{ height: '630px', padding: '40px' }}>
        <Stack gap="40px">
          <Typography variant="subtitle1">개인정보 처리 설정</Typography>
          <Grid container gap="165px">
            <Stack gap="16px">
              <Typography variant="subtitle1">로그인 유지 시간 설정</Typography>
              <Stack
                sx={{
                  '& .MuiTypography-root': {
                    letterSpacing: '-0.32px',
                    color: '#404040',
                  },
                }}
              >
                <Typography variant="body2">
                  해당 -의 개인정보 보호를 위하여 사용 디바이스의
                </Typography>
                <Typography variant="body2">로그인 유지 시간을 설정할 수 있습니다.</Typography>
                <Box height="15px" />
              </Stack>
              <SecuritySetCheckBox data={timeList} onChangeValue={onChengeTime} value={validTime} />
            </Stack>
            <Stack gap="16px">
              <Typography variant="subtitle1">- 개인정보 삭제 주기 설정 안내</Typography>
              <Stack
                sx={{
                  '& .MuiTypography-root': {
                    letterSpacing: '-0.32px',
                    color: '#404040',
                  },
                }}
              >
                <Typography variant="body2">
                  해당 -의 개인정보를 위하여 관련 법령에 따라 개인정보 삭제를 진행할 예정입니다.
                </Typography>
                <Typography variant="body2">개인정보 삭제 주기 설정에 따라 진행합니다.</Typography>
              </Stack>
              <SecuritySetCheckBox
                data={dateList}
                onChangeValue={onChengePeriod}
                value={validPeriod}
              />
            </Stack>
          </Grid>
        </Stack>
      </ContentsBox>
      <Grid container justifyContent="center" paddingTop="32px">
        <SaveButton variant="contained" onClick={onDebounceFnDateSet.run} disabled={onDisabled}>
          수정
        </SaveButton>
      </Grid>
    </ContantsLayout>
  );
};

export default SecuritySetPage;
