export type QuestionType = 'single' | 'multi';

export interface Option {
  id: string;
  label: string;
  icon?: string;
  description?: string;
}

export interface Question {
  id: string;
  title: string;
  subtitle?: string;
  type: QuestionType;
  options: Option[];
  whyWeAsk: string;
}

export const questions: Question[] = [
  {
    id: "q1_target",
    title: "Co jest Twoim głównym celem pielęgnacyjnym?",
    subtitle: "Możesz wybrać więcej niż jedną opcję.",
    type: "multi",
    whyWeAsk: "Pozwala nam to zawęzić kategorie produktów, które będą dla Ciebie najbardziej odpowiednie.",
    options: [
      { id: "face", label: "Pielęgnacja twarzy", icon: "✨", description: "Oczyszczanie, nawilżanie, anti-aging" },
      { id: "body", label: "Pielęgnacja ciała", icon: "🌿", description: "Odżywianie, ujędrnianie, higiena" },
      { id: "hair", label: "Pielęgnacja włosów", icon: "💆‍♀️", description: "Szampony, odżywki, wcierki" }
    ]
  },
  {
    id: "q2_skinType",
    title: "Jak opisałabyś swój typ cery lub skóry?",
    subtitle: "Wybierz jedną, najbardziej trafną opcję.",
    type: "single",
    whyWeAsk: "Typ skóry to kluczowy czynnik przy doborze odpowiednich składników aktywnych i konsystencji.",
    options: [
      { id: "dry", label: "Sucha i odwodniona", icon: "🌵", description: "Często ściągnięta, szorstka, łuszcząca się" },
      { id: "oily", label: "Przetłuszczająca się", icon: "💧", description: "Błyszcząca, skłonna do wyprysków" },
      { id: "mixed", label: "Mieszana", icon: "⚖️", description: "Tłusta strefa T, suche policzki" },
      { id: "sensitive", label: "Wrażliwa", icon: "🌸", description: "Skłonna do zaczerwienień i podrażnień" },
      { id: "mature", label: "Dojrzała", icon: "⏳", description: "Potrzebująca ujędrnienia i wygładzenia" }
    ]
  },
  {
    id: "q3_challenge",
    title: "Z jakim wyzwaniem chcesz sobie poradzić?",
    subtitle: "Zaznacz to, co najbardziej Ci przeszkadza.",
    type: "multi",
    whyWeAsk: "Dzięki temu dopasujemy produkty z konkretnymi składnikami aktywnymi, które celują w Twoje problemy.",
    options: [
      { id: "hydration", label: "Brak nawilżenia", icon: "💦" },
      { id: "aging", label: "Zmarszczki i utrata jędrności", icon: "👵" },
      { id: "acne", label: "Niedoskonałości i trądzik", icon: "🔴" },
      { id: "discoloration", label: "Przebarwienia", icon: "🌞" },
      { id: "irritation", label: "Podrażnienia i alergie", icon: "🩹" }
    ]
  },
  {
    id: "q4_texture",
    title: "Jakie konsystencje kosmetyków preferujesz?",
    subtitle: "Co sprawia Ci największą przyjemność podczas aplikacji?",
    type: "multi",
    whyWeAsk: "Pielęgnacja powinna być przyjemnością. Dobierzemy formuły, które lubisz używać na co dzień.",
    options: [
      { id: "light", label: "Lekkie kremy i żele", icon: "☁️", description: "Szybko się wchłaniają, nie obciążają" },
      { id: "rich", label: "Bogate masła i oleje", icon: "🧈", description: "Mocno odżywcze, pozostawiają warstwę" },
      { id: "water", label: "Sera wodne i hydrolaty", icon: "💧", description: "Odświeżające, idealne pod krem" },
      { id: "solid", label: "Formuły w kostce", icon: "🧼", description: "Szampony, odżywki, mydła" }
    ]
  },
  {
    id: "q5_requirements",
    title: "Czy masz jakieś specjalne wymagania?",
    subtitle: "Zaznacz, jeśli coś jest dla Ciebie szczególnie ważne.",
    type: "multi",
    whyWeAsk: "Szanujemy Twoje wartości i potrzeby zdrowotne. Dopasujemy produkty spełniające te kryteria.",
    options: [
      { id: "vegan", label: "Tylko wegańskie", icon: "🌱" },
      { id: "fragrance_free", label: "Bez zapachu / dla alergików", icon: "🚫👃" },
      { id: "eco_packaging", label: "Opakowania szklane / Zero waste", icon: "♻️" },
      { id: "fast_absorbing", label: "Szybkie wchłanianie", icon: "⚡" }
    ]
  },
  {
    id: "q6_routine",
    title: "Twój codzienny rytuał pielęgnacyjny to...",
    subtitle: "Ile czasu zazwyczaj poświęcasz na pielęgnację?",
    type: "single",
    whyWeAsk: "Dopasujemy ilość i rodzaj produktów do czasu, którym dysponujesz, aby pielęgnacja była realna do utrzymania.",
    options: [
      { id: "minimalist", label: "Szybkie minimum", icon: "⏱️", description: "Oczyszczanie i krem (1-2 minuty)" },
      { id: "standard", label: "Standardowa pielęgnacja", icon: "⏳", description: "3-4 kroki, w tym serum (3-5 minut)" },
      { id: "spa", label: "Domowe SPA", icon: "🛁", description: "Wieloetapowa pielęgnacja, maseczki (10+ minut)" }
    ]
  }
];
