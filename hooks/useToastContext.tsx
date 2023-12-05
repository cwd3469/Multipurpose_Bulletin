import WSnackBar from '../components/common/modal/toast/WSnackBar';
import { AlertColor } from '@mui/material/Alert';
import { createContext, useCallback, useContext, useState } from 'react';
import { UseToastInterface } from '../types/common';

export const SnackBarContext = createContext<UseToastInterface | null>(null);

export const ToastContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [snackOpen, setOpen] = useState<boolean>(false);
  const [snackMsg, setMsg] = useState<string>('메시지를 입력해주세요');
  const [snackType, setType] = useState<AlertColor>('info');

  const toastOn = useCallback((msg: string, type: AlertColor) => {
    setMsg(msg);
    setType(type);
    setOpen(true);
  }, []);

  const value = {
    on: toastOn,
  };

  return (
    <SnackBarContext.Provider value={value ? value : null}>
      <>
        {children}
        <WSnackBar
          open={snackOpen}
          msg={snackMsg}
          type={snackType}
          close={() => {
            setOpen(false);
          }}
        />
      </>
    </SnackBarContext.Provider>
  );
};

export function useToastContext() {
  return useContext(SnackBarContext);
}
