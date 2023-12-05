import { InModalAlertProvider } from '@hooks/utils/modal/useInModalAlert';
import { createContext, useContext, useState } from 'react';
import ScheduleModalProcess from '../modals/ScheduleModalProcess';

type ScheduleModalStateContextType = {
  name?: string | undefined;
  setInName?: (stx?: string) => void;
  error?: string | undefined;
  setInError?: (err?: string) => void;
};

const ScheduleModalStateContext = createContext<ScheduleModalStateContextType>({});

export const ScheduleModalStateProvider = (props: { children: JSX.Element }) => {
  const [name, setName] = useState<string>();
  const [error, setError] = useState<string>();
  const setInName = (stx?: string) => setName(stx);
  const setInError = (err?: string) => setError(err);
  return (
    <ScheduleModalStateContext.Provider value={{ name, setInName, error, setInError }}>
      <InModalAlertProvider name={name}>{props.children}</InModalAlertProvider>
    </ScheduleModalStateContext.Provider>
  );
};

const useScheduleModal = () => {
  return useContext(ScheduleModalStateContext);
};

export default useScheduleModal;
