import { WOptionType } from 'types/common';
import useSelect from '../useSelect';
import WSelect from '../WSelect';

const WSelectTreatmentStatus = (props: {
  value?: string;
  callBack: (id: string) => void;
}) => {
  const options: WOptionType[] = [
    { id: 'DEFULT', name: '진료 완료 상태 전체' },
    { id: 'CLOSE', name: '진료 종료' },
    { id: 'CANCEL', name: '진료 취소' },
  ];
  const { option, onSelectOption } = useSelect({
    defultId: options[0].id,
    value: props.value,
    callBack: props.callBack,
  });
  return (
    <WSelect
      name={'WSelectTreatmentStatus'}
      value={option}
      width={'200px'}
      onChange={onSelectOption}
      options={options}
    />
  );
};

export default WSelectTreatmentStatus;
