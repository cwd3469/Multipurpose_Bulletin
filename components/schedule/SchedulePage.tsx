import { ContantsLayout } from '@components/common/layout/Layout';
import ScheduleTemplate from './modules/template/ScheduleTemplate';
import { MonthDateType, ProfileType, ScheduleMonthProvider } from './contexts/ScheduleMonth';
import { useApiScheduleList } from './hooks/useApiScheduleList';

export interface DoctorProfileInfo {
  name: string;
}

const SchedulePage = () => {
  const { monthDate, profile } = useApiScheduleList();

  return (
    <ScheduleMonthProvider monthDate={monthDate} profile={profile}>
      <ContantsLayout bg="#F8F8F8" containerColor="#F8F8F8" sx={{ padding: '40px 0px' }}>
        <ScheduleTemplate />
      </ContantsLayout>
    </ScheduleMonthProvider>
  );
};

export default SchedulePage;
