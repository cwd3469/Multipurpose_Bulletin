import useSelect from '../useSelect';
import WSelect from '../WSelect';
import { WOptionType } from 'types/common';
const WSelectStatusReserve = (props: { value?: string; callBack: (id: string) => void }) => {
  const options: WOptionType[] = [
    { id: 'DEFULT', name: '예약 상태 전체' },
    { id: 'RESERVED', name: '예약 대기' },
    { id: 'RESERVED_ACCEPT', name: '예약 수락' },
    { id: 'RESERVED_REFUSE', name: '예약 거절' },
    { id: 'RESERVED_CANCEL', name: '예약 취소' },
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
      width={'140px'}
      onChange={onSelectOption}
      options={options}
    />
  );
};

export default WSelectStatusReserve;
