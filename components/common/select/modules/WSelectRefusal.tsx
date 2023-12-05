import { WOptionType } from 'types/common';
import useSelect from '../useSelect';
import WSelect from '../WSelect';

const WSelectRefusal = (props: {
  value?: string;
  callBack: (id: string) => void;
  width?: string;
}) => {
  const options: WOptionType[] = [
    { id: 'DEFAULT', name: '- 사정' },
    { id: 'DIRECT', name: '직접 입력' },
  ];
  const { option, onSelectOption } = useSelect({
    defultId: options[0].id,
    value: props.value,
    callBack: props.callBack,
  });
  return (
    <WSelect
      name={'wSelectRefusal'}
      value={option}
      width={props.width ? props.width : '180px'}
      onChange={onSelectOption}
      options={options}
      isButton={true}
      sx={{ height: '48px' }}
      MenuPropsSx={{
        '& .MuiMenuItem-root': {
          justifyContent: 'center',
          '&.Mui-selected': {
            backgroundColor: '#E2F6FF',
            color: '#4AC6FF',
          },
        },
      }}
    />
  );
};

export default WSelectRefusal;
