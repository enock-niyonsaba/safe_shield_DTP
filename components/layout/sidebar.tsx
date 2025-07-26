'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Shield,
  LayoutDashboard,
  AlertTriangle,
  FileText,
  Activity,
  Wrench,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Report Incident', href: '/report', icon: AlertTriangle },
  { name: 'View Reports', href: '/incidents', icon: FileText },
  { name: 'System Logs', href: '/logs', icon: Activity },
  { name: 'Tools Used', href: '/tools', icon: Wrench },
  { name: 'Team Chat', href: '/chat', icon: MessageSquare },
];

export default function Sidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
        >
          {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={cn(
        'fixed inset-y-0 left-0 z-40 w-64 bg-gray-900/95 backdrop-blur-sm border-r border-gray-700 transform transition-transform lg:translate-x-0',
        isMobileOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center px-6 py-4 border-b border-gray-700">
            <Shield className="h-8 w-8 text-[var(--cyber-blue)]" />
            <span className="ml-3 text-xl font-bold text-white">SafeShield</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-cyan-900/50 text-[var(--cyber-blue)] border border-cyan-500/30 cyber-glow'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  )}
                  onClick={() => setIsMobileOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className="px-4 py-4 border-t border-gray-700">
            <div className="flex items-center px-3 py-2 rounded-lg bg-gray-800/50">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                  <span className="text-sm font-medium text-white">JD</span>
                </div>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-white">John Doe</p>
                <p className="text-xs text-gray-400">Security Analyst</p>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <Link
                href="/settings"
                className="flex items-center px-3 py-2 text-sm text-gray-300 rounded-lg hover:text-white hover:bg-gray-800 transition-colors"
              >
                <Settings className="mr-3 h-4 w-4" />
                Settings
              </Link>
              <Link
                href="/login"
                className="flex items-center px-3 py-2 text-sm text-gray-300 rounded-lg hover:text-white hover:bg-gray-800 transition-colors"
              >
                <LogOut className="mr-3 h-4 w-4" />
                Sign out
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-gray-900/50 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}