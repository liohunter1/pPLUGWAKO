import { Wine, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface AgeVerificationModalProps {
  open: boolean;
  onVerify: () => void;
  onDeny: () => void;
}

export default function AgeVerificationModal({ open, onVerify, onDeny }: AgeVerificationModalProps) {
  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent 
        className="sm:max-w-md bg-card border-border"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        data-testid="age-verification-modal"
      >
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Wine className="h-8 w-8 text-primary" />
          </div>
          <DialogTitle className="font-serif text-2xl text-white">
            Age Verification Required
          </DialogTitle>
          <DialogDescription className="text-muted-foreground pt-2">
            You must be at least 18 years old to access this website and purchase alcohol products.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-6">
          <div className="p-4 bg-muted/50 rounded-lg border border-border flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground">
              By entering this website, you agree that you are of legal drinking age in Kenya (18+) 
              and accept our Terms of Service.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              onClick={onDeny}
              className="border-border text-muted-foreground hover:text-white hover:border-destructive"
              data-testid="age-deny-button"
            >
              I'm Under 18
            </Button>
            <Button
              onClick={onVerify}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              data-testid="age-verify-button"
            >
              I'm 18 or Older
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
