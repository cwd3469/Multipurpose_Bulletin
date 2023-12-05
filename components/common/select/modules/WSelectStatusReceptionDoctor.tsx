import { WOptionType } from 'types/common';
import useSelect from '../useSelect';
import WSelect from '../WSelect';

const WSelectStatusReceptionDoctor = (props: {
  value?: string;
  callBack: (id: string) => void;
}) => {
  const options: WOptionType[] = [
    { id: 'DEFULT', name: '접수 상태 전체' },
    { id: 'true', name: '접수 시작' },
    { id: 'false', name: '접수 마감' },
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
      width={'200px'}
      onChange={onSelectOption}
      options={options}
    />
  );
};

export default WSelectStatusReceptionDoctor;
