

import { useToast } from "@/contexts/ToastContext";

const showSuccessToast = (message) => {
  const { toast } = useToast();
  toast.success(message);
};

const showErrorToast = (message) => {
  const { toast } = useToast();
  toast.error(message);
};

const showLoadingToast = (message) => {
  const { toast } = useToast();
  toast.loading(message);
};

export { showSuccessToast, showErrorToast, showLoadingToast };
