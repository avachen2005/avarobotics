import { useState } from 'react';
import { Login } from './pages/Login';
import { LoginNative } from './pages/LoginNative';
import { LoginFlow } from './pages/LoginFlow';
import { LoginFlowNative } from './pages/LoginFlowNative';
import { LoginFlowI18n } from './pages/LoginFlowI18n';
import { DesignSystem } from './pages/DesignSystem';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'login' | 'login-native' | 'login-flow' | 'login-flow-native' | 'login-flow-i18n' | 'design'>('login-flow-i18n');

  // 簡單的導航切換按鈕
  const NavButton = () => (
    <div className="fixed top-4 right-4 z-50 flex gap-2 flex-wrap justify-end max-w-lg">
      <button
        onClick={() => setCurrentPage('login-flow-i18n')}
        className={`px-3 py-2 rounded-full font-medium transition-all text-xs ${
          currentPage === 'login-flow-i18n'
            ? 'bg-violet-600 text-white shadow-lg'
            : 'bg-white/80 text-slate-700 hover:bg-white backdrop-blur'
        }`}
      >
        🌍 多語言 ⭐
      </button>
      <button
        onClick={() => setCurrentPage('login-flow-native')}
        className={`px-3 py-2 rounded-full font-medium transition-all text-xs ${
          currentPage === 'login-flow-native'
            ? 'bg-violet-600 text-white shadow-lg'
            : 'bg-white/80 text-slate-700 hover:bg-white backdrop-blur'
        }`}
      >
        完整流程（原生）
      </button>
      <button
        onClick={() => setCurrentPage('login-flow')}
        className={`px-3 py-2 rounded-full font-medium transition-all text-xs ${
          currentPage === 'login-flow'
            ? 'bg-violet-600 text-white shadow-lg'
            : 'bg-white/80 text-slate-700 hover:bg-white backdrop-blur'
        }`}
      >
        完整流程（Web）
      </button>
      <button
        onClick={() => setCurrentPage('design')}
        className={`px-3 py-2 rounded-full font-medium transition-all text-xs ${
          currentPage === 'design'
            ? 'bg-violet-600 text-white shadow-lg'
            : 'bg-white/80 text-slate-700 hover:bg-white backdrop-blur'
        }`}
      >
        設計系統
      </button>
    </div>
  );

  return (
    <>
      <NavButton />
      {currentPage === 'login' && <Login />}
      {currentPage === 'login-native' && <LoginNative />}
      {currentPage === 'login-flow' && <LoginFlow />}
      {currentPage === 'login-flow-native' && <LoginFlowNative />}
      {currentPage === 'login-flow-i18n' && <LoginFlowI18n />}
      {currentPage === 'design' && <DesignSystem />}
    </>
  );
}