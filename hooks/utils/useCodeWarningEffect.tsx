import useCodeMsgBundle from '@hooks/api/useCodeMsgBundle';
import { useToastContext } from '@hooks/useToastContext';
import { useEffect, useState } from 'react';

interface UseCodeWarningEffectProps {
  code: string;
  codeCallBack?: (code: string) => void;
}
const useCodeWarningEffect = (props: UseCodeWarningEffectProps) => {
  const { code, codeCallBack } = props;
  const [isWarning, setIsWarning] = useState<boolean>(false);
  const toast = useToastContext();
  const msg = useCodeMsgBundle();
  useEffect(() => {
    if (code) {
      if (code !== '0000') {
        toast?.on(msg.errMsg(code), 'info');
        setIsWarning(true);
        if (codeCallBack) {
          codeCallBack(code);
        }
        return;
      }
      setIsWarning(false);
    }
  }, [code, codeCallBack, msg, toast]);

  return { isWarning };
};

export default useCodeWarningEffect;
