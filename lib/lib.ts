import { toast } from "sonner";

export interface OptionsType {
  customProps?: Partial<Parameters<typeof toast.promise>[1]>;
  successFunction?: (data: unknown) => void;
  errorFunction?: (data: unknown) => void;
}

export function promiseToast(
  promise: Promise<unknown>,
  options: OptionsType = {}
) {
  const { customProps, successFunction, errorFunction } = options;

  toast.promise(promise, {
    ...customProps,
    loading: "Loading...",
    success: (data) => {
      if (successFunction) successFunction(data);
      return data as string;
    },
    error: (data) => {
      if (errorFunction) errorFunction(data);
      return data;
    },
  });
}
