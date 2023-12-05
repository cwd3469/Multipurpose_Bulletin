import { useCallback, useState } from 'react';
import { SetIntroToggle } from '@components/hospitalIntro/modules/SetIntroTheme';
import { ContentsSection } from '../SettingTheme';
import Image from 'next/image';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { SettingSymptomType } from '../type';
import WSubTitle from '@components/common/typography/WSubTitle';

const SettingSymptom = ({ state, setState }: SettingSymptomType) => {
  const onChangeActive = useCallback(
    (selected: boolean, id: string) => {
      const setActive = state.map((symptom, index) => {
        return symptom.id === id ? { ...symptom, active: selected } : symptom;
      });
      setState(setActive);
    },
    [setState, state],
  );
  let activeArr = state.filter((item) => item.active);
  let validCheck = activeArr.length ? false : true;
  return (
    <ContentsSection>
      <WSubTitle
        title={'진료 가능 증상'}
        titleSx={{ lineHeight: '24px' }}
        require
        requireSx={{ fontSize: '16px', lineHeight: '1' }}
      />
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
                {item.symptomName}
                {item.active ? (
                  <Image
                    src={'/assets/icons/checkIconActive.svg'}
                    alt="체크"
                    width={12}
                    height={10}
                  />
                ) : (
                  <Image
                    src={'/assets/icons/checkIcon.svg'}
                    alt="체크"
                    width={12}
                    height={10}
                  />
                )}{' '}
              </SetIntroToggle>
            );
          })}
        </Grid>
        <Box height="14px">
          {validCheck ? (
            <Typography color="#fc5935" lineHeight="1" variant="caption">
              진료 가능 증상을 1개 이상 선택해 주세요.
            </Typography>
          ) : (
            ''
          )}
        </Box>
      </Stack>
    </ContentsSection>
  );
};

export default SettingSymptom;
