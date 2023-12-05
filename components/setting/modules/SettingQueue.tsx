import { useCallback } from 'react';
import { ContentsSection } from '../SettingTheme';
import { Box, Grid } from '@mui/material';
import { SettingTextType } from '../type';
import WSubTitle from '@components/common/typography/WSubTitle';
import Input from '@components/common/inputs/Input';
import useValidation from '@hooks/useValidation';

const SettingQueue = ({
  state,
  setState,
  error: queueErr,
  setError: setQueueErr,
}: SettingTextType) => {
  const valid = useValidation();
  const prefix = '명';

  const queueOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (value) {
        if (parseInt(value) <= 20) {
          if (valid.regExpTwoDigit.test(value)) {
            setState(value);
            if (parseInt(value) === 0) {
              setQueueErr({
                msg: '진료 대기열은 1명 이상 20명 이하로 설정이 가능합니다.',
                boo: true,
              });
              return;
            }
            setQueueErr({
              msg: '',
              boo: false,
            });
          }
        }
      } else {
        setState('');
        setQueueErr({
          msg: '진료 대기열은 1명 이상 20명 이하로 설정이 가능합니다.',
          boo: true,
        });
        return;
      }
    },
    [setQueueErr, setState, valid.regExpTwoDigit],
  );

  const queueOnFocusIn = () => {
    const last = state.slice(0, -1);
    setState(last);
  };
  const queueOnFocusOut = () => {
    if (state == '') {
      setState(0 + prefix);
    } else {
      setState(state + prefix);
    }
  };
  return (
    <ContentsSection>
      <WSubTitle
        title={'최대 진료 대기열'}
        require
        titleSx={{ lineHeight: '24px' }}
      />
      <Grid container className="body" sx={{ width: '100%' }}>
        <Box width="100%">
          <Input
            value={state}
            error={queueErr}
            onChange={queueOnChange}
            focusOutEvent={queueOnFocusOut}
            focusInEvent={queueOnFocusIn}
            placeholder="최대 진료 대기열 인원수를 입력해 주세요."
          />
        </Box>
      </Grid>
    </ContentsSection>
  );
};

export default SettingQueue;
