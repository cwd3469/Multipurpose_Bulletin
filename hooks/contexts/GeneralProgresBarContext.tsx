import { Backdrop } from '@mui/material';
import ProgressBarCircular from '@components/common/feedback/ProgressBarCircular';
import { createContext, useCallback, useState } from 'react';

interface GeneralProgresBarContextType {
  generalProgressBarOn: (boo: boolean) => void;
}

const GeneralProgresBarContext = createContext<GeneralProgresBarContextType>({
  generalProgressBarOn: (boo: boolean) => {
    return;
  },
});

export function GeneralProgresBarProvider(props: { children: JSX.Element }) {
  const { children } = props;
  const [progressBarOn, setProgressBarOn] = useState<boolean>(false);
  const generalProgressBarOn = useCallback((boo: boolean) => {
    setProgressBarOn(boo);
  }, []);
  const value = {
    generalProgressBarOn,
  };

  return (
    <GeneralProgresBarContext.Provider value={value}>
      {children}
      <Backdrop
        className="generalProgresBar"
        sx={{
          color: '#fff',
          zIndex: 99999,
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
        }}
        open={progressBarOn}
      >
        <ProgressBarCircular />
      </Backdrop>
    </GeneralProgresBarContext.Provider>
  );
}
export default GeneralProgresBarContext;
