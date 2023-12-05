import { useState } from 'react';
import useScheduleDto from './useScheduleDto';
import { useMutation } from 'react-query';
import { apiScheduleReservePost } from '@hooks/api/hospitalDoctor/doctorSchedule';
import { useDebounceEffect } from 'ahooks';
import { ReserveCheckArreyType } from '../modals/ScheduleReserveCheckModal';

export type ScheduleReserveeDto = {
  doctorAccountUlid: string;
  startDate: string;
  endDate: string;
};

const useServerReserveEffect = (props: { handleClose: () => void; mode?: 'modify' | 'delete' }) => {
  const { dto: scheduleDto, onWarning, onError } = useScheduleDto({ ...props });
  const [page, setPage] = useState<string>('1');
  const [totalPages, setTotalPages] = useState<number>(0);
  const [tableContent, setTable] = useState<ReserveCheckArreyType[]>([]);
  const { mutate } = useMutation(apiScheduleReservePost);
  const setInPage = (pageNum: number) => {
    const pageStr = String(pageNum);
    setPage(pageStr);
  };

  const postScheduleReserve = (params: { pageStr: string }) => {
    const { pageStr } = params;
    const dto: ScheduleReserveeDto = scheduleDto.reserve;
    const query = `?page=${Number(pageStr) - 1}&size=8`;
    mutate(
      { data: dto, query: query },
      {
        onSuccess(data, variables, context) {
          const code = data.data.code;
          if (code !== '0000') return onWarning(code);
          const content = data.data.data.page.content;
          const totalPages = data.data.data.page.totalPages;
          setTable(content);
          setTotalPages(totalPages);
          return;
        },
        onError(error, variables, context) {
          onError('예약 변경');
          return;
        },
      },
    );
  };

  useDebounceEffect(
    () => {
      postScheduleReserve({ pageStr: page });
    },
    [page],
    {
      wait: 200,
    },
  );

  return { page, setInPage, tableContent, totalPages };
};

export default useServerReserveEffect;
