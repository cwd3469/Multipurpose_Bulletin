import { DateRange } from '@mui/x-date-pickers-pro';
import { transQueryDate, transQueryUrlFilter } from '@utils/transtext';
import dayjs, { Dayjs } from 'dayjs';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import {
  DataPagitionValue,
  FilterAllOtions,
  FilterDateType,
  FilterAllSupportOtions,
} from 'types/table';
import useFilterEffect from './useFilterEffect';

interface UseFilterType {
  url: string;
  date?: DateRange<dayjs.Dayjs>;
  setDate?: Dispatch<SetStateAction<DateRange<dayjs.Dayjs>>>;
  filter?: FilterAllOtions | FilterAllSupportOtions;
  setFilter?:
    | Dispatch<SetStateAction<FilterAllOtions>>
    | Dispatch<SetStateAction<FilterAllSupportOtions>>;
  reset?: () => void;
}
const useFilter = (props: UseFilterType) => {
  const router = useRouter();

  const filterReset = useCallback(() => {
    router.push(`${props.url}`);
    if (props.reset) props.reset();
  }, [props, router]);
  /**useFilter 라우터 qush 기능*/
  const routeUrl = useCallback(
    (keyId: string, day: string) => {
      const query = `${keyId}${day}`.substring(1);
      router.push(`${props.url}?${query}`, undefined, {
        shallow: true,
      });
    },
    [props, router],
  );
  /**useFilter date dayToString*/
  const dayToString = (date: DateRange<Dayjs>) => {
    const start = date[0] ? date[0] : dayjs();
    const end = date[1] ? date[1] : dayjs();
    const startFormat = dayjs(start).format('YYYY-MM-DD');
    const endFormat = dayjs(end).format('YYYY-MM-DD');
    const filterDate: FilterDateType = {
      startDate: startFormat,
      endDate: endFormat,
    };
    return filterDate;
  };

  /**useFilter date 업로드 기능*/
  const setInDate = useCallback(
    (date: DateRange<Dayjs>) => {
      if (props.date && props.setDate) {
        const reDate = date;
        props.setDate(reDate);
        const key = props.filter ? transQueryUrlFilter(props.filter) : '';
        const stringDay = dayToString(reDate);
        const day = transQueryDate(stringDay);
        routeUrl(key, day);
      }
    },
    [props, routeUrl],
  );

  /**useFilter filter 업로드 기능*/
  const setInFilter = useCallback(
    (value: DataPagitionValue, keyId: string) => {
      if (props.filter && props.setFilter) {
        const reFilter = {
          ...props.filter,
          [keyId]: keyId === 'page' ? Number(value) - 1 : value,
        };
        props.setFilter(reFilter);
        const key = transQueryUrlFilter(reFilter);
        const stringDay = props.date ? dayToString(props.date) : '';
        const day = stringDay ? transQueryDate(stringDay) : '';
        routeUrl(key, day);
      }
    },
    [props, routeUrl],
  );

  const queryString = () => {
    const key = props.filter ? transQueryUrlFilter(props.filter) : '';
    const stringDay = props.date ? dayToString(props.date) : '';
    const day = stringDay ? transQueryDate(stringDay) : '';
    const query = `${key}${day}`;
    return query;
  };

  useFilterEffect({
    filter: props.filter,
    setFilter(filterState) {
      if (props.setFilter) {
        props.setFilter(filterState);
      }
    },
    setDateString(date) {
      if (props.setDate) {
        props.setDate(date);
      }
    },
  });

  return { setInFilter, setInDate, queryString, filterReset };
};

export default useFilter;
