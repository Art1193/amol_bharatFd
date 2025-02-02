"use client";
import { AccordionDemo } from "@/components/FaqList";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
export default function Home() {
  const [lang, setlang] = useState({ code: "en", name: "English", flag: "🇬🇧" });
  const languages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "it", name: "Italiano", flag: "🇮🇹" },
    { code: "ja", name: "日本語", flag: "🇯🇵" },
  ];
  return (
    <div className=" flex w-full  flex-col p-4 ">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-[2rem] font-semibold  mb-3 ">FAQs</h1>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-40 justify-between">
                <span className="flex items-center gap-2">
                  {lang.flag} {lang.name}
                </span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
              {languages.map((language) => (
                <DropdownMenuItem
                  key={language.code}
                  onSelect={() => setlang(language)}
                  className="flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    {language.flag} {language.name}
                  </span>
                  {lang.code === language.code && <Check className="h-4 w-4" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <AccordionDemo lang={lang.code} />
    </div>
  );
}
