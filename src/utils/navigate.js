// utils/useNavigate.ts
"use client";

import { useRouter } from "next/navigation";

export const useNavigate = () => {
  const router = useRouter();

  const navigateTo = (path) => {
    router.push(path);
  };

  return navigateTo;
};
