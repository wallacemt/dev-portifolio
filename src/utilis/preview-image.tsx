import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import Image from "next/image";

export function PreviewImage({
  previewImage,
  setPreviewModalImage,
}: {
  previewImage: string;
  setPreviewModalImage: (image: string) => void;
}) {
  return (
    <Dialog open={!!previewImage} onOpenChange={() => setPreviewModalImage("")}>
      <DialogContent className="flex flex-col">
        <DialogHeader>
          <p className="text-xl font-principal text-roxo100 mb-2">Preview:</p>
        </DialogHeader>
        <div className="mt-2">
          <Image
            src={previewImage}
            height={500}
            width={500}
            alt="Preview em tamanho completo"
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
