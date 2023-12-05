import { WOptionType } from 'types/common';
import WSelect from '../WSelect';
import useSelect from '../useSelect';

const WSelectEnterType = (props: {
  value?: string;
  callBack: (id: string) => void;
}) => {
  const options: WOptionType[] = [
    { id: 'DEFULT', name: '인입 전체' },
    { id: 'SYMPTOM', name: '증상' },
    { id: 'DEPARTMENT', name: '진료과' },
  ];
  const { option, onSelectOption } = useSelect({
    defultId: options[0].id,
    value: props.value,
    callBack: props.callBack,
  });
  return (
    <WSelect
      name={'enterType'}
      value={option}
      width={'120px'}
      onChange={onSelectOption}
      options={options}
    />
  );
};

export default WSelectEnterType;
