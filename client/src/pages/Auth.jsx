import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Auth() {
  const [activeTab, setActiveTab] = useState('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  // Form states
  const [signinData, setSigninData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
  });

  const switchTab = (tab) => {
    setActiveTab(tab);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Call the login function from auth context
      await login(signinData.email, signinData.password);
      // If successful, redirect to home
      navigate('/');
    } catch (err) {
      // Handle error (e.g., show message)
      console.error('Login failed:', err);
      // Optionally, set an error state to show in UI
      // For now, just log and keep loading false
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirm) {
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setActiveTab('signin');
    }, 1200);
  };

  return (
    <main className="flex flex-col md:flex-row min-h-screen">
      {/* ──────────────── Left Side: Hero Panel ──────────────── */}
      <section className="hidden md:flex flex-1 relative items-center justify-center p-margin-desktop overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #131b2e 0%, #000000 100%)',
        }}
      >
        {/* Dot-grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Floating gradient orbs for depth */}
        <div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl opacity-15"
          style={{ background: 'radial-gradient(circle, #6063ee, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full blur-3xl opacity-10"
          style={{ background: 'radial-gradient(circle, #89ceff, transparent 70%)' }}
        />

        <div className="relative z-10 max-w-lg text-left">
          {/* Brand Logo */}
          <div className="mb-stack-lg flex items-center gap-stack-sm">
            <div className="w-12 h-12 bg-primary flex items-center justify-center rounded-lg border border-primary-fixed-dim">
              <span className="material-symbols-outlined text-white text-3xl">deployed_code</span>
            </div>
            <span className="font-headline-md text-headline-md font-bold text-white tracking-tight">
              EnterpriseCore
            </span>
          </div>

          <h1 className="font-headline-xl text-headline-xl text-white mb-stack-md leading-tight">
            Enterprise Product Console
          </h1>

          <p className="font-body-lg text-body-lg text-on-primary-container leading-relaxed mb-stack-lg max-w-md">
            Streamline your technical product lifecycle at scale. Orchestrate
            deployments, monitor performance, and manage infrastructure with
            precision.
          </p>

          {/* Feature badges */}
          <div className="grid grid-cols-2 gap-stack-md">
            <div className="p-stack-md rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm">
              <span className="material-symbols-outlined text-tertiary-fixed-dim mb-stack-xs block">
                security
              </span>
              <p className="font-label-md text-label-md text-white/80">SOC2 Compliant</p>
            </div>
            <div className="p-stack-md rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm">
              <span className="material-symbols-outlined text-tertiary-fixed-dim mb-stack-xs block">
                bolt
              </span>
              <p className="font-label-md text-label-md text-white/80">Sub-100ms Latency</p>
            </div>
          </div>
        </div>

        {/* Bottom tagline */}
        <div className="absolute bottom-margin-desktop left-margin-desktop">
          <p className="font-label-sm text-label-sm text-on-primary-container opacity-50 uppercase tracking-widest">
            Build. Scale. Secure.
          </p>
        </div>
      </section>

      {/* ──────────────── Right Side: Auth Form ──────────────── */}
      <section className="flex-1 flex items-center justify-center p-margin-mobile md:p-margin-desktop bg-surface-container-lowest">
        <div className="w-full max-w-md space-y-stack-lg">
          {/* Mobile Logo */}
          <div className="md:hidden flex items-center gap-stack-sm mb-stack-lg">
            <div className="w-10 h-10 bg-primary flex items-center justify-center rounded">
              <span className="material-symbols-outlined text-white">deployed_code</span>
            </div>
            <span className="font-headline-md text-headline-md font-bold text-primary">
              EnterpriseCore
            </span>
          </div>

          {/* Heading */}
          <div className="space-y-stack-sm text-center md:text-left">
            <h2 className="font-headline-lg text-headline-lg text-on-surface">
              Welcome to the Console
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              {activeTab === 'signin'
                ? 'Sign in to manage your technical products.'
                : 'Create an account to get started.'}
            </p>
          </div>

          {/* ── Tab Switcher ── */}
          <div className="flex border-b border-outline-variant">
            <button
              className={`flex-1 py-stack-sm font-label-md text-label-md transition-all duration-200 cursor-pointer ${
                activeTab === 'signin'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-outline'
              }`}
              onClick={() => switchTab('signin')}
            >
              SIGN IN
            </button>
            <button
              className={`flex-1 py-stack-sm font-label-md text-label-md transition-all duration-200 cursor-pointer ${
                activeTab === 'signup'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-outline'
              }`}
              onClick={() => switchTab('signup')}
            >
              SIGN UP
            </button>
          </div>

          {/* ── Forms Container ── */}
          <div className="relative min-h-[380px]" ref={formRef}>
            {/* Sign In Form */}
            <form
              className={`space-y-stack-md transition-all duration-300 ${
                activeTab === 'signin'
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 absolute inset-x-0 -translate-y-2 pointer-events-none'
              }`}
              onSubmit={handleSignIn}
            >
              {/* Email */}
              <div className="space-y-stack-xs">
                <label
                  htmlFor="signin-email"
                  className="font-label-md text-label-md text-on-surface-variant"
                >
                  EMAIL ADDRESS
                </label>
                <input
                  id="signin-email"
                  type="email"
                  placeholder="name@company.com"
                  value={signinData.email}
                  onChange={(e) =>
                    setSigninData({ ...signinData, email: e.target.value })
                  }
                  className="w-full h-10 px-stack-sm border border-outline-variant rounded-lg font-body-md text-body-md bg-surface-container-lowest text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary-container/30 focus:border-secondary-container transition-all"
                />
              </div>

              {/* Password */}
              <div className="space-y-stack-xs">
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="signin-password"
                    className="font-label-md text-label-md text-on-surface-variant"
                  >
                    PASSWORD
                  </label>
                  <button
                    type="button"
                    className="text-secondary font-label-md text-label-md hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    id="signin-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={signinData.password}
                    onChange={(e) =>
                      setSigninData({ ...signinData, password: e.target.value })
                    }
                    className="w-full h-10 px-stack-sm pr-10 border border-outline-variant rounded-lg font-body-md text-body-md bg-surface-container-lowest text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary-container/30 focus:border-secondary-container transition-all"
                  />
                  <button
                    type="button"
                    className="absolute right-stack-sm top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="material-symbols-outlined text-body-lg">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-primary text-on-primary rounded-lg font-body-md font-semibold hover:bg-primary-container transition-all shadow-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading && activeTab === 'signin' ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Signing in…
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Sign Up Form */}
            <form
              className={`space-y-stack-md transition-all duration-300 ${
                activeTab === 'signup'
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 absolute inset-x-0 -translate-y-2 pointer-events-none'
              }`}
              onSubmit={handleSignUp}
            >
              {/* Full Name */}
              <div className="space-y-stack-xs">
                <label
                  htmlFor="signup-name"
                  className="font-label-md text-label-md text-on-surface-variant"
                >
                  FULL NAME
                </label>
                <input
                  id="signup-name"
                  type="text"
                  placeholder="John Doe"
                  value={signupData.name}
                  onChange={(e) =>
                    setSignupData({ ...signupData, name: e.target.value })
                  }
                  className="w-full h-10 px-stack-sm border border-outline-variant rounded-lg font-body-md text-body-md bg-surface-container-lowest text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary-container/30 focus:border-secondary-container transition-all"
                />
              </div>

              {/* Work Email */}
              <div className="space-y-stack-xs">
                <label
                  htmlFor="signup-email"
                  className="font-label-md text-label-md text-on-surface-variant"
                >
                  WORK EMAIL
                </label>
                <input
                  id="signup-email"
                  type="email"
                  placeholder="name@company.com"
                  value={signupData.email}
                  onChange={(e) =>
                    setSignupData({ ...signupData, email: e.target.value })
                  }
                  className="w-full h-10 px-stack-sm border border-outline-variant rounded-lg font-body-md text-body-md bg-surface-container-lowest text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary-container/30 focus:border-secondary-container transition-all"
                />
              </div>

              {/* Password + Confirm */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
                <div className="space-y-stack-xs">
                  <label
                    htmlFor="signup-password"
                    className="font-label-md text-label-md text-on-surface-variant"
                  >
                    PASSWORD
                  </label>
                  <div className="relative">
                    <input
                      id="signup-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={signupData.password}
                      onChange={(e) =>
                        setSignupData({ ...signupData, password: e.target.value })
                      }
                      className="w-full h-10 px-stack-sm pr-10 border border-outline-variant rounded-lg font-body-md text-body-md bg-surface-container-lowest text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary-container/30 focus:border-secondary-container transition-all"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <span className="material-symbols-outlined text-body-md">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>
                <div className="space-y-stack-xs">
                  <label
                    htmlFor="signup-confirm"
                    className="font-label-md text-label-md text-on-surface-variant"
                  >
                    CONFIRM
                  </label>
                  <div className="relative">
                    <input
                      id="signup-confirm"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={signupData.confirm}
                      onChange={(e) =>
                        setSignupData({ ...signupData, confirm: e.target.value })
                      }
                      className="w-full h-10 px-stack-sm pr-10 border border-outline-variant rounded-lg font-body-md text-body-md bg-surface-container-lowest text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary-container/30 focus:border-secondary-container transition-all"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      <span className="material-symbols-outlined text-body-md">
                        {showConfirmPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Password mismatch hint */}
              {signupData.confirm && signupData.password !== signupData.confirm && (
                <p className="text-error font-label-sm text-label-sm">
                  Passwords do not match.
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-primary text-on-primary rounded-lg font-body-md font-semibold hover:bg-primary-container transition-all shadow-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-stack-sm"
              >
                {isLoading && activeTab === 'signup' ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Creating account…
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>
          </div>

          {/* ── Separator ── */}
          <div className="relative flex items-center py-stack-sm">
            <div className="flex-grow border-t border-outline-variant" />
            <span className="flex-shrink mx-4 font-label-md text-label-md text-on-surface-variant">
              OR CONTINUE WITH
            </span>
            <div className="flex-grow border-t border-outline-variant" />
          </div>

          {/* ── Social Auth ── */}
          <div className="grid grid-cols-2 gap-stack-md">
            <button
              type="button"
              className="flex items-center justify-center gap-stack-sm h-11 border border-outline-variant rounded-lg bg-surface-container-lowest hover:bg-surface-container transition-colors group cursor-pointer"
            >
              {/* GitHub SVG Icon */}
              <svg className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span className="font-label-md text-label-md text-on-surface">GITHUB</span>
            </button>

            <button
              type="button"
              className="flex items-center justify-center gap-stack-sm h-11 border border-outline-variant rounded-lg bg-surface-container-lowest hover:bg-surface-container transition-colors group cursor-pointer"
            >
              {/* Google SVG Icon */}
              <svg className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span className="font-label-md text-label-md text-on-surface">GOOGLE</span>
            </button>
          </div>

          {/* ── Legal ── */}
          <p className="font-label-sm text-label-sm text-on-surface-variant text-center md:text-left pt-stack-md">
            By continuing, you agree to EnterpriseCore's{' '}
            <a href="#" className="text-secondary hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-secondary hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}

export default Auth;
