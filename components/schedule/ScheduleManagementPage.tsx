import { ContantsLayout } from '@components/common/layout/Layout';
import { useApiScheduleList } from './hooks/useApiScheduleList';
import { MonthDateType, ProfileType, ScheduleMonthProvider } from './contexts/ScheduleMonth';
import ScheduleMgtTemplate from './modules/template/ScheduleMgtTemplate';

export interface DoctorProfileInfo {
  name: string;
}

const ScheduleManagementPage = () => {
  const { monthDate, profile } = useApiScheduleList();

  return (
    <ScheduleMonthProvider monthDate={monthDate} profile={profile}>
      <ContantsLayout bg="#F8F8F8" containerColor="#F8F8F8" sx={{ padding: '40px 0px' }}>
        <ScheduleMgtTemplate />
      </ContantsLayout>
    </ScheduleMonthProvider>
  );
};

export default ScheduleManagementPage;
