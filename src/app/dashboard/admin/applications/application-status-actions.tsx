"use client";

import { updateJoinApplicationStatus } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Clock, Loader2 } from "lucide-react";
import { useState, useTransition } from "react";

export function ApplicationStatusActions({ id, currentStatus }: { id: string, currentStatus: string }) {
  const [isPending, startTransition] = useTransition();
  const [loadingStatus, setLoadingStatus] = useState<string | null>(null);

  const handleUpdate = (status: string) => {
    setLoadingStatus(status);
    startTransition(async () => {
      await updateJoinApplicationStatus(id, status);
      setLoadingStatus(null);
    });
  };

  return (
    <div className="flex items-center gap-2">
      {currentStatus === "NEW" && (
        <Button 
          size="sm" 
          variant="outline" 
          className="border-amber-500/30 text-amber-500 hover:bg-amber-500/10 hover:text-amber-400 h-8 px-3"
          disabled={isPending}
          onClick={() => handleUpdate("UNDER_REVIEW")}
        >
          {loadingStatus === "UNDER_REVIEW" ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Clock className="w-4 h-4 mr-2" />}
          Under Review
        </Button>
      )}

      {(currentStatus === "NEW" || currentStatus === "UNDER_REVIEW" || currentStatus === "REJECTED") && (
        <Button 
          size="sm" 
          variant="outline"
          className="border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-400 h-8 px-3"
          disabled={isPending}
          onClick={() => handleUpdate("ACCEPTED")}
        >
          {loadingStatus === "ACCEPTED" ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <CheckCircle2 className="w-4 h-4 mr-2" />}
          Accept
        </Button>
      )}

      {(currentStatus === "NEW" || currentStatus === "UNDER_REVIEW" || currentStatus === "ACCEPTED") && (
        <Button 
          size="sm" 
          variant="outline"
          className="border-red-500/30 text-red-500 hover:bg-red-500/10 hover:text-red-400 h-8 px-3"
          disabled={isPending}
          onClick={() => handleUpdate("REJECTED")}
        >
          {loadingStatus === "REJECTED" ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <XCircle className="w-4 h-4 mr-2" />}
          Reject
        </Button>
      )}
    </div>
  );
}