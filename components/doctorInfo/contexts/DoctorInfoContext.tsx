/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { UidList } from '@components/common/fileUpload/types';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

const DoctorInfoContext = createContext<{
  imageSrc: UidList[];
  setImageSrc: Dispatch<SetStateAction<UidList[]>> | undefined;
}>({
  imageSrc: [],
  setImageSrc: undefined,
});

interface Props {
  children: JSX.Element | JSX.Element[];
}

const DoctorInfoProvider = ({ children }: Props): JSX.Element => {
  const [imageSrc, setImageSrc] = useState<UidList[]>([]);

  return (
    <DoctorInfoContext.Provider
      value={{
        imageSrc,
        setImageSrc,
      }}
    >
      {children}
    </DoctorInfoContext.Provider>
  );
};

export { DoctorInfoProvider, DoctorInfoContext };
