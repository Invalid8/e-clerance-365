import { Button } from "@nextui-org/react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert";
import { cn } from "@/lib";

interface AlertNotificationProps {
  isOpen: boolean;
  title: string;
  description: string;
  cancelText: string;
  continueText: string;
  classNames?: {
    continueBtn?: string;
    cancelBtn?: string;
  };
  onCancel: () => void;
  onContinue: () => void;
  isCancelDisabled?: boolean;
  isCancelLoad?: boolean;
  isContinueDisabled?: boolean;
  isContinueLoad?: boolean;
}

const AlertNotification: React.FC<AlertNotificationProps> = ({
  isOpen,
  title,
  description,
  cancelText,
  continueText,
  onCancel,
  onContinue,
  isCancelDisabled,
  isCancelLoad,
  isContinueDisabled,
  isContinueLoad,
  classNames,
}) => {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="bg-secondary text-secondary-foreground">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription className="pt-4">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4 gap-3">
          <Button
            className={cn(classNames?.cancelBtn)}
            isDisabled={isCancelDisabled}
            isLoading={isCancelLoad}
            radius="sm"
            onClick={onCancel}
          >
            {cancelText}
          </Button>
          <Button
            className={cn(classNames?.continueBtn)}
            color="primary"
            isDisabled={isContinueDisabled}
            isLoading={isContinueLoad}
            radius="sm"
            onClick={onContinue}
          >
            {continueText}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertNotification;
