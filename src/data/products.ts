export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  tags: string[]; // for matching logic
  imageUrl: string;
  whyMatch: string; // Dynamic reason based on tags
  price: string;
  url: string;
}

export const products: Product[] = [
  {
    id: "p1",
    name: "Krem z olejkiem z opuncji figowej",
    category: "Twarz",
    description: "Krem do twarzy o silnym działaniu przeciwzmarszczkowym i nawilżającym.",
    tags: ["face", "mature", "aging", "rich", "eco_packaging"],
    imageUrl: "https://la-le.pl/environment/cache/images/productGfx_1420_500_500/krem_opuncja.png",
    whyMatch: "Olej z opuncji figowej to naturalny botoks, idealnie odpowiadający na potrzebę ujędrnienia i wygładzenia.",
    price: "49,00 zł",
    url: "https://la-le.pl/krem-z-olejkiem-z-opuncji-figowej"
  },
  {
    id: "p2",
    name: "Krem do twarzy ze stoechiolem i złotem",
    category: "Twarz",
    description: "Luksusowy krem z 23-karatowym złotem i stoechiolem, działający napinająco.",
    tags: ["face", "mature", "aging", "water", "fast_absorbing", "eco_packaging"],
    imageUrl: "https://la-le.pl/environment/cache/images/productGfx_1322_500_500/krem_zloto.png",
    whyMatch: "Stoechiol działa jak naturalny lifting, a złoto rozświetla cerę, potęgując efekt anti-aging.",
    price: "55,00 zł",
    url: "https://la-le.pl/pl/p/Krem-do-twarzy-ze-stoechiolem-23-karatowym-zlotem-60-ml/380"
  },
  {
    id: "p3",
    name: "Hydrolat róża z opuncją",
    category: "Twarz",
    description: "Odświeżająca mgiełka przywracająca naturalne pH skóry. Świetna dla cery suchej.",
    tags: ["face", "dry", "sensitive", "hydration", "water", "vegan", "eco_packaging"],
    imageUrl: "https://la-le.pl/environment/cache/images/productGfx_1334_500_500/Hydr_roza_opuncja.png",
    whyMatch: "Hydrolat błyskawicznie koi i nawilża, przygotowując skórę na przyjęcie kolejnych kroków pielęgnacji.",
    price: "29,00 zł",
    url: "https://la-le.pl/pl/p/Hydrolat-roza-z-opuncja-50-ml/445"
  },
  {
    id: "p4",
    name: "Dezodorant Green Tea",
    category: "Ciało",
    description: "Naturalny dezodorant w kremie na bazie sody oczyszczonej. Skutecznie neutralizuje zapach.",
    tags: ["body", "rich", "eco_packaging", "vegan"],
    imageUrl: "https://la-le.pl/environment/cache/images/productGfx_1387_500_500/deo_greentea_150.png",
    whyMatch: "Naturalna alternatywa dla antyperspirantów, która dba o delikatną skórę pach i zapewnia świeżość.",
    price: "32,00 zł",
    url: "https://la-le.pl/dezodorant-ekologiczny-w-kremie-z-olejkiem-green-tea"
  },
  {
    id: "p5",
    name: "Tatrzański krem zimowy",
    category: "Twarz",
    description: "Gęsty krem ochronny, który głęboko odżywia i regeneruje przesuszoną skórę.",
    tags: ["face", "body", "dry", "hydration", "rich", "vegan", "eco_packaging"],
    imageUrl: "https://la-le.pl/environment/cache/images/productGfx_1525_500_500/tatrzanski_nowy.png",
    whyMatch: "Bogata konsystencja tworzy warstwę okluzyjną, zapobiegając utracie wody z naskórka i chroniąc przed czynnikami zewnętrznymi.",
    price: "45,00 zł",
    url: "https://la-le.pl/krem-zimowy-do-twarzy"
  },
  {
    id: "p6",
    name: "Japan Nature Maska mech",
    category: "Twarz",
    description: "Maska do twarzy inspirowana japońską pielęgnacją, głęboko oczyszczająca i odżywcza.",
    tags: ["face", "dry", "sensitive", "rich", "eco_packaging", "vegan", "spa"],
    imageUrl: "https://la-le.pl/environment/cache/images/productGfx_1431_500_500/japan_maska_mech.png",
    whyMatch: "Idealna do domowego SPA, dostarcza skórze niezbędnych minerałów i głęboko ją regeneruje.",
    price: "42,00 zł",
    url: "https://la-le.pl/pl/p/Japan-Nature-Maska-do-twarzy-mech-120ml/493"
  },
  {
    id: "p7",
    name: "Wcierka do włosów - rozmaryn",
    category: "Włosy",
    description: "Naturalna wcierka stymulująca porost włosów i dbająca o skórę głowy.",
    tags: ["hair", "water", "eco_packaging", "vegan", "zero_waste"],
    imageUrl: "https://la-le.pl/environment/cache/images/productGfx_1352_500_500/ROZMARYN.jpg",
    whyMatch: "Rozmaryn pobudza krążenie w skórze głowy, wzmacniając cebulki i przyspieszając wzrost włosów.",
    price: "39,00 zł",
    url: "https://la-le.pl/wcierka-do-wlosow-rozmaryn"
  },
  {
    id: "p8",
    name: "Masło kawowe pod oczy",
    category: "Twarz",
    description: "Bogate masło pod oczy redukujące cienie, opuchliznę i drobne zmarszczki.",
    tags: ["face", "mature", "aging", "rich", "eco_packaging"],
    imageUrl: "https://la-le.pl/environment/cache/images/productGfx_1452_500_500/KAWA_MALA.png",
    whyMatch: "Kofeina pobudza mikrokrążenie, skutecznie niwelując cienie i oznaki zmęczenia wokół oczu.",
    price: "35,00 zł",
    url: "https://la-le.pl/maslo-kawowe-pod-oczy-male"
  },
  {
    id: "p9",
    name: "Krem do twarzy dyniowy",
    category: "Twarz",
    description: "Głęboko nawilżający krem z olejem z pestek dyni i hydrolatem z rumianku.",
    tags: ["face", "oily", "mixed", "hydration", "light", "fast_absorbing", "vegan"],
    imageUrl: "https://la-le.pl/environment/cache/images/productGfx_1416_500_500/krem_dynia.png",
    whyMatch: "Lekka formuła zapewnia optymalne nawilżenie i reguluje wydzielanie sebum bez obciążania skóry.",
    price: "45,00 zł",
    url: "https://la-le.pl/krem-do-twarzy-dyniowy-gleboko-nawilzajacy-z-olejem-z-pestek-dyni"
  },
  {
    id: "p10",
    name: "Tripeptydy Miedziowe Krem",
    category: "Twarz",
    description: "Krem do twarzy z tripeptydami miedziowymi, silnie regenerujący i przeciwstarzeniowy.",
    tags: ["face", "discoloration", "aging", "rich", "fast_absorbing", "vegan"],
    imageUrl: "https://la-le.pl/environment/cache/images/productGfx_1289_500_500/tripeptydy-krem-do-twarzy-.jpg",
    whyMatch: "Tripeptydy miedziowe stymulują produkcję kolagenu i elastyny, poprawiając jędrność i elastyczność skóry.",
    price: "59,00 zł",
    url: "https://la-le.pl/pl/p/TRIPEPTYDY-MIEDZIOWE-Krem-do-twarzy/456"
  }
];
