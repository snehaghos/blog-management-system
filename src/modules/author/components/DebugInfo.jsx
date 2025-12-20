// Temporary debugging component - Add this to AuthorPosts.jsx temporarily to diagnose
export function DebugInfo() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("accessToken");
  const userRole = localStorage.getItem("userRole");

  return (
    <div className="fixed bottom-4 right-4 bg-red-900/90 text-white p-4 rounded-lg text-xs max-w-sm max-h-96 overflow-auto z-50 font-mono">
      <div className="font-bold mb-2">DEBUG INFO</div>
      <div className="space-y-1">
        <div>Token: {token ? "✓" : "✗"}</div>
        <div>Role: {userRole || "N/A"}</div>
        <div>User ID: {user?._id || user?.id || "N/A"}</div>
        <div>User Email: {user?.email || "N/A"}</div>
        <div>User Object:</div>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
    </div>
  );
}
