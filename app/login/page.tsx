'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Custom Select component wrapper
const CustomSelect = ({ label, value, onChange, options, required }: {
  label: string;
  value: string;
  onChange: (e: { target: { value: string } }) => void;
  options: { value: string; label: string }[];
  required?: boolean;
}) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-300">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <Select value={value} onValueChange={(newValue) => onChange({ target: { value: newValue } })}>
        <SelectTrigger className="w-full bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-400 focus:ring-[var(--cyber-blue)] focus:border-[var(--cyber-blue)]">
          <SelectValue placeholder="Select a role" />
        </SelectTrigger>
        <SelectContent className="bg-gray-800 border-gray-700">
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value} className="text-white hover:bg-gray-700">
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

// Custom Input component wrapper
const CustomInput = ({ label, type, value, onChange, placeholder, required }: {
  label: string;
  type?: string;
  value: string;
  onChange: (e: { target: { value: string } }) => void;
  placeholder?: string;
  required?: boolean;
}) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-300">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <Input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-400 focus:ring-[var(--cyber-blue)] focus:border-[var(--cyber-blue)]"
      />
    </div>
  );
};

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'Analyst'
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Redirect to dashboard
    router.push('/dashboard');
  };

  const roleOptions = [
    { value: 'Admin', label: 'Administrator' },
    { value: 'Analyst', label: 'Security Analyst' },
    { value: 'Observer', label: 'Observer' }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 cyber-glow">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">SafeShield</h1>
          <p className="text-gray-400">Cybersecurity Incident Response Platform</p>
        </div>

        {/* Form */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 shadow-xl">
          <div className="mb-6">
            <div className="flex rounded-lg bg-gray-900/50 p-1">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  isLogin
                    ? 'bg-[var(--cyber-blue)] text-gray-900'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  !isLogin
                    ? 'bg-[var(--cyber-blue)] text-gray-900'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Register
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <CustomInput
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="analyst@safeshield.com"
              required
            />

            <div className="relative">
              <CustomInput
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-8 text-gray-400 hover:text-gray-300"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            <CustomSelect
              label="Role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              options={roleOptions}
              required
            />

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Loading...' : (isLogin ? 'Sign In' : 'Create Account')}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[var(--cyber-blue)] hover:underline font-medium"
              >
                {isLogin ? 'Register here' : 'Sign in here'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}