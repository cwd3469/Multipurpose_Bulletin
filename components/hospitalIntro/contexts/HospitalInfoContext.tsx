/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { UidList } from '@components/common/fileUpload/types';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

const HospitalInfoContext = createContext<{
  imageSrc: UidList[];
  setImageSrc: Dispatch<SetStateAction<UidList[]>> | undefined;
}>({
  imageSrc: [],
  setImageSrc: undefined,
});

interface Props {
  children: JSX.Element | JSX.Element[];
}

const HospitalInfoProvider = ({ children }: Props): JSX.Element => {
  const [imageSrc, setImageSrc] = useState<UidList[]>([]);

  useEffect(() => {
    return () => {
      setImageSrc([]);
    };
  }, []);

  return (
    <HospitalInfoContext.Provider
      value={{
        imageSrc,
        setImageSrc,
      }}
    >
      {children}
    </HospitalInfoContext.Provider>
  );
};

export { HospitalInfoProvider, HospitalInfoContext };
