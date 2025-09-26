import { toast } from "@/components/ui/use-toast";

export const showSuccess = (message: string) => {
  toast({
    title: "Sucesso!",
    description: message,
    variant: "default",
  });
};

export const showError = (message: string) => {
  toast({
    title: "Erro",
    description: message,
    variant: "destructive",
  });
};

export const showInfo = (message: string) => {
  toast({
    title: "Informação",
    description: message,
    variant: "default",
  });
};

export const showWarning = (message: string) => {
  toast({
    title: "Atenção",
    description: message,
    variant: "default",
  });
};