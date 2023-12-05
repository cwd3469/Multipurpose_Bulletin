import { useCallback, useEffect, useState } from 'react';
import { SetIntroToggle } from '@components/hospitalIntro/modules/SetIntroTheme';
import Image from 'next/image';
import { Grid } from '@mui/material';
import { DepartmentProps } from '../type';
import WSubTitle from '@components/common/typography/WSubTitle';
import { ContentsSection } from '@components/setting/SettingTheme';
import { DepartmentIntro } from '@components/baseMedicalExpenses/type';
import { WTextError } from '@components/common/typography/WCommonText';

const DoctorInfoDepartment = (props: DepartmentProps) => {
  const { state, setState, err, setErr } = props;

  const arrDepartment = useCallback(() => {
    let arr = [];
    for (const key in state) {
      if (Object.prototype.hasOwnProperty.call(state, key)) {
        const element = state[key];
        arr.push(element);
      }
    }
    return arr;
  }, [state])();

  const onChangeToggle = useCallback(
    (info: DepartmentIntro) => {
      const intro = {
        id: info.id,
        koName: info.koName,
        enName: info.enName,
        active: !info.active,
      };
      setState(intro, info.enName);
    },
    [setState],
  );

  const filterActionArr = arrDepartment.filter((item, index) => item.active);

  return (
    <ContentsSection>
      <WSubTitle title={'진료과'} titleSx={{ lineHeight: '24px' }} />
      <Grid container className="body">
        {arrDepartment.map((item, index) => {
          return (
            <SetIntroToggle
              key={index}
              value="check"
              color="primary"
              selected={item.active}
              sx={{
                gap: '8px',
                padding: '7.5px 20px',
                letterSpacing: '0',
              }}
              onChange={() => onChangeToggle(item)}
            >
              {item.koName}
              {item.active ? (
                <Image
                  src={'/assets/icons/checkIconActive.svg'}
                  alt="체크"
                  width={12}
                  height={12}
                />
              ) : (
                <Image src={'/assets/icons/checkIcon.svg'} alt="체크" width={12} height={12} />
              )}{' '}
            </SetIntroToggle>
          );
        })}
        <WTextError color={'#FC5935'} sx={{ paddingTop: '4px', height: '16px' }}>
          {filterActionArr.length ? '' : '진료과를 1개 이상 선택해 주세요.'}
        </WTextError>
      </Grid>
    </ContentsSection>
  );
};

export default DoctorInfoDepartment;
