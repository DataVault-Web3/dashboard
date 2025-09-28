"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CheckCircle,
  Download,
  Clock,
  FileText,
  HardDrive,
  Calendar,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PaymentCompletionData {
  content: {
    description: string;
    downloadInstructions: string;
    downloadUrl: string;
    expiresAt: string;
    fileSize: number;
    format: string;
    name: string;
  };
  dataset: string;
}

interface PaymentCompletionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: PaymentCompletionData | null;
}

export function PaymentCompletionDialog({
  open,
  onOpenChange,
  data,
}: PaymentCompletionDialogProps) {
  const [copied, setCopied] = useState(false);

  if (!data) return null;

  const { content, dataset } = data;

  const formatFileSize = (bytes: number) => {
    const sizes = ["Bytes", "KB", "MB", "GB"];
    if (bytes === 0) return "0 Bytes";
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + " " + sizes[i];
  };

  const formatExpiryDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleDownload = () => {
    // Create a temporary link to download the file
    const link = document.createElement("a");
    link.href = content.downloadUrl;
    link.download = `${content.name}.${content.format.toLowerCase()}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Payment Successful!
          </DialogTitle>
          <DialogDescription className="text-lg text-gray-600">
            Your dataset has been purchased and is ready for download
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Dataset Info Card */}
          <Card className="border-green-200 bg-green-50/50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-gray-900">
                  {dataset}
                </CardTitle>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  Purchased
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-600">{content.description}</p>
            </CardContent>
          </Card>

          {/* Download Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Download Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                    <FileText className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {content.name}
                    </p>
                    <p className="text-xs text-gray-500">File Name</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100">
                    <HardDrive className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {formatFileSize(content.fileSize)}
                    </p>
                    <p className="text-xs text-gray-500">File Size</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100">
                    <FileText className="h-4 w-4 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {content.format}
                    </p>
                    <p className="text-xs text-gray-500">Format</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100">
                    <Clock className="h-4 w-4 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {formatExpiryDate(content.expiresAt)}
                    </p>
                    <p className="text-xs text-gray-500">Expires</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Download Instructions */}
          <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100">
                <Clock className="h-3 w-3 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-amber-800">
                  Important Instructions
                </p>
                <p className="text-sm text-amber-700 mt-1">
                  {content.downloadInstructions}
                </p>
              </div>
            </div>
          </div>

          {/* Download URL */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Download URL
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-1 rounded-lg border bg-gray-50 p-3 font-mono text-sm text-gray-600 break-all">
                {`${process.env.NEXT_PUBLIC_API_BASE_URL}${content.downloadUrl}`}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(`${process.env.NEXT_PUBLIC_API_BASE_URL}${content.downloadUrl}`)}
                className="shrink-0"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            onClick={handleDownload}
            className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Dataset
          </Button>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
