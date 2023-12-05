import { WOptionType } from 'types/common';
import useSelect from '../useSelect';
import WSelect from '../WSelect';

const WSelectTreatmentStatusQueue = (props: {
  value?: string;
  callBack: (id: string) => void;
  width?: string;
}) => {
  const options: WOptionType[] = [
    { id: 'DEFULT', name: '진료 상태 전체' },
    { id: 'WAIT', name: '진료 대기' },
    { id: 'IN_TREAT', name: '진료 중' },
    { id: 'HOLD', name: '진료 보류' },
  ];
  const { option, onSelectOption } = useSelect({
    defultId: options[0].id,
    value: props.value,
    callBack: props.callBack,
  });
  return (
    <WSelect
      name={'WSelectTreatmentStatusQueue'}
      value={option}
      width={props.width ? props.width : '140px'}
      onChange={onSelectOption}
      options={options}
    />
  );
};

export default WSelectTreatmentStatusQueue;
