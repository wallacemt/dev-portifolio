"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import { Code, GitBranch, ScanQrCode, Variable } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const PageLoader = ({ children }: { children: React.ReactNode }) => {
  const [loaded, setLoaded] = useState(false);
  const { isLoading, language } = useLanguage();
  useEffect(() => {
    const timeout = setTimeout(() => setLoaded(true), 600);
    return () => clearTimeout(timeout);
  }, [language]);

  if (isLoading || !loaded) {
    return <DevLoader />;
  }

  return <div className="overflow-x-hidden flex flex-col min-h-screen">{children}</div>;
};

const DevLoader = () => {
  const pathname = usePathname();
  useEffect(() => {
    const binaryElements = document.querySelectorAll(".binary-code");
    binaryElements.forEach((el) => {
      const x = Math.random() * 20 - 10;
      const y = Math.random() * 20 - 10;
      (el as HTMLElement).style.transform = `translate(${x}px, ${y}px)`;

      const duration = 3 + Math.random() * 4;
      (el as HTMLElement).style.animation = `float ${duration}s ease-in-out infinite`;
    });
  }, []);

  return (
    <div className="bg-roxo700/80 text-white min-h-screen flex flex-col items-center justify-center overflow-hidden relative">
      {[...Array(50)].map((_, i) => {
        const x = Math.random() * 90 + 5;
        const y = Math.random() * 90 + 5;
        return (
          <div key={i} className={`binary-code animate-pulse absolute`} style={{ top: `${y}%`, left: `${x}%` }}>
            {[1010101, 1100110, 1001001, 1110001, 1011010][Math.floor(Math.random() * 5)].toString()}
          </div>
        );
      })}

      <div className="relative code-bracket flex flex-col items-center justify-center p-12 ">
        <div className="flex items-center mb-8 floating">
          <p className="text-4xl md:text-6xl font-bold font-principal text-center">
            Wallace<span className="text-Destaque">.Dev</span>
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 w-full max-w-[100%] md:max-w-76 mb-8 overflow-hidden border-2 border-Destaque/20 hover:border-Destaque transition-colors relative ">
          <div className="flex items-center mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <div className="ml-4 text-gray-400 text-sm">@wallaceDev: ~$ terminal</div>
          </div>

          <div className="font-mono text-xs text-blue-400 mb-2 ">
            &gt; checking deployment nodes{" "}
            <span className="inline-block w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></span>
          </div>
          <div className="font-mono text-xs text-purple-400 mb-2 ">
            &gt; verifying smart contracts <span className="text-gray-400 text-[0.60rem]">[████░░░] 40%</span>
          </div>
          <div className="font-mono text-xs text-yellow-400 ">
            &gt; compiling security protocols <span className="text-gray-400 text-[0.60rem]">[███████░] 70%</span>
          </div>
          <div className="font-mono text-xs text-cyan-400 mt-4">
            &gt; going to <span className="bg-gray-900 font-bold text-white mx-2">{pathname}</span>
            <span className="text-gray-400 text-[0.60rem]">[███████░] 70%</span>
          </div>
          <div className="font-mono text-xs text-green-400 mb-2 typing">
            $ loading services and fetching data from API...
          </div>
        </div>

        <div className="flex space-x-6">
          <ScanQrCode className="text-yellow-500 text-2xl pulse" />
          <Code className="text-purple-400 text-2xl pulse" />
          <Variable className="text-blue-400 text-2xl pulse" />
          <GitBranch className="text-green-400 text-2xl pulse" />
        </div>
      </div>

      {/* Inline styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }

        @keyframes blink-caret {
          from, to { border-color: transparent }
          50% { border-color: #3b82f6 }
        }

        .floating {
          animation: float 3s ease-in-out infinite;
        }

        .pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .typing {
          overflow: hidden;
          border-right: .15em solid #3b82f6;
          white-space: nowrap;
          animation:
            typing 3.5s steps(40, end),
            blink-caret .75s step-end infinite;
        }
        .code-bracket::before, .code-bracket::after {
          content: "{";
          position: absolute;
          color: #3b82f6;
          font-size: 4rem;
          font-weight: bold;
          opacity: 0.2;
        }

        .code-bracket::before {
          left: -2rem;
          top: -1rem;
        }

        .code-bracket::after {
          content: "}";
          right: -2rem;
          bottom: -1rem;
        }

        .binary-code {
          color: rgba(59, 130, 246, 0.1);
          font-family: monospace;
          font-size: 0.8rem;
          user-select: none;
        }
      `}</style>
    </div>
  );
};
