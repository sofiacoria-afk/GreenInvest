"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function BackToPrevious() {
  const router = useRouter();
  const [previous, setPrevious] = useState<string | null>(null);

  useEffect(() => {
    // This is a safe same-origin fallback for a page opened directly.
    // Internal navigation can always use the browser's Back history.
    const stored = window.sessionStorage.getItem("greeninvestPreviousRoute");
    const path = stored && stored.startsWith("/") && !stored.startsWith("//") ? stored : null;
    setPrevious(path);
  }, []);

  function goBack() {
    if (previous && previous !== window.location.pathname) {
      router.push(previous);
    } else {
      router.push("/demo");
    }
  }

  return (
    <button type="button" onClick={goBack}
      className="mb-6 inline-flex items-center rounded-xl border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700">
      ← Back to previous page
    </button>
  );
}
