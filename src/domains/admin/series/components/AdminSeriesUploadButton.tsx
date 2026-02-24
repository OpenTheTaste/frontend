"use client";

import { UploadButton } from "@admincontents";
import { AdminSeriesUploadModal } from "@adminseries"

export function AdminSeriesUploadButton() {
  return (
    <UploadButton
      label="시리즈 등록"
      renderModal={({ open, onClose }) => (
        <AdminSeriesUploadModal open={open} onClose={onClose} />
      )}
    />
  );
}
