import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import WSnackBar from './toast/WSnackBar';

const WErrorPage = (props: {
  isError: boolean;
  errMsg: string;
  back?: () => void;
  mode?: string;
}) => {
  const [isErr, setErr] = useState<boolean>(false);
  const router = useRouter();

  const goBack = () => {
    setErr(false);
    if (props.back) {
      props.back();
    } else {
      //TODO: 추후 어디 아파 메인 페이지로 변경할 예정
      router.back();
    }
  };

  useEffect(() => {
    if (props.isError) {
      setErr(props.isError);
    }
  }, [props.isError]);

  if (props.mode) {
    if (props.mode === 'modal') {
      return (
        <WSnackBar
          open={isErr}
          close={goBack}
          type={'error'}
          msg={props.errMsg}
        />
      );
    }
  } else {
    return (
      <>
        isError...
        <WSnackBar
          open={isErr}
          close={goBack}
          type={'error'}
          msg={props.errMsg}
        />
      </>
    );
  }
  return <></>;
};

export default WErrorPage;
