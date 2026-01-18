"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, X, FileIcon, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { uploadSingleFile, uploadMultipleFiles, fileToBase64, filesToBase64 } from "@/services/uploadApi";
import type { UploadResult, UploadOptions } from "@/types/badges";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface FileUploadProps {
  onUploadComplete?: (results: UploadResult[]) => void;
  onUploadError?: (error: string) => void;
  multiple?: boolean;
  accept?: string;
  maxSize?: number; // in MB
  uploadOptions?: UploadOptions;
  className?: string;
  label?: string;
  description?: string;
}

interface FileWithPreview extends File {
  preview?: string;
  uploadResult?: UploadResult;
}

export function FileUpload({
  onUploadComplete,
  onUploadError,
  multiple = false,
  accept = "image/*,application/pdf",
  maxSize = 10,
  uploadOptions,
  className,
  label = "Upload de Arquivos",
  description = "Arraste e solte ou clique para selecionar",
}: FileUploadProps) {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback(
    (selectedFiles: FileList | null) => {
      if (!selectedFiles || selectedFiles.length === 0) return;

      const validFiles: FileWithPreview[] = [];
      const errors: string[] = [];

      Array.from(selectedFiles).forEach((file) => {
        // Check file size
        if (file.size > maxSize * 1024 * 1024) {
          errors.push(`${file.name} excede o tamanho máximo de ${maxSize}MB`);
          return;
        }

        // Create preview for images
        if (file.type.startsWith("image/")) {
          const preview = URL.createObjectURL(file);
          Object.assign(file, { preview });
        }

        validFiles.push(file as FileWithPreview);
      });

      if (errors.length > 0 && onUploadError) {
        onUploadError(errors.join(", "));
      }

      setFiles((prev) => (multiple ? [...prev, ...validFiles] : validFiles));
    },
    [maxSize, multiple, onUploadError],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      handleFileSelect(e.dataTransfer.files);
    },
    [handleFileSelect],
  );

  const handleRemoveFile = useCallback((index: number) => {
    setFiles((prev) => {
      const newFiles = [...prev];
      const file = newFiles[index];
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
      newFiles.splice(index, 1);
      return newFiles;
    });
  }, []);

  const handleUpload = async () => {
    if (files.length === 0) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      if (multiple && files.length > 1) {
        // Multiple upload
        const base64Files = await filesToBase64(files);
        setUploadProgress(50);

        const { results } = await uploadMultipleFiles(base64Files, uploadOptions);
        setUploadProgress(100);

        // Update files with upload results
        setFiles((prev) =>
          prev.map((file, index) => ({
            ...file,
            uploadResult: results[index],
          })),
        );

        if (onUploadComplete) {
          onUploadComplete(results);
        }
      } else {
        // Single upload
        const base64 = await fileToBase64(files[0]);
        setUploadProgress(50);

        const { result } = await uploadSingleFile(base64, uploadOptions);
        setUploadProgress(100);

        // Update file with upload result
        setFiles((prev) => [
          {
            ...prev[0],
            uploadResult: result,
          },
        ]);

        if (onUploadComplete) {
          onUploadComplete([result]);
        }
      }
    } catch (error) {
      if (onUploadError) {
        onUploadError(error instanceof Error ? error.message : "Erro ao fazer upload");
      }
    } finally {
      setUploading(false);
    }
  };

  const allFilesUploaded = files.length > 0 && files.every((file) => file.uploadResult);

  return (
    <div className={cn("space-y-4", className)}>
      <div className="space-y-2">
        <label className="text-sm font-medium">{label}</label>
        <Card
          className={cn(
            "border-2 border-dashed transition-colors cursor-pointer hover:border-primary",
            uploading && "pointer-events-none opacity-50",
          )}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
        >
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <Upload className="h-10 w-10 text-muted-foreground mb-4" />
            <p className="text-sm font-medium mb-1">{description}</p>
            <p className="text-xs text-muted-foreground">
              {accept.split(",").join(", ")} - Max {maxSize}MB
            </p>
          </div>
        </Card>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={(e) => handleFileSelect(e.target.files)}
          disabled={uploading}
        />
      </div>

      {files.length > 0 && (
        <div className="space-y-3">
          {files.map((file, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  {file.preview ? (
                    <div className="relative h-12 w-12 rounded overflow-hidden">
                      <Image src={file.preview} alt={file.name} fill className="h-full w-full object-cover" />
                    </div>
                  ) : (
                    <div className="h-12 w-12 rounded bg-muted flex items-center justify-center">
                      <FileIcon className="h-6 w-6 text-muted-foreground" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>

                {file.uploadResult ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                ) : (
                  !uploading && (
                    <Button variant="ghost" size="icon" onClick={() => handleRemoveFile(index)} disabled={uploading}>
                      <X className="h-4 w-4" />
                    </Button>
                  )
                )}
              </div>
            </Card>
          ))}

          {uploading && (
            <div className="space-y-2">
              <Progress value={uploadProgress} />
              <p className="text-xs text-center text-muted-foreground">Fazendo upload... {uploadProgress}%</p>
            </div>
          )}

          {!allFilesUploaded && (
            <Button onClick={handleUpload} disabled={uploading || files.length === 0} className="w-full">
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Fazendo upload...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Fazer upload {files.length > 1 && `(${files.length} arquivos)`}
                </>
              )}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
