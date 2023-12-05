import { SelectChangeEvent } from '@mui/material';
import { useEffect, useState } from 'react';

const useSelect = (props: {
  defultId: string;
  value?: string;
  callBack: (id: string) => void;
}) => {
  const { defultId, value, callBack } = props;
  const [option, setOption] = useState<string>(defultId);

  const onSelectOption = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setOption(value);
    if (value === 'DEFULT') {
      callBack('');
    } else {
      callBack(value);
    }
  };

  useEffect(() => {
    if (value) return setOption(value);
    if (value === '') return setOption('DEFULT');
  }, [value]);

  return { option, onSelectOption };
};

export default useSelect;
