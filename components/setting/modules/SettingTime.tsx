import { useCallback } from 'react';
import { ContentsSection } from '../SettingTheme';
import { Box, Grid } from '@mui/material';
import { SettingTextType } from '../type';
import WSubTitle from '@components/common/typography/WSubTitle';
import Input from '@components/common/inputs/Input';
import useValidation from '@hooks/useValidation';

const SettingTime = ({
  state,
  setState,
  error: timeErr,
  setError: setTimeErr,
}: SettingTextType) => {
  const valid = useValidation();
  const prefix = '분';

  const timeOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (value) {
        if (parseInt(value) <= 60)
          if (valid.regExpTwoDigit.test(value)) {
            setState(value);
            if (parseInt(value) < 3) {
              setTimeErr({
                msg: '진료시간은 3분 이상 60분 이하로 설정이 가능합니다.',
                boo: true,
              });
            } else {
              setTimeErr({ msg: '', boo: false });
            }
          }
      } else {
        setState('');
        setTimeErr({
          msg: '진료시간은 3분 이상 60분 이하로 설정이 가능합니다.',
          boo: true,
        });
        return;
      }
    },
    [setState, setTimeErr, valid.regExpTwoDigit],
  );

  const timeOnFocusIn = () => {
    const last = state.slice(0, -1);
    setState(last);
  };
  const timeOnFocusOut = () => {
    if (state == '') {
      setState(0 + prefix);
    } else {
      setState(state + prefix);
    }
  };
  return (
    <ContentsSection>
      <WSubTitle
        title={'1명당 진료 시간'}
        require
        titleSx={{ lineHeight: '24px' }}
      />
      <Grid container className="body" sx={{ width: '100%' }}>
        <Box width="100%">
          <Input
            value={state}
            error={timeErr}
            onChange={timeOnChange}
            focusOutEvent={timeOnFocusOut}
            focusInEvent={timeOnFocusIn}
            placeholder="환자 한명당 분단위 예상 진료 시간을 입력해주세요."
          />
        </Box>
      </Grid>
    </ContentsSection>
  );
};

export default SettingTime;
