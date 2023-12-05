import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { WAlertInfo } from 'types/common';

interface InModalAlertContextType {
  onSetModalToast: (prams?: WAlertInfo, componentName?: string) => void;
  onDeleteModalToast?: () => void;
  modalToast?: WAlertInfo;
}

const InModalAlertContext = createContext<InModalAlertContextType>({
  onSetModalToast: (prams?: WAlertInfo) => undefined,
});

export function InModalAlertProvider(props: { children: JSX.Element; name?: string }) {
  const { children, name } = props;
  const [modalToast, setModalToast] = useState<WAlertInfo>();
  const onSetModalToast = useCallback(
    (prams?: WAlertInfo, componentName?: string) => {
      if (!name) return;
      if (!componentName) return;
      if (componentName === name) {
        setModalToast(
          prams
            ? {
                msg: prams.msg,
                on: prams.on,
                severity: prams.severity,
              }
            : undefined,
        );
      }
    },
    [name],
  );
  const onDeleteModalToast = useCallback(() => {
    setModalToast(undefined);
  }, []);
  const value = {
    modalToast,
    onSetModalToast,
    onDeleteModalToast,
  };

  return <InModalAlertContext.Provider value={value}>{children}</InModalAlertContext.Provider>;
}

const useInModalAlert = () => {
  const info = useContext(InModalAlertContext);
  return info;
};

export default useInModalAlert;
