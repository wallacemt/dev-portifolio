"use client";

import { useOwner } from "@/contexts/OwnerContext";

export function Dashboard() {
  const { logout } = useOwner();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Owner Dashboard</h1>
      <p className="text-gray-600">Welcome to your dashboard!</p>
      <button onClick={logout} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
        Logout
      </button>
    </div>
  );
}
