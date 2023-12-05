import WSubTitle from '@components/common/typography/WSubTitle';
import useValidation from '@hooks/useValidation';
import { Stack } from '@mui/material';
import Input from '@components/common/inputs/Input';
import { commaAdd, commaRemove } from '@utils/formatNumber';
import { Dispatch, SetStateAction, useCallback } from 'react';
import { ErrorType } from 'types/signin';

interface NonReimbursePaymentType {
  state: string;
  setState: Dispatch<SetStateAction<string>>;
  err: ErrorType;
  setErr: Dispatch<SetStateAction<ErrorType>>;
}

const NonReimbursePayment = (props: NonReimbursePaymentType) => {
  const { state, setState, err, setErr } = props;
  const prefix = '원';
  const valid = useValidation();
  const errorMsg = useCallback(
    () => setErr({ msg: '0원 또는 100원 이상 입력이 가능합니다.', boo: true }),
    [setErr],
  );
  const limitErrorMsg = useCallback(
    () => setErr({ msg: '199만원까지 입력이 가능합니다.', boo: true }),
    [setErr],
  );
  const success = useCallback(() => setErr({ msg: '', boo: false }), [setErr]);

  const onChangeVaild = useCallback(
    (text: string) => {
      if (!text) {
        errorMsg();
        return;
      } else {
        const number = Number(commaRemove(text));
        if (number <= 1990000) {
          if (number < 100) {
            if (number === 0) {
              success();
            } else {
              errorMsg();
            }
          } else {
            success();
          }
        } else {
          limitErrorMsg();
        }
      }
    },
    [errorMsg, limitErrorMsg, success],
  );

  // 항목 가격 입력
  const onChangeCategoryAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    if (text.length <= 8) {
      if (valid.regExpExpenses.test(text)) {
        const comma = commaAdd(text);
        setState(comma);
        onChangeVaild(comma);
      } else {
        errorMsg();
      }
    }
  };

  // 항목 가격 포커스 아웃 유효성 검사
  const onFocusIn = () => {
    const last = state.slice(0, -1);
    setState(last);
  };

  // 항목 가격 포커스 아웃 유효성 검사
  const onFocusOutAmount = useCallback(() => {
    if (state) setState(state + prefix);
  }, [setState, state]);

  return (
    <Stack gap="16px">
      <WSubTitle title={'항목 금액'} require titleSx={{ lineHeight: '1' }} />
      <Input
        placeholder="0원"
        value={state}
        onChange={onChangeCategoryAmount}
        error={err}
        focusInEvent={onFocusIn}
        focusOutEvent={onFocusOutAmount}
        sx={{
          '& .MuiInputBase-input': {
            textAlign: 'end',
          },
        }}
      />
    </Stack>
  );
};

export default NonReimbursePayment;
