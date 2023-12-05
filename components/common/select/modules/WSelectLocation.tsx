import { WOptionType } from 'types/common';
import useSelect from '../useSelect';
import WSelect from '../WSelect';

const WSelectLocation = (props: {
  value?: string;
  callBack: (id: string) => void;
}) => {
  const options: WOptionType[] = [
    { id: 'DEFULT', name: '진료 국가 전체' },
    { id: 'DOMESTIC', name: '국내' },
    { id: 'OVERSEA', name: '해외' },
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

export default WSelectLocation;
