import { LiquidGlass } from "@/components/shared/liquid-glass";
import { EmptyState } from "@/components/shared/empty-state";

export const dynamic = "force-dynamic";

export default function AdminenquiriesPage() {
  return (
    <div className="max-w-6xl space-y-8 animate-in fade-in duration-500">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2 capitalize">enquiries</h1>
          <p className="text-muted-foreground">Manage enquiries data.</p>
        </div>
      </header>
      <LiquidGlass className="p-6">
        <EmptyState 
          title="No enquiries Found"
          description="This module is currently empty or pending database connection."
        />
      </LiquidGlass>
    </div>
  );
}
