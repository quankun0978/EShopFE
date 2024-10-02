//en
import productEN from "./en/product/init.js";
//vn
import productVN from "./vn/product/init.js";

export default {
  locale: "vn",
  fallbackLocale: "en",
  messages: {
    en: {
      product: productEN,
      message: {
        hello: "hello world",
        greeting: "good morning, world!",
      },
    },
    vn: {
      product: productVN,
      message: {
        hello: "chao",
        greeting: "good morning, world!",
      },
    },
  },
};
