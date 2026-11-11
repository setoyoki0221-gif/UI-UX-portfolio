import { experience } from "@/data/experience";
import { projects } from "@/data/projects";

export const getLocalReply = (message) => {
  const normalizedMessage = message.trim().toLowerCase(),
    topProjectTitles = projects
      .slice(0, 3)
      .map((project) => project.title)
      .join(", "),
    topExperienceSummary = experience
      .slice(0, 2)
      .map((job) => `${job.role} at ${job.company}`)
      .join(" and ");
  return /(hello|hi|hey|greetings)/.test(normalizedMessage)
    ? "Hi! I'm Shinobi Coder's AI assistant. I can help you learn more about my skills, projects, work experience, and contact details."
    : /(skill|technology|tech|stack|framework|library)/.test(normalizedMessage)
      ? "I work with React, Next.js, TypeScript, Tailwind CSS, Python, Flask, TensorFlow, PyTorch, OpenAI APIs, LangChain, and Vercel deployment."
      : /(project|work|github|repo|website|app)/.test(normalizedMessage)
        ? `Some featured projects include ${topProjectTitles}. They cover AI chatbots, computer vision, machine learning, and full stack web applications.`
        : /(education|degree|study|school|university)/.test(normalizedMessage)
          ? `He has professional experience in AI engineering, full-stack web development, and cloud-native application development, including ${topExperienceSummary}.`
          : /(experience|background|professional|career)/.test(normalizedMessage)
            ? "He has experience building AI-powered web applications, computer vision systems, chatbots, and cloud-deployed full stack solutions."
            : /(contact|email|reach|hire|talk)/.test(normalizedMessage)
              ? "You can contact me through the website contact form or by email at shinobi.coder701@gmail.com."
              : "I couldn't reach the live AI service, but I can still help with portfolio details. Ask me about my projects, skills, education, or contact info.";
};
