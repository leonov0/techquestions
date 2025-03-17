export type ActionResponse<T> = SuccessActionResponse<T> | ErrorActionResponse;

type SuccessActionResponse<T> = {
  success: true;
  data: T;
};

type ErrorActionResponse = {
  success: false;
  error: string;
};
