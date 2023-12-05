import { createContext, useEffect, useState } from 'react';

interface WaitingUlidType {
  setInUlid: (ulid: string) => void;
  ulid: string;
}

const WaitingUlidContext = createContext<WaitingUlidType>({
  setInUlid: (ulid: string) => {
    return;
  },
  ulid: '',
});

export function WaitingUlidProvider(props: { children: JSX.Element }) {
  const { children } = props;
  const [ulid, setUlid] = useState<string>('');
  const setInUlid = (ulid: string) => setUlid(ulid);
  const value = {
    ulid,
    setInUlid,
  };

  useEffect(() => {
    return () => {
      setUlid('');
    };
  }, []);

  return (
    <WaitingUlidContext.Provider value={value}>
      {children}
    </WaitingUlidContext.Provider>
  );
}
export default WaitingUlidContext;
