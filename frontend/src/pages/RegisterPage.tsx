import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import useAuthStore from "../store/authStore";
import type { User } from "../types";

interface PasswordStrength {
  hasMinLength: boolean;
  hasUppercase: boolean;
  hasNumber: boolean;
  hasSymbol: boolean;
}

const checkPasswordStrength = (password: string): PasswordStrength => ({
  hasMinLength: password.length >= 8,
  hasUppercase: /[A-Z]/.test(password),
  hasNumber: /[0-9]/.test(password),
  hasSymbol: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
});

const isStrongPassword = (strength: PasswordStrength): boolean =>
  Object.values(strength).every(Boolean);

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuthStore();
  const navigate = useNavigate();
  const strength = checkPasswordStrength(password);
  const strongEnough = isStrongPassword(strength);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!strongEnough) {
      setError("Please meet all password requirements before submitting");
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.post<User>("/auth/register", {
        name,
        email,
        password,
      });
      login(data);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const requirements = [
    { label: "At least 8 characters", met: strength.hasMinLength },
    { label: "One uppercase letter", met: strength.hasUppercase },
    { label: "One number", met: strength.hasNumber },
    { label: "One symbol", met: strength.hasSymbol },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex">
        <div className="hidden md:flex flex-col w-1/2 bg-gradient-to-br from-blue-600 to-indigo-800 relative overflow-hidden">
          <img
            src="/dev-image.png"
            alt="Registration page image"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-90"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />

          <div className="absolute bottom-0 left-0 right-0 p-10 z-10">
            <h1 className="font-clash font-semibold text-white text-2xl">
              Flagit
            </h1>

            <p className="text-blue-200 text-sm leading-relaxed">
              Manage your team's issues, track progress, and ship faster with a
              clear overview of everything that needs attention.
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-10">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              Create an account
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Fill in the details below to get started
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-5 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Amila Sampath"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="example@gmail.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />

              {password.length > 0 && (
                <div className="mt-2 grid grid-cols-2 gap-1">
                  {requirements.map((req) => (
                    <div
                      key={req.label}
                      className="flex items-center gap-1.5 text-xs"
                    >
                      <span
                        className={req.met ? "text-green-500" : "text-red-400"}
                      >
                        {req.met ? "✓" : "✗"}
                      </span>
                      <span
                        className={req.met ? "text-green-600" : "text-gray-400"}
                      >
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !strongEnough}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2.5 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md mt-2"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-500 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
