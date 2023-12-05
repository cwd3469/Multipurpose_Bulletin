import { WOptionType } from 'types/common';
import useSelect from '../useSelect';
import WSelect from '../WSelect';
import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

const WSelectMedicalDepartment = (props: {
  value?: string;
  callBack: (id: string) => void;
  defultValue?: string;
  sx?: SxProps<Theme>;
  disabled?: boolean;
}) => {
  const options: WOptionType[] = [
    {
      name: props.defultValue ? props.defultValue : '진료과 전체',
      id: 'DEFULT',
    },
    {
      name: '내과',
      id: 'D01',
    },
    {
      name: '가정의학과',
      id: 'D02',
    },
    {
      name: '정형외과',
      id: 'D03',
    },
    {
      name: '이비인후과',
      id: 'D04',
    },
    {
      name: '소아청소년과',
      id: 'D05',
    },
    {
      name: '피부과',
      id: 'D06',
    },
    {
      name: '산부인과',
      id: 'D07',
    },
    {
      name: '비뇨의학과',
      id: 'D08',
    },
    {
      name: '정신건강의학과',
      id: 'D09',
    },
    { name: '외과', id: 'D10' },
    { name: '신경외과', id: 'D11' },
    { name: '신경과', id: 'D12' },
    { name: '건강검진센터', id: 'D13' },
  ];
  const { option, onSelectOption } = useSelect({
    defultId: options[0].id,
    value: props.value,
    callBack: props.callBack,
  });
  return (
    <WSelect
      name={'WSelectMedicalDepartment'}
      value={option}
      width={'140px'}
      onChange={onSelectOption}
      options={options}
      sx={props.sx}
      disabled={props.disabled}
    />
  );
};

export default WSelectMedicalDepartment;
