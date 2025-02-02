"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Cookies from "js-cookie";


import axios from "axios";


import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react"; // Import loading spinner icon

// Schema validation
const formSchema = z.object({
  adminPassword: z.string().min(5, {
    message: "Password must be at least 6 characters.",
  }),
});

export function AdminLoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false); // Track loading state

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      adminPassword: "",
    },
  });

 const onSubmit = async (data) => {
   setLoading(true); // Start loader

   try {
     const response = await axios.put("/api/admin", {
       password: data.adminPassword,
     });

     if (response.status === 200) {
       Cookies.set("admin_auth", "true", { expires: 1 });

       router.push("/admin/faq");
     } else {
       alert("Incorrect password!");
     }
   } catch (error) {
     alert("Login failed! Please try again.");
   } finally {
     setLoading(false); // Stop loader
   }
 };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-96 border-black border-2 p-8 rounded-lg"
      >
        <FormField
          control={form.control}
          name="adminPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-xl">
                Enter Admin Password
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter password"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Only admins with the correct password can access.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          {loading ? (
            <Loader2 className="animate-spin w-5 h-5 mr-2" />
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </Form>
  );
}
