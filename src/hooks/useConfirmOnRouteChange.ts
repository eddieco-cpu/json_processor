"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useConfirmOnRouteChange(message: string = "確定要離開此頁面嗎？\n系統可能不會儲存你所做的變更。") {
  const router = useRouter();
  const [enabledNavigate, setEnabledNavigate] = useState<boolean>(false);

  //hard navigation usage
  useEffect(() => {
    if (!enabledNavigate) return;
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = message;
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [enabledNavigate, message]);

  //soft navigation usage
  useEffect(() => {
    if (!enabledNavigate) return;

    // 攔截 `router.push()` 和 `router.replace()`
    const originalPush = router.push;
    const originalReplace = router.replace;

    router.push = (...args) => {
      const confirmLeave = window.confirm(message);
      if (confirmLeave) {
        return originalPush(...args);
      }
    };

    router.replace = (...args) => {
      const confirmLeave = window.confirm(message);
      if (confirmLeave) {
        return originalReplace(...args);
      }
    };

    return () => {
      // 恢復 `router.push` 和 `router.replace`
      router.push = originalPush;
      router.replace = originalReplace;
    };
  }, [enabledNavigate, message, router]);

  return {setEnabledNavigate };
}
