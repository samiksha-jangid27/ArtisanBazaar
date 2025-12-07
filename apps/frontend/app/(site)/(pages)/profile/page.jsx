"use client";

import { useAuth } from "@/hooks/useAuth";

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user)
    return <p className="pt-40 px-6">Please login to view your profile.</p>;

  return (
    <div className="max-w-xl mx-auto px-6 pt-32 pb-20">
      <h1 className="text-3xl font-semibold mb-6">My Profile</h1>

      <div className="border rounded-xl p-6 shadow bg-white">
        <p className="mb-3">
          <span className="font-medium">Name:</span> {user.name}
        </p>

        <p className="mb-3">
          <span className="font-medium">Username:</span> {user.username}
        </p>

        <p className="mb-3">
          <span className="font-medium">Email:</span> {user.email}
        </p>

        <p className="">
          <span className="font-medium">Role:</span> {user.role}
        </p>
      </div>
    </div>
  );
}
