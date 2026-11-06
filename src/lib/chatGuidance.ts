export const intakeQuestions = [
  { id: "userType", question: "What best describes you?", options: ["Student", "Beginner investor", "ESG researcher"] },
  { id: "goal", question: "What would you like to do?", options: ["Learn about sustainable investing", "Explore a company", "Compare ESG information", "Navigate GREENInvest"] },
  { id: "topic", question: "Which company or topic interests you?", options: ["CEMEX", "Grupo Bimbo", "Walmart de México", "FEMSA", "América Móvil", "General ESG information"] },
] as const;

export type IntakeAnswers = { userType: string; goal: string; topic: string };
export type GuidedResult = { introduction: string; explanation: string; nextStep: string; links: { href: string; label: string }[] };

const companyContext: Record<string, string> = {
  "CEMEX": "CEMEX operates in building materials. Explore reported operational emissions and the environmental challenges of cement production.",
  "Grupo Bimbo": "Grupo Bimbo operates in baked goods. Explore how reported emissions, energy and logistics relate to environmental performance.",
  "Walmart de México": "Walmart de México operates in retail. Look at reported emissions and how stores, electricity and supply chains affect environmental performance.",
  "FEMSA": "FEMSA operates across retail and other businesses. Explore reported emissions and compare how activities can affect environmental impact.",
  "América Móvil": "América Móvil operates in telecommunications. Consider reported emissions and the role of electricity in digital infrastructure.",
  "General ESG information": "ESG stands for Environmental, Social and Governance. It is a framework for examining company practices alongside financial information; it is not a guarantee of sustainability or investment returns.",
};

export const educationNotice = "GREENInvest provides educational information, not personalized financial advice. Review company disclosures and consult a qualified professional before making investment decisions.";
export const guardrailMessage = "I cannot tell you which stock to buy or sell or predict guaranteed returns. I can help you compare publicly reported ESG information and explore GREENInvest research instead.";

export function isDirectAdviceRequest(value: string): boolean {
  const normalized = value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  // A small educational demo guardrail, not comprehensive natural-language moderation.
  const directTrading = /\b(buy|sell|purchase|trade|invest in|comprar|vender|invertir en)\b/.test(normalized);
  const financialTarget = /\b(stock|stocks|share|shares|ticker|investment|investments|acciones|accion|bolsa|cemex|bimbo|femsa|walmart|america movil|crypto|bitcoin)\b/.test(normalized);
  const adviceRequest = /\b(should i|which|what|recommend|best|pick|choose|tell me|guaranteed|guarantee|profit|que|cual|recomiendas|deberia|mejor|ganancia|garantiz)/.test(normalized);
  return (directTrading && (financialTarget || adviceRequest)) || (financialTarget && adviceRequest && /\b(buy|sell|invest|comprar|vender|invertir|return|profit|ganancia|rendimiento)\b/.test(normalized));
}

export function buildGuidedResult(answers: IntakeAnswers): GuidedResult {
  const explanation = companyContext[answers.topic] ?? companyContext["General ESG information"];
  const goalLinks: Record<string, { href: string; label: string }[]> = {
    "Learn about sustainable investing": [{ href: "/core", label: "Explore Core" }, { href: "/research", label: "Explore Research" }],
    "Explore a company": [{ href: "/core", label: "See company information" }, { href: "/research", label: "See research" }],
    "Compare ESG information": [{ href: "/research", label: "Compare company information" }, { href: "/core", label: "See company data" }],
    "Navigate GREENInvest": [{ href: "/product", label: "See product features" }, { href: "/pricing", label: "See plans" }],
  };
  const intro = answers.userType === "Student"
    ? "Let's start with clear concepts and sources."
    : answers.userType === "Beginner investor"
      ? "Let's explore the information without making a buy or sell recommendation."
      : "Let's focus on what is reported and what needs verification.";
  const nextStep = answers.goal === "Compare ESG information"
    ? "Compare the same reporting years and emissions scopes, and check each source before drawing conclusions."
    : answers.goal === "Navigate GREENInvest"
      ? "Start with the product overview, then use Core or Research to explore company data."
      : answers.goal === "Explore a company"
        ? "Open Core to review reported company information, then Research for context."
        : "Review the ESG overview and explore company reports to learn more.";
  return { introduction: intro, explanation, nextStep, links: goalLinks[answers.goal] ?? goalLinks["Learn about sustainable investing"] };
}
