import WSubTitle from '@components/common/typography/WSubTitle';
import useValidation from '@hooks/useValidation';
import { Stack } from '@mui/material';
import Input from '@components/common/inputs/Input';
import { Dispatch, SetStateAction, useCallback } from 'react';
import { ErrorType } from 'types/signin';

interface NonReimburseName {
  state: string;
  setState: Dispatch<SetStateAction<string>>;
  err: ErrorType;
  setErr: Dispatch<SetStateAction<ErrorType>>;
}

const NonReimburseName = (props: NonReimburseName) => {
  const { state, setState, err, setErr } = props;
  const valid = useValidation();
  // 항목 명 입력
  const onChangeCategoryName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    valid.nonReimburseListPass({
      txt: text,
      pass: setState,
      error: setErr,
    });
  };

  return (
    <Stack gap="16px">
      <WSubTitle title={'항목 명'} require titleSx={{ lineHeight: '1' }} />
      <Input
        placeholder="한글,영문 대소문자,숫자,특수문자 1~22자리"
        value={state}
        onChange={onChangeCategoryName}
        error={err}
      />
    </Stack>
  );
};

export default NonReimburseName;
