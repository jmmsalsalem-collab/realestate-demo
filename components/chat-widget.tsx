"use client";

import { useChat } from "ai/react";
import { useEffect, useRef, useState } from "react";
import { MessageSquare, Send, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const SUGGESTIONS = [
  "What can I afford on a $9k/mo budget?",
  "Compare Marina Bluffs vs Old Oak Village",
  "Help me prepare an offer",
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    append,
    isLoading,
    error,
  } = useChat({ api: "/api/chat" });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <>
      {/* Launcher */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open AI advisor"
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-charcoal shadow-lg transition-transform hover:scale-105 hover:bg-gold-dark hover:text-white",
          open && "scale-0 opacity-0"
        )}
      >
        <MessageSquare className="h-6 w-6" />
      </button>

      {/* Panel */}
      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 flex w-[calc(100vw-3rem)] max-w-sm origin-bottom-right flex-col overflow-hidden rounded-xl border border-border bg-card shadow-2xl transition-all duration-200",
          open
            ? "h-[34rem] max-h-[80vh] scale-100 opacity-100"
            : "pointer-events-none h-0 scale-90 opacity-0"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-charcoal px-4 py-3 text-background">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-charcoal">
              <Sparkles className="h-4 w-4" />
            </span>
            <div className="leading-tight">
              <p className="font-serif text-sm">Alex · AI Advisor</p>
              <p className="text-[0.65rem] uppercase tracking-wider text-gold">
                Prestige Properties
              </p>
            </div>
          </div>
          <button onClick={() => setOpen(false)} aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="chat-scroll flex-1 space-y-4 overflow-y-auto bg-background p-4"
        >
          {messages.length === 0 && (
            <div className="space-y-4">
              <p className="text-sm text-charcoal/80">
                Hi, I&apos;m Alex. Tell me about your budget, must-haves, and
                where you&apos;d love to live — I&apos;ll help you find the right
                home.
              </p>
              <div className="space-y-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => append({ role: "user", content: s })}
                    className="block w-full rounded-md border border-border bg-card px-3 py-2 text-left text-xs text-charcoal/80 transition-colors hover:border-gold hover:text-charcoal"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m) => (
            <div
              key={m.id}
              className={cn(
                "flex",
                m.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[85%] whitespace-pre-wrap rounded-lg px-3 py-2 text-sm leading-relaxed",
                  m.role === "user"
                    ? "bg-charcoal text-background"
                    : "bg-secondary text-charcoal"
                )}
              >
                {m.content}
              </div>
            </div>
          ))}

          {isLoading && messages[messages.length - 1]?.role === "user" && (
            <div className="flex justify-start">
              <div className="flex gap-1 rounded-lg bg-secondary px-3 py-3">
                <span className="h-2 w-2 animate-bounce rounded-full bg-gold-dark [animation-delay:-0.3s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-gold-dark [animation-delay:-0.15s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-gold-dark" />
              </div>
            </div>
          )}

          {error && (
            <p className="rounded-md bg-red-50 px-3 py-2 text-xs text-red-700">
              Something went wrong. Please ensure the ANTHROPIC_API_KEY is set,
              then try again.
            </p>
          )}
        </div>

        {/* Composer */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 border-t border-border bg-card p-3"
        >
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask about budget, neighborhoods…"
            className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <Button
            type="submit"
            variant="gold"
            size="icon"
            disabled={isLoading || !input.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </>
  );
}
