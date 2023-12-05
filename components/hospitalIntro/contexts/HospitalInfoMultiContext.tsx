/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { UidList } from '@components/common/fileUpload/types';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

const HospitalInfoMultiContext = createContext<{
  imageSrc: UidList[];
  setImageSrc: Dispatch<SetStateAction<UidList[]>> | undefined;
}>({
  imageSrc: [],
  setImageSrc: undefined,
});

interface Props {
  children: JSX.Element | JSX.Element[];
}

const HospitalInfoMultiProvider = ({ children }: Props): JSX.Element => {
  const [imageSrc, setImageSrc] = useState<UidList[]>([]);
  useEffect(() => {
    return () => {
      setImageSrc([]);
    };
  }, []);

  return (
    <HospitalInfoMultiContext.Provider
      value={{
        imageSrc,
        setImageSrc,
      }}
    >
      {children}
    </HospitalInfoMultiContext.Provider>
  );
};

export { HospitalInfoMultiProvider, HospitalInfoMultiContext };
