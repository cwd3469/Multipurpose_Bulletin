/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';

export interface UseDropDrag {
  onChangeFile: (e: ChangeEvent<HTMLInputElement> | any) => void;
}
const useDropDrag = (props: UseDropDrag) => {
  const { onChangeFile } = props;
  const dragRef = useRef<HTMLLabelElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleDragIn = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  const handleDragOut = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer?.files) {
      setIsDragging(true);
    }
  }, []);
  const handleDrop = useCallback(
    (e: DragEvent): void => {
      e.preventDefault();
      e.stopPropagation();

      onChangeFile(e);
      setIsDragging(false);
    },
    [onChangeFile],
  );

  const initDragEvents = useCallback((): void => {
    if (dragRef.current !== null) {
      dragRef.current.addEventListener('dragenter', handleDragIn);
      dragRef.current.addEventListener('dragleave', handleDragOut);
      dragRef.current.addEventListener('dragover', handleDragOver);
      dragRef.current.addEventListener('drop', handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  const resetDragEvents = useCallback((): void => {
    if (dragRef.current !== null) {
      dragRef.current.removeEventListener('dragenter', handleDragIn);
      dragRef.current.removeEventListener('dragleave', handleDragOut);
      dragRef.current.removeEventListener('dragover', handleDragOver);
      dragRef.current.removeEventListener('drop', handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  useEffect(() => {
    initDragEvents();
    return () => resetDragEvents();
  }, [initDragEvents, resetDragEvents]);

  return {
    dragRef,
    isDragging,
  };
};

export default useDropDrag;
