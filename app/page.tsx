'use client';

import { useChat } from '@ai-sdk/react';
import { ArrowUp, LoaderCircle, Squircle } from 'lucide-react';

export default function Chat() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    status,
    error,
    reload,
  } = useChat();

  return (
    <section className="flex flex-col gap-4 w-full max-w-2xl py-24 mx-auto stretch">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`whitespace-pre-wrap flex flex-col gap-2 ${
            message.role === 'user' ? 'w-fit items-end ml-auto' : 'w-full'
          }`}>
          <span className="text-xs p-1 bg-gray-800 w-6 rounded-3xl flex items-center justify-center">
            {message.role === 'user' ? 'U' : 'AI'}
          </span>
          {message.parts.map((part, i) => {
            switch (part.type) {
              case 'text':
                return <div key={`${message.id}-${i}`}>{part.text}</div>;
            }
          })}
          {/* <span className="">{message.content}</span> */}
        </div>
      ))}

      {error && (
        <div className="flex flex-col items-center gap-4 mx-auto">
          <div className="p-2 text-xs border border-red-300 bg-red-300/10 text-red-300 rounded-xl">
            Something went wrong
          </div>

          <button
            type="button"
            className="text-xs underline"
            onClick={() => reload()}>
            Retry
          </button>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="fixed dark:bg-zinc-900 bottom-0 w-full max-w-2xl p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded-xl flex items-center">
        <input
          className="outline-none focus:outline-none w-full pl-2"
          value={input}
          placeholder="Ask anything"
          onChange={handleInputChange}
        />

        {(status === 'submitted' || status === 'streaming') && (
          <>
            {status === 'submitted' ? (
              <div className="px-2 !aspect-square flex items-center justify-center bg-zinc-600 rounded-md">
                <LoaderCircle
                  size={16}
                  className="stroke-gray-300 animate-spin"
                />
              </div>
            ) : (
              status === 'streaming' && (
                <button
                  type="button"
                  onClick={() => stop()}
                  className="px-2 !aspect-square flex items-center justify-center bg-zinc-200 rounded-md">
                  <Squircle size={16} className="stroke-gray-900" />
                </button>
              )
            )}
          </>
        )}

        {(status === 'ready' || status === 'error') && (
          <button
            type="submit"
            className="px-2 !aspect-square flex items-center justify-center bg-zinc-100 rounded-md">
            <ArrowUp size={16} className="stroke-gray-900" />
          </button>
        )}
      </form>
    </section>
  );
}
