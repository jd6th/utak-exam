import { Toast } from "@radix-ui/react-toast";
import { useToast } from "@/components/ui/use-toast";

const ToastComponent = () => {
  const { toast } = useToast();

  const handleShowToast = () => {
    console.log("test")
    toast({
      title: 'Notification',
      description: 'This is a toast message.',
    });
  };

  return (
    <div>
      <button onClick={handleShowToast}>Show Toast</button>
      <Toast />
    </div>
  );
};


export default ToastComponent;
