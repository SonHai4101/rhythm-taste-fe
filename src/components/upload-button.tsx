import { Button } from "./ui/button";
import type { UploadHookControl } from "@better-upload/client";
import { Loader2, Plus, Upload } from "lucide-react";
import { useId } from "react";

type UploadButtonProps = {
  control: UploadHookControl<true>; // Changed to support multiple files
  id?: string;
  accept?: string;
  metadata?: Record<string, unknown>;
  uploadOverride?: (
    ...args: Parameters<UploadHookControl<true>["upload"]>
  ) => void;

  // Add any additional props you need.
  type?: "default" | "custom";
};

export function UploadButton({
  control: { upload, isPending },
  id: _id,
  accept,
  metadata,
  uploadOverride,
  type = "default",
}: UploadButtonProps) {
  const id = useId();

  return (
    <Button disabled={isPending} className="relative" type="button">
      <label htmlFor={_id || id} className="absolute inset-0 cursor-pointer">
        <input
          id={_id || id}
          className="absolute inset-0 size-0 opacity-0"
          type="file"
          accept={accept}
          multiple
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0 && !isPending) {
              if (uploadOverride) {
                uploadOverride(e.target.files, { metadata });
              } else {
                upload(e.target.files, { metadata });
              }
            }
            e.target.value = "";
          }}
        />
      </label>
      {isPending ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          {type === "default" ? "Upload file" : "Add Your First Song"}
        </>
      ) : (
        <>
          {type === "default" ? (
            <Upload className="size-4" />
          ) : (
            <Plus className="size-4" />
          )}
          {type === "default" ? "Upload file" : "Add Your First Song"}
        </>
      )}
    </Button>
  );
}
