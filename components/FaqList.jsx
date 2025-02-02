"use client"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export function AccordionDemo({lang="en"}) {
  const [faqs,setFaqs]=useState([]);
  useEffect(()=>{
     GetFaqs();
  },[lang]);
  
  const GetFaqs=async()=>{
    const response = await axios.get("http://localhost:3000/api/faq", {
      params: { lang } 
    });
    
    const data=response.data;
    console.log(data);
    console.log(data);
    setFaqs(data);
  }
  
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.length==0 && <Loader2 className="animate-spin" />}
      {faqs?.map(({ question, answer }, index) => {
        return (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-xl font-medium">{question}</AccordionTrigger>
            <AccordionContent>
              {/* {lang.toString()} */}
              <div dangerouslySetInnerHTML={{ __html: answer }}></div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
