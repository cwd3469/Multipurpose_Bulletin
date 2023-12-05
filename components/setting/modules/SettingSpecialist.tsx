import { useCallback, useState } from 'react';
import { SetIntroToggle } from '@components/hospitalIntro/modules/SetIntroTheme';
import { ContentsSection } from '../SettingTheme';
import Image from 'next/image';
import { Grid } from '@mui/material';
import { SettingSpecialistType } from '../type';
import WSubTitle from '@components/common/typography/WSubTitle';
import { DepartmentIntro } from '@components/baseMedicalExpenses/type';

const SettingSpecialist = ({
  state,
  setState,
  origin,
}: SettingSpecialistType) => {
  const [ability, setAbility] = useState<DepartmentIntro[]>(origin);

  const onChangeActive = useCallback(
    (selected: boolean, id: string) => {
      const setActive = ability.map((item, index) => {
        return item.id === id ? { ...item, active: selected } : item;
      });
      const setActiveFilter = setActive.filter((item, index) => {
        return item.active;
      });

      if (setActiveFilter.length <= 2) {
        setAbility(setActive);
        setState(setActiveFilter);
      }
    },
    [ability, setState],
  );

  return (
    <ContentsSection
      sx={{
        '& .body': {
          width: '540px',
        },
      }}
    >
      <WSubTitle
        title={'전문의 취득 자격'}
        titleSx={{ lineHeight: '24px' }}
        requireSx={{ fontSize: '16px', lineHeight: '1' }}
      />
      <Grid container className="body">
        {ability.map((item, index) => {
          return (
            <SetIntroToggle
              key={index}
              value="check"
              color="primary"
              selected={item.active}
              sx={{ gap: '8px', padding: '7.5px 20px', letterSpacing: '0' }}
              onChange={(e) => {
                onChangeActive(!item.active, item.id);
              }}
            >
              {item.koName} 전문의
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
    </ContentsSection>
  );
};

export default SettingSpecialist;
