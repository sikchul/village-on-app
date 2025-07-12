import { CommonError, CommonNoData } from '@app/exception';
import { ListLoading } from '@app/loading';
import type { ReactNode } from 'react';

interface UseProfileExceptionHandlerParams {
  isLoading?: boolean;
  isError?: boolean;
  isEmpty?: boolean;
  title?: ReactNode;
  action?: () => Promise<void>;
}

export default function useProfileExceptionHandler({
  isLoading,
  isError,
  isEmpty,
  title,
  action = async () => {}
}: UseProfileExceptionHandlerParams) {
  if (isLoading) return <ListLoading />;
  else if (isError) return <CommonError action={action} />;
  else if (isEmpty) return <CommonNoData title={title} />;

  return null;
}
