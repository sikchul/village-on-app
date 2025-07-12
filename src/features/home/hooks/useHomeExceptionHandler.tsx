import { CommonError } from '@app/exception';
import { ListLoading } from '@app/loading';

interface UseHomeExceptionHandlerParams {
  isLoading?: boolean;
  isError?: boolean;
  isEmpty?: boolean;
  action?: () => Promise<void>;
}

export default function useHomeExceptionHandler({
  isLoading,
  isError,
  isEmpty,
  action = async () => {}
}: UseHomeExceptionHandlerParams) {
  if (isLoading) return <ListLoading />;
  else if (isError || isEmpty) return <CommonError action={action} />;

  return null;
}
