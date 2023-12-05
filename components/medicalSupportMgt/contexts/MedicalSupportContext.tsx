/* eslint-disable @typescript-eslint/no-non-null-assertion */
import useFilter from '@hooks/utils/filter/useFilter';
import { DateRange } from '@mui/x-date-pickers-pro';
import { transQueryUrl } from '@utils/transtext';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { createContext, useCallback, useEffect, useState } from 'react';
import { DataPagition, DataPagitionValue, FilterDateType } from 'types/table';

const MedicalSupportContext = createContext<{
  filter: DataPagition;
  setInFilter: (value: DataPagitionValue, keyId: string) => void;
}>({
  filter: {
    code: '0',
    page: 0,
    nameKo: '',
  },
  setInFilter: (value: DataPagitionValue, keyId: string) => {
    return;
  },
});

interface Props {
  children: JSX.Element | JSX.Element[];
}

const MedicalSupportProvider = ({ children }: Props): JSX.Element => {
  const [filter, setFilter] = useState<DataPagition>({
    page: 0,
    nameKo: '',
  });

  const { setInFilter, setInDate } = useFilter({
    url: '/hospital-admin/medical-support-mgt',
    filter: filter,
    setFilter: setFilter,
  });

  return (
    <MedicalSupportContext.Provider
      value={{
        filter,
        setInFilter,
      }}
    >
      {children}
    </MedicalSupportContext.Provider>
  );
};

export { MedicalSupportContext, MedicalSupportProvider };
