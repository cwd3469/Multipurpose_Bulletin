import { ChangeEvent, useCallback, useState } from 'react';
import { ContentsSection } from '../SettingTheme';
import { SettingOverseasType } from '../type';
import WSubTitle from '@components/common/typography/WSubTitle';
import WSwitch from '@components/common/buttons/WSwitch';

const SettingRes = ({ state, setState }: SettingOverseasType) => {
  const onChangeActive = useCallback(
    (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
      setState(!checked);
    },
    [setState],
  );

  const info = {
    fullWidth: '128px',
    switchheight: '40px',
    switchWidth: '65px',
    switchOn: '"ON"',
    switchOff: '"OFF"',
    moveTranslateX: 'translateX(63px)',
    borderRadius: '6px',
  };

  return (
    <ContentsSection>
      <WSubTitle title={'진료 예약 가능 여부'} titleSx={{ lineHeight: '24px' }} require />
      <WSwitch checked={state} info={info} onChange={onChangeActive} />
    </ContentsSection>
  );
};

export default SettingRes;
