import { type Dispatch, type SetStateAction } from "react";
import {
  AlertDialog as ShancnAlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface AlertDialogProps {
  showDialog: boolean;
  setShowDialog: (show: boolean) => void;
  handleClick: () => void;
  title?: string;
  description?: string;
  cancelText?: string;
  confirmText?: string;
  isLoading?: boolean;
}

const AlertDialog = ({
  showDialog,
  setShowDialog,
  handleClick,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  cancelText = "Cancel",
  confirmText = "Delete",
  isLoading = false,
}: AlertDialogProps) => {
  return (
    <ShancnAlertDialog open={showDialog} onOpenChange={setShowDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700"
            onClick={(e) => {
              e.preventDefault();
              handleClick();
            }}
          >
            {isLoading ? "Deleting..." : confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </ShancnAlertDialog>
  );
};
export default AlertDialog;
