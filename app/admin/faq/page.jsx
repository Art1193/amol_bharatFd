"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import FAQForm from "@/components/MainForm";
import { Button } from "@/components/ui/button";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const isAdmin = Cookies.get("admin_auth");
    if (!isAdmin) {
      router.push("/admin");
    }
  }, [router]);

  return (
    <div className="w-full flex min-h-screen flex-col">
       
      <FAQForm />
    </div>
  );
};

export default Page;
