export default function Loading() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[50vh]">
      <div className="flex flex-col items-center space-y-4">
        {/* Subtle dragon eye glow loader */}
        <div className="w-12 h-12 rounded-full border-2 border-primary/20 border-t-primary animate-spin dragon-glow"></div>
        <p className="text-sm text-muted-foreground animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
