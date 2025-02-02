"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import Ckeditor from "./ui/Ckeditor";
import axios from "axios";
import { icons, Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";

export default function FAQForm() {
  const [question, setQuestion] = useState("");
  const [editorData, setEditorData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const logout = () => {
    Cookies.remove("admin_auth");
    window.location.href = "/";
  }

  const notify = () => toast.success("FAQ saved");
  const handleSubmit = async (e) => {
    e.preventDefault();
   
    if (editorData.trim() == "<h1>&nbsp;</h1><p>&nbsp;</p>") {
      setError("Answer cannot be empty");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/api/faq", {
        question,
        answer: editorData,
      });

      if (response) {
        console.log("FAQ saved:", response.data);
        notify();
        setEditorData("<h1>&nbsp;</h1><p>&nbsp;</p>");
        setQuestion("");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col p-4">
      
      <Toaster />
      <div className="flex justify-between items-center">
      <h1 className="text-[2rem] font-semibold">FAQ Management</h1>
      <Button onClick={logout} >Logout</Button>
      </div>

      <h2 className="text-xl font-bold my-3">Add FAQ</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Enter question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-96"
          required
        />
        <div className="w-[10rem] my-2">
          <Ckeditor setEditorData={setEditorData} />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button type="submit" className="my-10" disabled={loading}>
          {loading ? <Loader2 className="animate-spin" /> : "Submit"}
        </Button>
      </form>
    </div>
  );
}
