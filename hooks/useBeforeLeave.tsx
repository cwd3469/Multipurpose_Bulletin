/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useCallback } from 'react';

const useBeforeLeave = (onLeave: () => void) => {
  // 핸들러 함수 검사
  if (typeof onLeave !== 'function') {
    return;
  }
  // 마우스가 위로 벗어난 경우에만 실행
  const handle = useCallback(
    (event: any) => {
      const { clientY } = event;
      if (clientY <= 0) {
        onLeave();
      }
    },
    [onLeave],
  );

  // side-effect로 리스너를 달아줌.
  useEffect(() => {
    document.addEventListener('mouseleave', handle);
    // 컴포넌트가 unMount되면리스너 제거
    return () => {
      document.removeEventListener('mouseleave', handle);
    };
  }, [handle]);
};

export default useBeforeLeave;
