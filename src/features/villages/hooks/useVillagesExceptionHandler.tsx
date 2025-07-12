import { CommonError, CommonNoSearchData } from '@app/exception';
import { ListLoading } from '@app/loading';

interface UseVillagesExceptionHandlerParams {
  isLoading?: boolean;
  isError?: boolean;
  isEmpty?: boolean;
  action?: () => Promise<void>;
}

export default function useVillagesExceptionHandler({
  isLoading,
  isError,
  isEmpty,
  action = async () => {}
}: UseVillagesExceptionHandlerParams) {
  if (isLoading) return <ListLoading />;
  else if (isError) return <CommonError action={action} />;
  else if (isEmpty) return <CommonNoSearchData action={action} />;

  return null;
}
