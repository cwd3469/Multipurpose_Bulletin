/* eslint-disable @typescript-eslint/no-non-null-assertion */
import useFilter from '@hooks/utils/filter/useFilter';
import { createContext, useState } from 'react';
import { DataPagition, DataPagitionValue } from 'types/table';

const NonReimburseFilterContext = createContext<{
  filter: DataPagition;
  setInFilter: (value: DataPagitionValue, keyId: string) => void;
  ulid: string;
  setInUlid: (txt: string) => void;
}>({
  filter: { code: '0', nameKo: '', page: 1 },
  setInFilter: (value: DataPagitionValue, keyId: string) => {
    return;
  },
  ulid: '',
  setInUlid: (txt: string) => {
    return;
  },
});

interface Props {
  children: JSX.Element | JSX.Element[];
}

const NonReimburseFilterProvider = ({ children }: Props): JSX.Element => {
  const [filter, setFilter] = useState<DataPagition>({
    nameKo: '',
    page: 0,
  });
  const [ulid, setUlid] = useState<string>('');

  const setInUlid = (txt: string) => setUlid(txt);

  const { setInFilter, setInDate } = useFilter({
    url: '/hospital-admin/non-reimburse',
    filter: filter,
    setFilter: setFilter,
  });

  return (
    <NonReimburseFilterContext.Provider
      value={{
        filter,
        setInFilter,
        ulid,
        setInUlid,
      }}
    >
      {children}
    </NonReimburseFilterContext.Provider>
  );
};

export { NonReimburseFilterContext, NonReimburseFilterProvider };
