import { useCallback, useState } from 'react';
import { ContentsSection } from '../SettingTheme';
import { SettingOverseasType } from '../type';
import WSubTitle from '@components/common/typography/WSubTitle';
import { SetIntroSwitch } from '@components/hospitalIntro/modules/SetIntroTheme';

const SettingOverseas = ({ state, setState }: SettingOverseasType) => {
  const onChangeActive = useCallback(() => {
    setState(!state);
  }, [setState, state]);
  return (
    <ContentsSection>
      <WSubTitle
        title={'해외 비대면 진료 여부'}
        titleSx={{ lineHeight: '24px' }}
      />
      <SetIntroSwitch
        checked={!state}
        onChange={onChangeActive}
        sx={{ height: '40px', '& .MuiSwitch-thumb': { height: '40px' } }}
      />
    </ContentsSection>
  );
};

export default SettingOverseas;
