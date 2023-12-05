import WSubTitle from '@components/common/typography/WSubTitle';
import useValidation from '@hooks/useValidation';
import { Grid, Stack } from '@mui/material';
import Input from '@components/common/inputs/Input';
import { commaAdd, commaRemove } from '@utils/formatNumber';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { ErrorType } from 'types/signin';

interface DomesticCostType {
  state: string;
  setState: Dispatch<SetStateAction<string>>;
}
const DomesticCost = (props: DomesticCostType) => {
  const { state, setState } = props;
  const [err, setErr] = useState<ErrorType>({ msg: '', boo: false });
  const prefix = '원';
  const valid = useValidation();

  const focusIn = useCallback(() => {
    const last = state.slice(0, -1);
    setState(last);
  }, [setState, state]);

  const focusOut = useCallback(() => {
    if (state) {
      setState(state + prefix);
    }
  }, [setState, state]);

  const onValid = useCallback((txt: string) => {
    if (!txt) {
      setErr({ msg: '0원 또는 100원 이상 입력이 가능합니다.', boo: true });
      return;
    } else {
      const number = Number(commaRemove(txt));
      if (number <= 1990000) {
        if (number < 100) {
          if (number === 0) {
            setErr({ msg: '', boo: false });
          } else {
            setErr({
              msg: '0원 또는 100원 이상 입력이 가능합니다.',
              boo: true,
            });
          }
        } else {
          setErr({ msg: '', boo: false });
        }
      } else {
        setErr({ msg: '199만원까지 입력이 가능합니다.', boo: true });
      }
    }
  }, []);

  const stateOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let { value } = e.target;
      if (value.length <= 8) {
        if (valid.regExpExpenses.test(value)) {
          const comma = commaAdd(value);
          setState(comma);
          onValid(comma);
        } else {
          setErr({ msg: '0원 또는 100원 이상 입력이 가능합니다.', boo: true });
        }
      }
    },
    [onValid, setState, valid.regExpExpenses],
  );

  return (
    <Grid container justifyContent={'center'}>
      <Stack gap="12px" width={'420px'}>
        <WSubTitle title="진료비 입력" require />
        <Input
          value={state}
          onChange={stateOnChange}
          focusOutEvent={focusOut}
          focusInEvent={focusIn}
          placeholder="금액을 입력해 주세요."
          helper="금액을 입력해 주세요."
          error={err}
          sx={{
            '& .MuiInputBase-input': {
              textAlign: 'end',
            },
          }}
        ></Input>
      </Stack>
    </Grid>
  );
};

export default DomesticCost;
