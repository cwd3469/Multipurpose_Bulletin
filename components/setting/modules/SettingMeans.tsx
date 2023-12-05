import { useCallback } from 'react';
import Image from 'next/image';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { SettingMeansType } from '../type';
import { ContentsSection } from '../SettingTheme';
import { SetIntroToggle } from '@components/hospitalIntro/modules/SetIntroTheme';
import WSubTitle from '@components/common/typography/WSubTitle';
const SettingMeans = ({ state, setState }: SettingMeansType) => {
  const onChangeActive = useCallback(
    (selected: boolean, id: string) => {
      const setActive = state.map((means, index) => {
        return means.id === id ? { ...means, active: selected } : means;
      });
      setState(setActive);
    },
    [setState, state],
  );
  let activeArr = state.filter((item) => item.active);
  let validCheck = activeArr.length ? false : true;
  return (
    <ContentsSection sx={{ gap: '4px' }}>
      <WSubTitle
        title={'비대면 진료 수단'}
        require
        requireSx={{ fontSize: '16px', lineHeight: '1' }}
        titleSx={{ lineHeight: '24px' }}
      />
      <Typography variant="body2" color="#525362" paddingBottom="16px">
        비대면 진료 시범 사업 진행으로 화상 진료가 원칙입니다.
      </Typography>
      <Stack gap="8px">
        <Grid container className="body">
          {state.map((item, index) => {
            return (
              <SetIntroToggle
                key={index}
                value="check"
                color="primary"
                selected={item.active}
                sx={{ gap: '13px', padding: '7.5px 20px', letterSpacing: '0' }}
                onChange={(e) => {
                  onChangeActive(!item.active, item.id);
                }}
              >
                {item.meanName}
                {item.active ? (
                  <Image
                    src={'/assets/icons/checkIconActive.svg'}
                    alt="체크"
                    width={12}
                    height={10}
                  />
                ) : (
                  <Image src={'/assets/icons/checkIcon.svg'} alt="체크" width={12} height={10} />
                )}{' '}
              </SetIntroToggle>
            );
          })}
        </Grid>
        <Box height="14px">
          {validCheck ? (
            <Typography color="#fc5935" lineHeight="1" variant="caption">
              비대면 진료 수단을 1개 이상 선택해 주세요.
            </Typography>
          ) : (
            ''
          )}
        </Box>
      </Stack>
    </ContentsSection>
  );
};

export default SettingMeans;
