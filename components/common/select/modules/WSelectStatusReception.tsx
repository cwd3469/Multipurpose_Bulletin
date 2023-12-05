import useSelect from '../useSelect';
import WSelect from '../WSelect';
import { WOptionType } from 'types/common';
const WSelectStatusReception = (props: {
  value?: string;
  callBack: (id: string) => void;
}) => {
  const options: WOptionType[] = [
    { id: 'REGIST', name: '접수 대기' },
    { id: 'REFUSE', name: '접수 거절' },
    { id: 'ACCEPT', name: '접수 수락' },
  ];
  const { option, onSelectOption } = useSelect({
    defultId: options[0].id,
    value: props.value,
    callBack: props.callBack,
  });
  return (
    <WSelect
      name={'statusReception'}
      value={option}
      width={'120px'}
      onChange={onSelectOption}
      options={options}
    />
  );
};

export default WSelectStatusReception;
