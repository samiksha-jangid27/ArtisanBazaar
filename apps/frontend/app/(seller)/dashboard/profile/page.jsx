/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Calendar,
  UserCircle2,
  LogOut,
  ArrowLeft,
  Save,
  X,
  Edit,
  Package,
  Heart,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

function ProfilePage() {
  const { token, isLoggedIn, logout } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", username: "", gender: "" });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const BASE_URL =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_BACKEND_SERVER_URL
      : process.env.NEXT_PUBLIC_BACKEND_LOCAL_URL;

  const getErrorMessage = (err, fallback = "Something went wrong ❌") => {
    if (err.response?.data?.ERROR) return err.response.data.ERROR;
    if (err.response?.data?.message) return err.response.data.message;
    if (err.message?.includes("timeout")) return "Request timed out. Try again.";
    if (err.request) return "No response from server. Check your network.";
    return fallback;
  };

  useEffect(() => {
    if (!isLoggedIn) {
      toast.error("You must be logged in to access your profile.");
      router.push("/login");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;

      try {
        const res = await axios.get(`${BASE_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 8000,
        });

        if (res.data?.user) {
          setUser(res.data.user);
          setFormData({
            name: res.data.user.name || "",
            username: res.data.user.username || "",
            gender: res.data.user.gender || "",
          });
        } else {
          toast.error("Invalid response format ❌");
          setMessage("Invalid response format ❌");
        }
      } catch (err) {
        const msg = getErrorMessage(err, "Error fetching profile");
        console.error("Profile fetch error:", err);
        setMessage(`❌ ${msg}`);
        if (err.response?.status === 401) {
          toast.error("Session expired. Please log in again.");
          logout();
          router.push("/login");
        } else {
          toast.error(`❌ ${msg}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const handleLogout = () => {
    logout();
    toast.success("You’ve been logged out successfully 👋");
    router.push("/");
  };

  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const res = await axios.put(`${BASE_URL}/api/auth/update`, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        timeout: 8000,
      });

      if (res.data?.user) {
        setUser(res.data.user);
        setEditing(false);
        toast.success("✅ Profile updated successfully!");
        setMessage("✅ Profile updated successfully!");
      } else {
        const msg = res.data?.ERROR || "Failed to update profile ❌";
        toast.error(msg);
        setMessage(`❌ ${msg}`);
      }
    } catch (err) {
      const msg = getErrorMessage(err, "Error updating profile");
      console.error("Update error:", err);
      toast.error(`❌ ${msg}`);
      setMessage(`❌ ${msg}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50 text-gray-600">
        <div className="animate-pulse text-center">
          <p className="text-lg font-semibold text-blue-700">Loading your Artisan Bazaar profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-700 px-4">
        <p className="text-lg">No profile data found ❌</p>
        <div className="mt-4 flex gap-3">
          <button onClick={() => router.push('/login')} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Go to Login</button>
          <button onClick={() => router.push('/')} className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition">Back Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button onClick={() => router.push('/')} className="flex items-center gap-2 text-gray-700 hover:text-blue-700 transition">
              <ArrowLeft size={20} />
              <span className="font-medium">Back to Home</span>
            </button>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-800">Artisan Bazaar</h1>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => router.push('/orders')} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">My Orders</button>
            <button onClick={handleLogout} className="flex items-center gap-2 border border-blue-600 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-50 transition">
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-3">
          {/* Cover */}
          <div className="lg:col-span-1 bg-gradient-to-b from-blue-600 to-blue-400 p-6 flex flex-col items-center justify-center relative">
            <div className="w-36 h-36 rounded-full bg-white shadow-lg -mt-20 flex items-center justify-center border-4 border-white">
              <UserCircle2 size={86} className="text-blue-600" />
            </div>

            <div className="mt-6 text-center text-white">
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-sm opacity-90">@{user.username}</p>
              <p className="mt-2 text-xs italic opacity-90">Handmade & heart-made — for craft lovers</p>
            </div>

            <div className="mt-6 w-full grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="text-2xl font-bold text-white">{user.ordersCount ?? 0}</div>
                <div className="text-xs opacity-90">Orders</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{user.wishlistCount ?? 0}</div>
                <div className="text-xs opacity-90">Wishlist</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{user.rating ?? '—'}</div>
                <div className="text-xs opacity-90">Rating</div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button onClick={() => setEditing(true)} className="bg-white text-blue-700 px-3 py-2 rounded-lg hover:scale-105 transform transition flex items-center gap-2">
                <Edit size={16} />
                Edit
              </button>
              <button onClick={() => router.push('/orders')} className="border border-white text-white px-3 py-2 rounded-lg hover:bg-white/10 transition flex items-center gap-2">
                <Package size={16} />
                Orders
              </button>
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-2 p-8">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-gray-800">Profile Details</h3>
                <p className="text-sm text-gray-500 mt-1">Manage your personal information and account settings.</p>
              </div>

              <div className="hidden sm:flex items-center gap-3">
                <button onClick={handleLogout} className="text-sm border border-blue-500 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-50 transition flex items-center gap-2">
                  <LogOut size={14} />
                  Logout
                </button>
              </div>
            </div>

            {message && (
              <p className={`mt-4 text-sm ${message.includes("✅") ? "text-green-600" : "text-red-600"}`}>{message}</p>
            )}

            {!editing ? (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Mail size={18} className="text-blue-600" />
                    <div>
                      <div className="text-sm text-gray-500">Email</div>
                      <div className="font-medium">{user.email}</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 text-gray-700">
                    <User size={18} className="text-blue-600" />
                    <div>
                      <div className="text-sm text-gray-500">Gender</div>
                      <div className="font-medium">{user.gender || 'Prefer not to say'}</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Calendar size={18} className="text-blue-600" />
                    <div>
                      <div className="text-sm text-gray-500">Joined</div>
                      <div className="font-medium">{new Date(user.createdAt || Date.now()).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 text-gray-700">
                    <span className="font-medium text-gray-500">Role</span>
                    <span className="ml-auto font-semibold text-blue-600 uppercase">{user.role || 'USER'}</span>
                  </div>
                </div>

                <div className="md:col-span-2 flex gap-3">
                  <button onClick={() => setEditing(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
                    <Edit size={16} />
                    Edit Profile
                  </button>

                  <button onClick={() => router.push('/wishlist')} className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition flex items-center gap-2">
                    <Heart size={16} />
                    Wishlist
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleUpdate} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-medium mb-1">Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">Username</label>
                  <input type="text" name="username" value={formData.username} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>

                <div className="md:col-span-2 flex items-center gap-3 mt-4">
                  <button type="submit" disabled={saving} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2 disabled:opacity-60">
                    <Save size={16} />
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>

                  <button type="button" onClick={() => { setEditing(false); setFormData({ name: user.name || '', username: user.username || '', gender: user.gender || '' }); }} className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
                    <X size={16} />
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        <footer className="mt-8 text-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} <span className="text-blue-600 font-semibold">Artisan Bazaar</span> — Curated crafts & gifts
          </p>
        </footer>
      </div>
    </div>
  );
}

export default ProfilePage;
