import { Schema, model, models } from 'mongoose';
import redis from 'redis';
import { promisify } from 'util';
// import { translate } from '@vitalets/google-translate-api';

// const client = redis.createClient();
// const getAsync = promisify(client.get).bind(client);
// const setAsync = promisify(client.set).bind(client);

const faqSchema = new Schema({
    question: {
        en: { type: String, required: true },
        es: { type: String },
        fr: { type: String },
        de: { type: String },
        it: { type: String },
        ja: { type: String }
    },
    answer: {
        en: { type: String, required: true },
        es: { type: String },
        fr: { type: String },
        de: { type: String },
        it: { type: String },
        ja: { type: String }
    }
});

// faqSchema.methods.getTranslatedQuestion = async function (lang = 'en') {
//     const cacheKey = `faq_${this._id}_question_${lang}`;
//     const cachedTranslation = await getAsync(cacheKey);
//     if (cachedTranslation) return cachedTranslation;

//     let textToTranslate = this.question;
//     if (lang === 'hi' && this.question_hi) return this.question_hi;
//     if (lang === 'bn' && this.question_bn) return this.question_bn;

//     try {
//         const { text } = await translate(textToTranslate, { to: lang });
//         await setAsync(cacheKey, text, 'EX', 86400);
//         return text;
//     } catch (error) {
//         console.error('Translation error:', error);
//         return textToTranslate;
//     }
// };
const FAQ= models.Faq || model('Faq', faqSchema);


export default FAQ;
