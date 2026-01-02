"use client";

import Image from "next/image";
import { useState } from "react";
import { XIcon } from "lucide-react";

type PreviewProps = {
  url: string;
  priority?: boolean;
};

export const Preview = ({ url, priority }: PreviewProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 缩略图 */}
      <div 
        className="mb-4 cursor-pointer rounded-xl bg-card p-2 shadow-xl transition-transform duration-200 hover:scale-[1.02]"
        onClick={() => setIsOpen(true)}
      >
        <Image
          alt={url}
          className="rounded-md"
          height={630}
          priority={priority}
          sizes="630px"
          src={url}
          width={630}
        />
      </div>

      {/* 全屏预览 */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          {/* 关闭按钮 */}
          <button
            type="button"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            onClick={() => setIsOpen(false)}
          >
            <XIcon className="size-6" />
          </button>

          {/* 大图 */}
          <Image
            alt={url}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            height={1200}
            src={url}
            width={1200}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};
