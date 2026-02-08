"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTamboThread, useTamboThreadInput } from "@tambo-ai/react";
import {
  Send,
  Upload,
  Image as ImageIcon,
  Github,
  Code,
  Loader2,
  Sparkles,
  Terminal,
  AlertCircle,
  X,
  CheckCircle2,
  Layers,
} from "lucide-react";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { MultiErrorBatchAnalyzer } from "@/components/debug-components/MultiErrorBatchAnalyzer";

export default function DebugCopilot() {
  const { thread } = useTamboThread();
  const { value, setValue, submit, isPending } = useTamboThreadInput();
  const [inputMode, setInputMode] = useState<"text" | "file" | "url">("text");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [urlError, setUrlError] = useState<string>("");
  const [showBatchAnalyzer, setShowBatchAnalyzer] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [thread.messages]);

  useEffect(() => {
    // Check if errors were passed via URL (from browser extension)
    const params = new URLSearchParams(window.location.search);
    const errors = params.get('errors');
    if (errors) {
      setValue(decodeURIComponent(errors));
      // Clear URL params
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [setValue]);

  const handleBatchAnalyze = (errors: string[]) => {
    const batchText = `📦 Batch Error Analysis (${errors.length} errors)\n\n` +
      errors.map((err, i) => `--- Error ${i + 1} ---\n${err}`).join('\n\n');
    setValue(batchText);
    submit();
  };

  const validateGithubUrl = (url: string): boolean => {
    const githubUrlPattern = /^https?:\/\/(www\.)?(github\.com|stackoverflow\.com|stackexchange\.com)/i;
    return githubUrlPattern.test(url);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setValue(`File: ${file.name}\n\n${content}`);
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (inputMode === "url") {
      if (!value.trim()) return;
      if (!validateGithubUrl(value.trim())) {
        setUrlError("Please enter a valid GitHub, StackOverflow, or StackExchange URL");
        return;
      }
      setUrlError("");
    }
    
    if (value.trim() && !isPending) {
      submit();
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setValue("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const exampleErrors = [
    {
      title: "TypeError Example",
      error: "TypeError: Cannot read property 'map' of undefined at line 42",
      icon: AlertCircle,
    },
    {
      title: "Syntax Error",
      error: "SyntaxError: Unexpected token '<' in JSON at position 0",
      icon: Code,
    },
    {
      title: "Dependency Conflict",
      error: "npm ERR! peer dep missing: react@^18.0.0, required by next@13.0.0",
      icon: Terminal,
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Welcome Screen */}
        {thread.messages.length === 0 && (
          <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16 max-w-[1280px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Hero Section */}
            <div className="text-center mb-8 sm:mb-12">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
                className="inline-block mb-4 sm:mb-6"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-xl">
                  <Sparkles className="text-background w-8 h-8 sm:w-10 sm:h-10" />
                </div>
              </motion.div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 font-display px-4">
                Debug Smarter, Not Harder
              </h1>
              <p className="text-base sm:text-lg opacity-80 mb-6 sm:mb-8 px-4">
                Stop reading error messages. Start{" "}
                <span className="text-primary font-semibold">seeing</span>{" "}
                solutions.
                <br className="hidden sm:block" />
                <span className="block sm:inline mt-1 sm:mt-0">Powered by Tambo&apos;s Generative UI.</span>
              </p>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-12 px-4">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-4 sm:p-5 rounded-xl border border-primary/30 bg-surface/50 backdrop-blur-sm hover:border-primary/50 hover:shadow-lg transition-all"
                >
                  <div className="text-3xl sm:text-2xl mb-2">🎨</div>
                  <h3 className="font-semibold mb-1 text-sm sm:text-base">Visual Debugging</h3>
                  <p className="text-xs opacity-70">
                    Interactive components, not walls of text
                  </p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-4 sm:p-5 rounded-xl border border-secondary/30 bg-surface/50 backdrop-blur-sm hover:border-secondary/50 hover:shadow-lg transition-all"
                >
                  <div className="text-3xl sm:text-2xl mb-2">🎓</div>
                  <h3 className="font-semibold mb-1 text-sm sm:text-base">Learning Mode</h3>
                  <p className="text-xs opacity-70">
                    Understand why bugs happen
                  </p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-4 sm:p-5 rounded-xl border border-accent/30 bg-surface/50 backdrop-blur-sm hover:border-accent/50 hover:shadow-lg transition-all"
                >
                  <div className="text-3xl sm:text-2xl mb-2">⚡</div>
                  <h3 className="font-semibold mb-1 text-sm sm:text-base">One-Click Fixes</h3>
                  <p className="text-xs opacity-70">
                    Apply patches instantly
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Example Errors */}
            <div className="mb-8 px-4">
              <h3 className="text-xs sm:text-sm font-semibold opacity-70 mb-3 sm:mb-4 text-center">
                Try an example:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                {exampleErrors.map((example, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setInputMode("text");
                      setValue(example.error);
                    }}
                    className="p-3 sm:p-4 rounded-xl border border-primary/20 bg-surface/50 hover:bg-surface hover:border-primary/40 hover:shadow-lg transition-all text-left"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <example.icon size={14} className="text-primary sm:w-4 sm:h-4" />
                      <span className="text-xs font-semibold">
                        {example.title}
                      </span>
                    </div>
                    <p className="text-xs opacity-70 font-mono line-clamp-2">
                      {example.error.length > 50 ? example.error.substring(0, 50) + '...' : example.error}
                    </p>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Input Area - Moved into main content flow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="px-4 pb-8"
          >
            <div className="max-w-4xl mx-auto">
              <div className="bg-surface/80 backdrop-blur-md border border-primary/20 rounded-2xl p-4 sm:p-6 shadow-xl">
                {/* Input Mode Selector */}
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <button
                    onClick={() => {
                      setInputMode("text");
                      setUrlError("");
                    }}
                    className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm flex items-center gap-2 transition-all font-medium ${
                      inputMode === "text"
                        ? "bg-gradient-to-r from-primary to-secondary text-background shadow-md"
                        : "bg-surface/50 border border-primary/30 hover:border-primary/50 hover:bg-surface"
                    }`}
                  >
                    <Terminal size={16} />
                    <span>Text</span>
                  </button>
                  <button
                    onClick={() => {
                      setInputMode("file");
                      setUrlError("");
                    }}
                    className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm flex items-center gap-2 transition-all font-medium ${
                      inputMode === "file"
                        ? "bg-gradient-to-r from-primary to-secondary text-background shadow-md"
                        : "bg-surface/50 border border-primary/30 hover:border-primary/50 hover:bg-surface"
                    }`}
                  >
                    <Upload size={16} />
                    <span>File</span>
                  </button>
                  <button
                    onClick={() => {
                      setInputMode("url");
                      setValue("");
                    }}
                    className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm flex items-center gap-2 transition-all font-medium ${
                      inputMode === "url"
                        ? "bg-gradient-to-r from-primary to-secondary text-background shadow-md"
                        : "bg-surface/50 border border-primary/30 hover:border-primary/50 hover:bg-surface"
                    }`}
                  >
                    <Github size={16} />
                    <span>URL</span>
                  </button>
                  <button
                    onClick={() => setShowBatchAnalyzer(true)}
                    className="px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm flex items-center gap-2 transition-all font-medium bg-accent/20 border border-accent/50 hover:bg-accent/30 hover:border-accent/70"
                  >
                    <Layers size={16} />
                    <span>Batch Analysis</span>
                  </button>
                </div>

                {/* Input Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Text Input Mode */}
                  {inputMode === "text" && (
                    <div>
                      <textarea
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Paste your error message, stack trace, or describe the bug in detail...\n\nExample:\nTypeError: Cannot read property 'map' of undefined\n  at Component.render (App.js:42:18)\n  at finishClassComponent..."
                        className="w-full bg-background/50 border border-primary/30 rounded-xl p-3 sm:p-4 resize-vertical focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-sm sm:text-base font-mono transition-all min-h-[150px] max-h-[400px]"
                        disabled={isPending}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                            handleSubmit(e);
                          }
                        }}
                      />
                    </div>
                  )}

                  {/* File Input Mode */}
                  {inputMode === "file" && (
                    <div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".txt,.log,.json,.js,.ts,.jsx,.tsx,.py,.java,.cpp,.c,.cs,.rb,.go,.php,.swift,.kt,.rs"
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="w-full bg-background/50 border-2 border-dashed border-primary/30 rounded-xl p-8 sm:p-12 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-surface/30 transition-all group"
                      >
                        <Upload size={48} className="text-primary/50 group-hover:text-primary/70 transition-colors mb-4" />
                        <p className="text-sm sm:text-base font-medium mb-2">
                          {selectedFile ? selectedFile.name : "Click to upload or drag and drop"}
                        </p>
                        <p className="text-xs sm:text-sm opacity-60">
                          Supported: .txt, .log, .json, .js, .ts, .py, .java, .cpp, .cs, .rb, .go, .php, .swift, .kt, .rs
                        </p>
                      </label>
                      {selectedFile && (
                        <div className="mt-3 flex items-center justify-between bg-surface/50 border border-primary/20 rounded-lg p-3">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 size={18} className="text-primary" />
                            <span className="text-sm font-medium">{selectedFile.name}</span>
                            <span className="text-xs opacity-60">({(selectedFile.size / 1024).toFixed(2)} KB)</span>
                          </div>
                          <button
                            type="button"
                            onClick={handleClearFile}
                            className="p-1 hover:bg-surface rounded transition-colors"
                          >
                            <X size={18} className="opacity-60 hover:opacity-100" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* URL Input Mode */}
                  {inputMode === "url" && (
                    <div>
                      <input
                        type="url"
                        value={value}
                        onChange={(e) => {
                          setValue(e.target.value);
                          setUrlError("");
                        }}
                        placeholder="https://github.com/user/repo/issues/123 or https://stackoverflow.com/questions/..."
                        className={`w-full bg-background/50 border rounded-xl p-3 sm:p-4 focus:outline-none focus:ring-2 transition-all text-sm sm:text-base ${
                          urlError
                            ? "border-error focus:ring-error/50 focus:border-error"
                            : "border-primary/30 focus:ring-primary/50 focus:border-primary/50"
                        }`}
                        disabled={isPending}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleSubmit(e);
                          }
                        }}
                      />
                      {urlError && (
                        <p className="text-error text-xs sm:text-sm mt-2 flex items-center gap-1">
                          <AlertCircle size={14} />
                          {urlError}
                        </p>
                      )}
                      <p className="text-xs opacity-60 mt-2">
                        Supported: GitHub issues, StackOverflow questions, StackExchange threads
                      </p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="flex items-center justify-between pt-2">
                    <p className="text-xs sm:text-sm opacity-60">
                      {inputMode === "text" && "Press Cmd/Ctrl + Enter to submit"}
                      {inputMode === "file" && selectedFile && "File ready to analyze"}
                      {inputMode === "url" && "Enter a valid GitHub or StackOverflow URL"}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isPending || !value.trim()}
                      className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 disabled:opacity-50 disabled:cursor-not-allowed text-background rounded-xl px-6 sm:px-8 py-3 flex items-center gap-2 font-semibold transition-all shadow-lg hover:shadow-xl text-sm sm:text-base"
                    >
                      {isPending ? (
                        <>
                          <Loader2 size={20} className="animate-spin" />
                          <span>Analyzing...</span>
                        </>
                      ) : (
                        <>
                          <Send size={20} />
                          <span>Analyze Error</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
          </div>
        )}

        {/* Messages */}
        {thread.messages.length > 0 && (
          <div className="container mx-auto px-3 sm:px-6 py-4 sm:py-6 md:py-8 max-w-[1280px]">
            <div className="space-y-4 sm:space-y-6">
              {thread.messages.map((message, index) => (
                <motion.div
                  key={message.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-full sm:max-w-4xl rounded-xl p-3 sm:p-4 shadow-md ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-primary to-secondary text-background sm:ml-12"
                        : "bg-surface/50 backdrop-blur-sm border border-primary/20 sm:mr-12"
                    }`}
                  >
                    {/* Text content */}
                    {Array.isArray(message.content) ? (
                      message.content.map((part, i) =>
                        part.type === "text" ? (
                          <p
                            key={i}
                            className="whitespace-pre-wrap text-sm leading-relaxed"
                          >
                            {part.text}
                          </p>
                        ) : null
                      )
                    ) : typeof message.content === "string" ? (
                      <p className="whitespace-pre-wrap text-sm leading-relaxed font-mono">
                        {message.content}
                      </p>
                    ) : null}

                    {/* Rendered components */}
                    {message.renderedComponent && (
                      <div className="mt-4">{message.renderedComponent}</div>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Loading indicator */}
              {isPending && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-surface/50 backdrop-blur-sm border border-primary/20 rounded-xl p-3 sm:p-4 shadow-md">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Loader2 className="animate-spin text-primary" size={18} />
                      <span className="text-xs sm:text-sm opacity-70">
                        Analyzing your error...
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>
        )}
      </main>

      <Footer />

      {/* Multi-Error Batch Analyzer Modal */}
      <MultiErrorBatchAnalyzer
        isOpen={showBatchAnalyzer}
        onClose={() => setShowBatchAnalyzer(false)}
        onAnalyze={handleBatchAnalyze}
      />
    </div>
  );
}
