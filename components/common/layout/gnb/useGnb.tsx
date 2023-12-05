import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { colors } from '../../../../styles';
export const useGnb = () => {
  const { pathname } = useRouter();
  const [path, setPath] = useState<string[]>([]);

  const activePathname = useCallback(() => {
    const path = pathname.split('/');
    setPath(path);
  }, [pathname]);

  const itemActive = useCallback(
    (name: string) => {
      const style = {
        color: path[1] === name ? colors.gray_01 : colors.gray_05,
        fontWeight: path[1] === name ? 'bold' : '400',
      };
      return style;
    },
    [path],
  );

  const itemListActive = (name: string) => {
    if (path[1] === name) {
      const page = path[path.length - 1];
      return page ? page : 'index';
    }
    return '';
  };

  const itmeMenuActive = (name: string) => {
    const page = path[path.length - 1];
    const style = {
      color: page === name ? colors.gray_01 : colors.gray_07,
      fontWeight: page === name ? 'bold' : '400',
    };
    return style;
  };

  const childrenPath = (length: number) => {
    const page = path[length];
    return page;
  };

  const childrenPathActive = (name: string, length: number) => {
    const page = path[length];
    const style = {
      color: page === name ? colors.gray_01 : colors.gray_07,
      fontWeight: page === name ? 'bold' : '400',
    };
    return style;
  };

  const activeChildren = (children: string, parents: string, index: number) => {
    if (childrenPath(index) === children) {
      return childrenPathActive(children, index);
    } else {
      return itmeMenuActive(parents);
    }
  };

  useEffect(() => {
    activePathname();
  }, [activePathname]);

  return {
    itemListActive,
    itemActive,
    itmeMenuActive,
    childrenPath,
    childrenPathActive,
    activeChildren,
  };
};
