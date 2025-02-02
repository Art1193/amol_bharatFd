import { connectToDB } from "@/lib/dbConnect";
import FAQ from "@/models/FaqModel";
import { JSDOM } from "jsdom";
import { translateFromGoogle } from "@/lib/utils";
import { client } from "@/lib/redis";

const parseHtml = async (html, lang) => {
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const walker = document.createTreeWalker(
    document.body,
    dom.window.NodeFilter.SHOW_TEXT
  );
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node.nodeValue.trim()) {
      const text = await translateFromGoogle(node.nodeValue, lang);
      console.log(text);

      node.nodeValue = text;
    }
  }
  return document.body.innerHTML.toString();
};
export async function GET(req) {
  await connectToDB();
  try {
    const { searchParams } = new URL(req.url);
    let newFaq = [];
    const lang = searchParams.get("lang") || "en";
    const faqs = await FAQ.find();
    for (let faq of faqs) {
      const cacheKey = `${faq.id}_${lang}`;
      let cachedAnswer = await client.get(cacheKey);
      if (cachedAnswer) {
        newFaq.push({
          question: faq.question[lang] || faq.question.en,
          answer: cachedAnswer,
        });
      } else {
        const existing = await FAQ.findOne({
          _id: faq.id,
          [`question.${lang}`]: { $exists: true },
          [`answer.${lang}`]: { $exists: true },
        });
        let question, answer;
        if (existing) {
          question = existing.question[lang];
          answer = existing.answer[lang];
        } else {
          question = await parseHtml(faq.question.en, lang);
          answer = await parseHtml(faq.answer.en, lang);
          await FAQ.updateOne(
            { _id: faq.id },
            {
              $set: {
                [`question.${lang}`]: question,
                [`answer.${lang}`]: answer,
              },
            }
          );
        }
        await client.set(cacheKey, answer, "EX", 300);
        newFaq.push({
          question,
          answer,
        });
      }
    }
    return new Response(JSON.stringify(newFaq), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function POST(req) {
  await connectToDB();
  const { question, answer } = await req.json();

  try {
    const newFAQ = new FAQ({
      question: {
        en: question,
      },
      answer: {
        en: answer,
      },
    });
    await newFAQ.save();
    return new Response(JSON.stringify(newFAQ), { status: 201 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
