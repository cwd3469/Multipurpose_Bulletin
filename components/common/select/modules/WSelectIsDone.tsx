import { WOptionType } from 'types/common';
import useSelect from '../useSelect';
import WSelect from '../WSelect';

const WSelectIsDone = (props: {
  value?: string;
  callBack: (id: string) => void;
  width?: string;
}) => {
  const options: WOptionType[] = [
    { id: 'DEFULT', name: '진료비 등록 여부 전체' },
    { id: 'false', name: '진료비 미등록' },
    { id: 'true', name: '진료비 등록' },
  ];
  const { option, onSelectOption } = useSelect({
    defultId: options[0].id,
    value: props.value,
    callBack: props.callBack,
  });
  return (
    <WSelect
      name={'WSelectIsDone'}
      value={option}
      width={props.width ? props.width : '180px'}
      onChange={onSelectOption}
      options={options}
    />
  );
};

export default WSelectIsDone;
