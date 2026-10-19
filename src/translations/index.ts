import { Category, Difficulty, Language } from '../types';

export interface ProblemTranslation {
  title: string;
  statement: string;
  hint: string;
  solutionShort: string;
  solutionSteps: string[];
  takeaway: string;
  interactiveInstructions?: string;
  placeholder?: string;
  unit?: string;
}

export interface UiTranslations {
  siteTitle: string;
  heroHeadline: string;
  heroSubtitle: string;
  startAdventure: string;
  allChallenges: string;
  progressSolved: string;
  progressViewed: string;
  filterAge: string;
  filterCategory: string;
  filterDifficulty: string;
  filterAll: string;
  resetFilters: string;
  exploreProblem: string;
  backToChallenges: string;
  previousProblem: string;
  nextProblem: string;
  ageYears: string;
  minutesShort: string;
  categories: Record<Category, string>;
  difficulties: Record<Difficulty, string>;
  trialArea: string;
  checkAnswer: string;
  giveHint: string;
  hintTitle: string;
  showSolution: string;
  hideSolution: string;
  solutionShortTitle: string;
  stepByStepTitle: string;
  takeawayTitle: string;
  iUnderstood: string;
  understoodBadge: string;
  solvedBadge: string;
  resetProblem: string;
  feedbackWrong: string;
  feedbackCorrect: string;
  numericAnswerLabel: string;
  footerNote: string;
  schematicNotice: string;
  // Specific activity strings
  appleGiveFruit: string;
  appleGiveBasket: string;
  appleReset: string;
  appleAssigned: string;
  catsCountLabel: string;
  catsSelectedSight: string;
  chairsRemaining: string;
  chairsWallNorth: string;
  chairsWallSouth: string;
  chairsWallEast: string;
  chairsWallWest: string;
  chairsConditionMet: string;
  chairsConditionNotMet: string;
  parityTokensRemoved: string;
  parityGoal: string;
  parityRowTotal: string;
  parityColTotal: string;
  parityEven: string;
  parityOdd: string;
  triangleSumTarget: string;
  triangleSideA: string;
  triangleSideB: string;
  triangleSideC: string;
  trianglePool: string;
  riverFarmer: string;
  riverWolf: string;
  riverGoat: string;
  riverCabbage: string;
  riverLeftBank: string;
  riverRightBank: string;
  riverBoat: string;
  riverCross: string;
  riverStepPrev: string;
  riverStepNext: string;
  riverReplay: string;
  riverInvalidDangerWolf: string;
  riverInvalidDangerCabbage: string;
  pilesSource: string;
  pilesDest: string;
  pilesMoveBtn: string;
  pilesMovesCount: string;
  pilesUndo: string;
  pilesReset: string;
  pilesHistoryTitle: string;
  trainsTimeSliderLabel: string;
  trainsDistanceRemaining: string;
  clockCompareBtn6: string;
  clockCompareBtn12: string;
  clockIntervalsCount: string;
  clockSoundOn: string;
  clockSoundOff: string;
  clockPlayChime: string;
  flyTimeElapsed: string;
  flyRemainingDist: string;
  flyTotalDistance: string;
}

export const translations: Record<Language, { ui: UiTranslations; problems: Record<number, ProblemTranslation> }> = {
  ro: {
    ui: {
      siteTitle: "Matematica Distractivă",
      heroHeadline: "Probleme mici. Descoperiri mari.",
      heroSubtitle: "Explorează 10 provocări de logică și matematică, cu indicii, ilustrații și explicații pas cu pas.",
      startAdventure: "Începe aventura",
      allChallenges: "Toate provocările",
      progressSolved: "Ai rezolvat {solved} din {total} provocări",
      progressViewed: "Soluții consultate: {viewed}",
      filterAge: "Vârstă",
      filterCategory: "Categorie",
      filterDifficulty: "Dificultate",
      filterAll: "Toate",
      resetFilters: "Resetează filtrele",
      exploreProblem: "Explorează problema",
      backToChallenges: "Înapoi la provocări",
      previousProblem: "Problema anterioară",
      nextProblem: "Problema următoare",
      ageYears: "ani",
      minutesShort: "min",
      categories: {
        logic: "Logică",
        observation: "Observație",
        geometry: "Geometrie",
        parity: "Paritate",
        arithmetic: "Aritmetică",
        motion: "Mișcare",
        time: "Timp și intervale"
      },
      difficulties: {
        easy: "Ușor",
        medium: "Mediu",
        challenging: "Provocator"
      },
      trialArea: "Zonă de încercare",
      checkAnswer: "Verifică",
      giveHint: "Indiciu",
      hintTitle: "Indiciu util",
      showSolution: "Soluție",
      hideSolution: "Ascunde soluția",
      solutionShortTitle: "Răspunsul pe scurt",
      stepByStepTitle: "Explicație pas cu pas",
      takeawayTitle: "Ideea de reținut",
      iUnderstood: "Am înțeles soluția",
      understoodBadge: "Soluție consultată",
      solvedBadge: "Rezolvată independent",
      resetProblem: "Reîncearcă",
      feedbackWrong: "Mai încearcă! Poți folosi un indiciu.",
      feedbackCorrect: "Bravo! Ai descoperit ideea.",
      numericAnswerLabel: "Răspunsul tău:",
      footerNote: "O colecție de provocări clasice de matematică recreativă, cu enunțuri reformulate și ilustrații originale.",
      schematicNotice: "Animație schematică (în modelul matematic ideal numărul traversărilor este nelimitat)",
      appleGiveFruit: "Oferă un măr",
      appleGiveBasket: "Oferă coșul cu ultimul măr",
      appleReset: "Resetează merele",
      appleAssigned: "Copilul are deja mărul lui!",
      catsCountLabel: "Câte pisici sunt în cameră?",
      catsSelectedSight: "Pisica {id} le vede pe celelalte 3 pisici din colțuri:",
      chairsRemaining: "Scaune disponibile",
      chairsWallNorth: "Peretele de Nord",
      chairsWallSouth: "Peretele de Sud",
      chairsWallEast: "Peretele de Est",
      chairsWallWest: "Peretele de Vest",
      chairsConditionMet: "Fiecare perete are exact același număr de scaune!",
      chairsConditionNotMet: "Pereții nu au încă același număr de scaune sau nu ai folosit toate cele 10 scaune.",
      parityTokensRemoved: "Jetoane eliminate",
      parityGoal: "Trebuie să elimini exact 6 jetoane",
      parityRowTotal: "Rând",
      parityColTotal: "Coloană",
      parityEven: "Par",
      parityOdd: "Impar",
      triangleSumTarget: "Suma țintă pe fiecare latură: 17",
      triangleSideA: "Latura Stânga (1 - 2)",
      triangleSideB: "Latura Bază (2 - 3)",
      triangleSideC: "Latura Dreapta (3 - 1)",
      trianglePool: "Numere de așezat:",
      riverFarmer: "Omul",
      riverWolf: "Lupul",
      riverGoat: "Capra",
      riverCabbage: "Varza",
      riverLeftBank: "Malul stâng",
      riverRightBank: "Malul drept",
      riverBoat: "În barcă",
      riverCross: "Traversează râul",
      riverStepPrev: "Pasul anterior",
      riverStepNext: "Pasul următor",
      riverReplay: "Reia animația",
      riverInvalidDangerWolf: "Atenție! Lupul nu poate rămâne nesupravegheat cu capra!",
      riverInvalidDangerCabbage: "Atenție! Capra nu poate rămâne nesupravegheată cu varza!",
      pilesSource: "Grămada Sursă",
      pilesDest: "Grămada Destinație",
      pilesMoveBtn: "Efectuează mutarea",
      pilesMovesCount: "Mutări efectuate",
      pilesUndo: "Anulează mutarea",
      pilesReset: "Reîncepe",
      pilesHistoryTitle: "Istoric mutări",
      trainsTimeSliderLabel: "Timp rămas până la întâlnire (minute):",
      trainsDistanceRemaining: "Distanță între trenuri:",
      clockCompareBtn6: "Vizualizează 6 bătăi (ora 6)",
      clockCompareBtn12: "Vizualizează 12 bătăi (ora 12)",
      clockIntervalsCount: "Număr de intervale:",
      clockSoundOn: "Sunet activat",
      clockSoundOff: "Sunet dezactivat",
      clockPlayChime: "Ascultă bătaia",
      flyTimeElapsed: "Timp scurs din călătorie:",
      flyRemainingDist: "Distanță rămasă între bicicliști:",
      flyTotalDistance: "Distanță parcursă de muscă:"
    },
    problems: {
      1: {
        title: "Mărul care rămâne în coș",
        statement: "Într-un coș sunt 5 mere. Distribuie merele către 5 copii, astfel încât fiecare copil să primească un măr, dar un măr să rămână în coș. Cum este posibil?",
        hint: "Trebuie neapărat să scoți toate merele din coș?",
        solutionShort: "Primii 4 copii primesc câte un măr scos din coș, iar al cincilea copil primește coșul cu ultimul măr în el.",
        solutionSteps: [
          "Primii 4 copii primesc câte un măr direct în mână.",
          "Al cincilea copil primește coșul cu ultimul măr rămas înăuntru.",
          "Astfel, toți cei 5 copii au primit câte un măr, iar un măr se află în continuare în coș."
        ],
        takeaway: "Uneori soluția apare când observăm ce nu ne interzice enunțul."
      },
      2: {
        title: "Pisicile din cele patru colțuri",
        statement: "În fiecare dintre cele 4 colțuri ale unei camere se află câte o pisică. Fiecare pisică le vede pe celelalte 3. Fiecare pisică stă pe propria coadă. Câte pisici sunt în cameră?",
        hint: "Pisicile văzute de una dintre ele pot fi chiar cele aflate deja în celelalte colțuri.",
        solutionShort: "În cameră sunt exact 4 pisici.",
        solutionSteps: [
          "Camera pătrată are exact 4 colțuri.",
          "În fiecare colț stă o singură pisică, deci în total sunt 1 + 1 + 1 + 1 = 4 pisici.",
          "Din colțul ei, oricare pisică privește spre celelalte 3 colțuri și le vede pe celelalte 3 pisici deja prezente.",
          "Fiecare pisică stă pe propria coadă, ceea ce nu adaugă nicio altă pisică în cameră."
        ],
        takeaway: "Aceleași obiecte pot apărea în mai multe descrieri fără să fie numărate din nou.",
        unit: "pisici"
      },
      3: {
        title: "Zece scaune și patru pereți",
        statement: "Așază 10 scaune de-a lungul pereților unei camere pătrate, astfel încât fiecare perete să aibă același număr de scaune. Un scaun aflat într-un colț se numără pentru ambii pereți care se întâlnesc acolo.",
        hint: "Un scaun din colț poate ajuta doi pereți simultan.",
        solutionShort: "Pune câte un scaun în 2 colțuri opuse și câte 2 scaune pe fiecare dintre cele 4 laturi: fiecare perete va avea exact 3 scaune.",
        solutionSteps: [
          "Așază câte un scaun în două colțuri opuse (folosești 2 scaune).",
          "Așază câte 2 scaune de-a lungul fiecăruia dintre cei 4 pereți (4 × 2 = 8 scaune).",
          "Numărul total de scaune folosite este 2 + 8 = 10 scaune.",
          "Fiecare perete conține 2 scaune pe mijloc și 1 scaun de colț, adică exact 3 scaune pe fiecare perete."
        ],
        takeaway: "Un obiect aflat la intersecția a două laturi poate contribui la ambele."
      },
      4: {
        title: "Punctele care rămân în perechi",
        statement: "Ai 16 jetoane așezate într-o grilă de 4 rânduri și 4 coloane. Elimină exact 6 jetoane, astfel încât în fiecare rând și în fiecare coloană să rămână un număr par de jetoane. Și zero este un număr par.",
        hint: "Poți elimina câte 2 jetoane din 3 rânduri, având grijă ca și coloanele să piardă un număr par.",
        solutionShort: "Elimină jetoanele din pozițiile (1,1), (1,2), (2,1), (2,3), (3,2) și (3,3).",
        solutionSteps: [
          "Elimină jetoanele de pe rândul 1 la coloanele 1 și 2 (rămân 2 jetoane pe rândul 1).",
          "Elimină jetoanele de pe rândul 2 la coloanele 1 și 3 (rămân 2 jetoane pe rândul 2).",
          "Elimină jetoanele de pe rândul 3 la coloanele 2 și 3 (rămân 2 jetoane pe rândul 3).",
          "Pe rândul 4 rămân toate cele 4 jetoane.",
          "Astfel, pe rânduri avem 2, 2, 2, 4 (toate pare), iar pe coloane avem 2, 2, 2, 4 (toate pare). Am eliminat exact 6 jetoane!"
        ],
        takeaway: "Dacă dintr-un număr par scădem un număr par, rămâne un număr par."
      },
      5: {
        title: "Triunghiul magic",
        statement: "Un triunghi are numărul 1 în vârful de sus, 2 în vârful din stânga jos și 3 în vârful din dreapta jos. Pe fiecare latură există două locuri libere. Așază numerele 4, 5, 6, 7, 8 și 9, fiecare o singură dată, astfel încât suma celor 4 numere de pe fiecare latură să fie 17.",
        hint: "Scade din 17 numerele celor două vârfuri ale fiecărei laturi.",
        solutionShort: "Între 1 și 2 așază 5 și 9; între 2 și 3 așază 4 și 8; între 3 și 1 așază 6 și 7.",
        solutionSteps: [
          "Pe latura dintre vârfurile 1 și 2: 1 + 2 = 3. Pentru suma 17 avem nevoie de încă 14. Folosim numerele 5 și 9 (5 + 9 = 14). Verificare: 1 + 5 + 9 + 2 = 17.",
          "Pe latura dintre vârfurile 2 și 3: 2 + 3 = 5. Pentru suma 17 avem nevoie de încă 12. Folosim numerele 4 și 8 (4 + 8 = 12). Verificare: 2 + 4 + 8 + 3 = 17.",
          "Pe latura dintre vârfurile 3 și 1: 3 + 1 = 4. Pentru suma 17 avem nevoie de încă 13. Folosim numerele 6 și 7 (6 + 7 = 13). Verificare: 3 + 6 + 7 + 1 = 17.",
          "Toate numerele de la 4 la 9 au fost folosite o singură dată, iar fiecare latură însumează 17."
        ],
        takeaway: "O problemă mare devine mai simplă când calculăm separat ce lipsește din fiecare parte."
      },
      6: {
        title: "Lupul, capra și varza",
        statement: "Un om trebuie să treacă un râu împreună cu un lup, o capră și o varză. Barca îl poate transporta pe om și, cel mult, un singur pasager: lupul, capra sau varza. Omul poate traversa și singur. Fără om, lupul nu poate rămâne cu capra, iar capra nu poate rămâne cu varza. Cum îi duce pe toți pe malul celălalt?",
        hint: "Poate fi nevoie să aduci înapoi pe cineva pe care tocmai l-ai trecut.",
        solutionShort: "Omul trece capra, se întoarce singur, duce lupul, aduce capra înapoi, duce varza, se întoarce singur și ia din nou capra.",
        solutionSteps: [
          "Pasul 1: Omul duce capra pe malul drept. Pe malul stâng rămân lupul și varza (în siguranță).",
          "Pasul 2: Omul se întoarce singur pe malul stâng.",
          "Pasul 3: Omul duce lupul pe malul drept.",
          "Pasul 4: Omul aduce capra înapoi pe malul stâng (lupul rămâne singur pe malul drept).",
          "Pasul 5: Omul duce varza pe malul drept (capra rămâne pe malul stâng).",
          "Pasul 6: Omul se întoarce singur pe malul stâng.",
          "Pasul 7: Omul ia din nou capra și o aduce pe malul drept. Toți patru au traversat râul cu succes!"
        ],
        takeaway: "Un pas înapoi poate face parte dintr-un plan bun."
      },
      7: {
        title: "Trei grămezi, trei mutări",
        statement: "Ai 3 grămezi de jetoane: A are 11, B are 7 și C are 6. Obține câte 8 jetoane în fiecare grămadă, în exact 3 mutări. La fiecare mutare alegi o grămadă sursă și una destinație. Trebuie să transferi exact atâtea jetoane câte se află deja în grămada destinație. Sursa trebuie să aibă suficiente jetoane.",
        hint: "Încearcă să creezi o grămadă de 4 jetoane: aceasta poate deveni 8 la următoarea alimentare.",
        solutionShort: "Mutarea 1: A → B (mută 7). Mutarea 2: B → C (mută 6). Mutarea 3: C → A (mută 4).",
        solutionSteps: [
          "Starea de start: A: 11, B: 7, C: 6. Total = 24 de jetoane.",
          "Mutarea 1: Din A în B transferăm 7 jetoane (dublăm B). Starea devine: A = 4, B = 14, C = 6.",
          "Mutarea 2: Din B în C transferăm 6 jetoane (dublăm C). Starea devine: A = 4, B = 8, C = 12.",
          "Mutarea 3: Din C în A transferăm 4 jetoane (dublăm A). Starea devine: A = 8, B = 8, C = 8.",
          "Toate cele 3 grămezi au acum câte 8 jetoane în exact 3 mutări!"
        ],
        takeaway: "Putem găsi un plan urmărind atât totalul, cât și efectul fiecărei mutări."
      },
      8: {
        title: "Trenurile înainte de întâlnire",
        statement: "Două trenuri circulă unul spre celălalt pe aceeași rută, cu viteze constante de 60 km/h și 40 km/h, fără opriri. Ambele sunt deja în mișcare cu o oră înainte de întâlnire. Ce distanță se află între ele în acel moment?",
        hint: "Într-o oră, fiecare tren parcurge o parte din distanța care le separă.",
        solutionShort: "Cu o oră înainte de întâlnire, distanța dintre trenuri este de 100 km.",
        solutionSteps: [
          "Primul tren parcurge 60 km în fiecare oră.",
          "Al doilea tren parcurge 40 km în fiecare oră.",
          "Mergând unul spre celălalt, ele micșorează distanța dintre ele cu viteza combinată: 60 + 40 = 100 km/h.",
          "Dacă mai este exact o oră până la întâlnire, distanța rămasă între ele este chiar viteza combinată înmulțită cu 1 oră: 100 km/h × 1 h = 100 km."
        ],
        takeaway: "Când două obiecte se apropie, vitezele lor de apropiere se adună.",
        unit: "km"
      },
      9: {
        title: "Bătăile ceasului",
        statement: "La ora 6, un ceas bate de 6 ori. De la prima până la ultima bătaie trec 30 de secunde. Pauzele dintre bătăi sunt egale. La ora 12, cât timp trece de la prima până la ultima dintre cele 12 bătăi? Consideră bătăile instantanee.",
        hint: "Între 2 bătăi există o singură pauză. Câte pauze sunt între 6 bătăi?",
        solutionShort: "Trec exact 66 de secunde de la prima până la a 12-a bătaie.",
        solutionSteps: [
          "Între 6 bătăi sunt 6 - 1 = 5 intervale (pauze) egale.",
          "Fiecare interval durează: 30 secunde ÷ 5 = 6 secunde.",
          "La ora 12 sunt 12 bătăi, deci 12 - 1 = 11 intervale între ele.",
          "Timpul total este: 11 intervale × 6 secunde = 66 de secunde."
        ],
        takeaway: "Numărul spațiilor dintre evenimente este cu unu mai mic decât numărul evenimentelor.",
        unit: "secunde"
      },
      10: {
        title: "Musca dintre bicicliști",
        statement: "Doi bicicliști sunt la 300 km unul de celălalt și pornesc simultan unul spre celălalt. Fiecare merge constant cu 50 km/h. În aceeași clipă, o muscă pleacă de la primul spre al doilea cu 100 km/h. Musca zboară continuu de la unul la celălalt până când bicicliștii se întâlnesc. Ce distanță totală parcurge musca? Presupunem că întoarcerile sunt instantanee.",
        hint: "Nu trebuie să calculezi fiecare zbor. Află mai întâi cât timp zboară musca.",
        solutionShort: "Musca parcurge în total 300 km.",
        solutionSteps: [
          "Cei doi bicicliști se deplasează unul spre celălalt cu 50 km/h fiecare, apropiindu-se cu 50 + 50 = 100 km/h.",
          "Până la întâlnire, timpul necesar pentru a parcurge distanța de 300 km este: 300 km ÷ 100 km/h = 3 ore.",
          "Musca zboară fără oprire pe întreaga durată de 3 ore, având viteza constantă de 100 km/h.",
          "Distanța totală zburată este viteza × timpul = 100 km/h × 3 ore = 300 km."
        ],
        takeaway: "Uneori este mai simplu să aflăm timpul total decât să adunăm toate etapele.",
        unit: "km"
      }
    }
  },
  en: {
    ui: {
      siteTitle: "Matematica Distractivă",
      heroHeadline: "Small problems. Big discoveries.",
      heroSubtitle: "Explore 10 logic and math challenges, with hints, illustrations, and step-by-step explanations.",
      startAdventure: "Start the adventure",
      allChallenges: "All challenges",
      progressSolved: "You solved {solved} of {total} challenges",
      progressViewed: "Solutions consulted: {viewed}",
      filterAge: "Age",
      filterCategory: "Category",
      filterDifficulty: "Difficulty",
      filterAll: "All",
      resetFilters: "Reset filters",
      exploreProblem: "Explore challenge",
      backToChallenges: "Back to challenges",
      previousProblem: "Previous challenge",
      nextProblem: "Next challenge",
      ageYears: "years",
      minutesShort: "min",
      categories: {
        logic: "Logic",
        observation: "Observation",
        geometry: "Geometry",
        parity: "Parity",
        arithmetic: "Arithmetic",
        motion: "Motion",
        time: "Time & Intervals"
      },
      difficulties: {
        easy: "Easy",
        medium: "Medium",
        challenging: "Challenging"
      },
      trialArea: "Interactive Workspace",
      checkAnswer: "Check answer",
      giveHint: "Hint",
      hintTitle: "Helpful hint",
      showSolution: "Solution",
      hideSolution: "Hide solution",
      solutionShortTitle: "Quick answer",
      stepByStepTitle: "Step-by-step explanation",
      takeawayTitle: "Key takeaway",
      iUnderstood: "I understood the solution",
      understoodBadge: "Solution consulted",
      solvedBadge: "Solved independently",
      resetProblem: "Reset",
      feedbackWrong: "Try again! You can use a hint.",
      feedbackCorrect: "Well done! You discovered the idea.",
      numericAnswerLabel: "Your answer:",
      footerNote: "A collection of classic recreational math challenges, with reformulated statements and original illustrations.",
      schematicNotice: "Schematic animation (in the ideal mathematical model, the number of turns is infinite)",
      appleGiveFruit: "Give one apple",
      appleGiveBasket: "Give the basket with the last apple",
      appleReset: "Reset apples",
      appleAssigned: "This child already has their apple!",
      catsCountLabel: "How many cats are in the room?",
      catsSelectedSight: "Cat {id} sees the other 3 corner cats:",
      chairsRemaining: "Chairs left",
      chairsWallNorth: "North Wall",
      chairsWallSouth: "South Wall",
      chairsWallEast: "East Wall",
      chairsWallWest: "West Wall",
      chairsConditionMet: "Every wall has the exact same number of chairs!",
      chairsConditionNotMet: "Walls do not yet have equal chairs, or not all 10 chairs have been used.",
      parityTokensRemoved: "Tokens removed",
      parityGoal: "You must remove exactly 6 tokens",
      parityRowTotal: "Row",
      parityColTotal: "Column",
      parityEven: "Even",
      parityOdd: "Odd",
      triangleSumTarget: "Target sum on each side: 17",
      triangleSideA: "Left side (1 - 2)",
      triangleSideB: "Base side (2 - 3)",
      triangleSideC: "Right side (3 - 1)",
      trianglePool: "Numbers to place:",
      riverFarmer: "Farmer",
      riverWolf: "Wolf",
      riverGoat: "Goat",
      riverCabbage: "Cabbage",
      riverLeftBank: "Left bank",
      riverRightBank: "Right bank",
      riverBoat: "In boat",
      riverCross: "Cross the river",
      riverStepPrev: "Previous step",
      riverStepNext: "Next step",
      riverReplay: "Replay animation",
      riverInvalidDangerWolf: "Watch out! The wolf cannot stay unattended with the goat!",
      riverInvalidDangerCabbage: "Watch out! The goat cannot stay unattended with the cabbage!",
      pilesSource: "Source Pile",
      pilesDest: "Destination Pile",
      pilesMoveBtn: "Execute transfer",
      pilesMovesCount: "Moves made",
      pilesUndo: "Undo move",
      pilesReset: "Restart",
      pilesHistoryTitle: "Move history",
      trainsTimeSliderLabel: "Time remaining until meeting (minutes):",
      trainsDistanceRemaining: "Distance between trains:",
      clockCompareBtn6: "View 6 chimes (6:00)",
      clockCompareBtn12: "View 12 chimes (12:00)",
      clockIntervalsCount: "Number of intervals:",
      clockSoundOn: "Sound enabled",
      clockSoundOff: "Sound muted",
      clockPlayChime: "Play chime",
      flyTimeElapsed: "Journey time elapsed:",
      flyRemainingDist: "Distance remaining between cyclists:",
      flyTotalDistance: "Total distance flown by fly:"
    },
    problems: {
      1: {
        title: "The Apple That Stays in the Basket",
        statement: "There are 5 apples in a basket. Distribute the apples to 5 children so that each child gets one apple, but one apple remains in the basket. How is this possible?",
        hint: "Do you really have to take all the apples out of the basket?",
        solutionShort: "The first 4 children each get an apple taken from the basket, and the fifth child receives the basket with the last apple inside.",
        solutionSteps: [
          "The first 4 children each receive one apple directly into their hands.",
          "The fifth child receives the basket containing the last remaining apple.",
          "All 5 children have received one apple, and one apple is still in the basket."
        ],
        takeaway: "Sometimes the solution appears when we notice what the problem doesn't forbid."
      },
      2: {
        title: "The Cats in the Four Corners",
        statement: "In each of the 4 corners of a room sits a cat. Each cat sees the other 3 cats. Each cat sits on its own tail. How many cats are in the room?",
        hint: "The cats seen by one of them can simply be the ones already in the other corners.",
        solutionShort: "There are exactly 4 cats in the room.",
        solutionSteps: [
          "A square room has exactly 4 corners.",
          "In each corner sits a single cat: 1 + 1 + 1 + 1 = 4 cats in total.",
          "From its corner, any cat looks toward the other 3 corners and sees the other 3 already present cats.",
          "Each cat sits on its own tail, which adds no extra cats to the room."
        ],
        takeaway: "The same objects can appear in multiple descriptions without being counted again.",
        unit: "cats"
      },
      3: {
        title: "Ten Chairs and Four Walls",
        statement: "Arrange 10 chairs along the walls of a square room so that each wall has the same number of chairs. A chair placed in a corner counts for both walls that meet there.",
        hint: "A corner chair can help two walls simultaneously.",
        solutionShort: "Place one chair in each of 2 opposite corners, and 2 chairs along each of the 4 walls: each wall will have exactly 3 chairs.",
        solutionSteps: [
          "Place one chair in each of two opposite corners (2 chairs used).",
          "Place 2 chairs along each of the 4 walls (4 × 2 = 8 chairs used).",
          "Total chairs used: 2 + 8 = 10 chairs.",
          "Each wall has 2 chairs along its side plus 1 corner chair: exactly 3 chairs per wall."
        ],
        takeaway: "An object placed at the intersection of two boundaries can contribute to both."
      },
      4: {
        title: "Tokens Remaining in Pairs",
        statement: "You have 16 tokens arranged in a 4×4 grid. Remove exactly 6 tokens so that every row and every column has an even number of tokens. Zero is also an even number.",
        hint: "You can remove 2 tokens from 3 rows, making sure that columns also lose an even number.",
        solutionShort: "Remove tokens at positions (1,1), (1,2), (2,1), (2,3), (3,2), and (3,3).",
        solutionSteps: [
          "Remove tokens on row 1 at columns 1 and 2 (leaves 2 tokens in row 1).",
          "Remove tokens on row 2 at columns 1 and 3 (leaves 2 tokens in row 2).",
          "Remove tokens on row 3 at columns 2 and 3 (leaves 2 tokens in row 3).",
          "Row 4 retains all 4 tokens.",
          "Rows have 2, 2, 2, 4 tokens (all even), and columns have 2, 2, 2, 4 tokens (all even). Exactly 6 tokens removed!"
        ],
        takeaway: "Subtracting an even number from an even number always leaves an even number."
      },
      5: {
        title: "The Magic Triangle",
        statement: "A triangle has the number 1 at the top vertex, 2 at the bottom-left vertex, and 3 at the bottom-right vertex. Each side has two open slots. Place the numbers 4, 5, 6, 7, 8, and 9, each exactly once, so that the sum of the 4 numbers on each side is 17.",
        hint: "Subtract the two vertex numbers of each side from 17.",
        solutionShort: "Between 1 and 2 place 5 and 9; between 2 and 3 place 4 and 8; between 3 and 1 place 6 and 7.",
        solutionSteps: [
          "On the side between vertices 1 and 2: 1 + 2 = 3. To reach 17 we need 14 more. Use numbers 5 and 9 (5 + 9 = 14). Check: 1 + 5 + 9 + 2 = 17.",
          "On the side between vertices 2 and 3: 2 + 3 = 5. To reach 17 we need 12 more. Use numbers 4 and 8 (4 + 8 = 12). Check: 2 + 4 + 8 + 3 = 17.",
          "On the side between vertices 3 and 1: 3 + 1 = 4. To reach 17 we need 13 more. Use numbers 6 and 7 (6 + 7 = 13). Check: 3 + 6 + 7 + 1 = 17.",
          "All numbers from 4 to 9 are used once, and each side sums to exactly 17."
        ],
        takeaway: "A big problem becomes simpler when we calculate what is missing from each part separately."
      },
      6: {
        title: "The Wolf, the Goat, and the Cabbage",
        statement: "A farmer must cross a river with a wolf, a goat, and a cabbage. The boat can carry the farmer and at most one passenger: the wolf, the goat, or the cabbage. The farmer can also cross alone. Without the farmer, the wolf cannot be left alone with the goat, and the goat cannot be left alone with the cabbage. How can he get all of them to the other bank?",
        hint: "You may need to bring back someone you just carried across.",
        solutionShort: "The farmer takes the goat across, returns alone, takes the wolf, brings the goat back, takes the cabbage, returns alone, and finally brings the goat across.",
        solutionSteps: [
          "Step 1: Farmer takes the goat to the right bank (wolf and cabbage remain safely on the left bank).",
          "Step 2: Farmer returns alone to the left bank.",
          "Step 3: Farmer takes the wolf to the right bank.",
          "Step 4: Farmer brings the goat back to the left bank (leaving the wolf alone on the right bank).",
          "Step 5: Farmer takes the cabbage to the right bank (goat stays safely on the left bank).",
          "Step 6: Farmer returns alone to the left bank.",
          "Step 7: Farmer takes the goat to the right bank. All four are safely across!"
        ],
        takeaway: "Taking a step back can be part of a great forward plan."
      },
      7: {
        title: "Three Piles, Three Moves",
        statement: "You have 3 piles of tokens: A has 11, B has 7, and C has 6. Reach 8 tokens in each pile in exactly 3 moves. On each move, pick a source pile and a destination pile. You must transfer exactly as many tokens as the destination pile currently holds. The source must have enough tokens.",
        hint: "Try to create a pile of 4 tokens: it can double into 8 on the next transfer.",
        solutionShort: "Move 1: A → B (move 7). Move 2: B → C (move 6). Move 3: C → A (move 4).",
        solutionSteps: [
          "Initial state: A: 11, B: 7, C: 6. Total = 24 tokens.",
          "Move 1: From A to B, transfer 7 tokens (doubling B). New state: A = 4, B = 14, C = 6.",
          "Move 2: From B to C, transfer 6 tokens (doubling C). New state: A = 4, B = 8, C = 12.",
          "Move 3: From C to A, transfer 4 tokens (doubling A). New state: A = 8, B = 8, C = 8.",
          "All three piles now hold 8 tokens in exactly 3 moves!"
        ],
        takeaway: "We can find a plan by tracking both the total invariant and the precise effect of each move."
      },
      8: {
        title: "Trains Before Meeting",
        statement: "Two trains travel toward each other on the same line at constant speeds of 60 km/h and 40 km/h, without stopping. Both are already in motion one hour before they meet. What distance separates them at that moment?",
        hint: "In one hour, each train travels part of the distance separating them.",
        solutionShort: "One hour before meeting, the trains are exactly 100 km apart.",
        solutionSteps: [
          "The first train covers 60 km in one hour.",
          "The second train covers 40 km in one hour.",
          "Moving toward each other, their combined approach speed is 60 + 40 = 100 km/h.",
          "With exactly one hour left until collision/meeting, the gap between them must be 100 km/h × 1 h = 100 km."
        ],
        takeaway: "When two objects approach each other, their closing speeds add together.",
        unit: "km"
      },
      9: {
        title: "The Clock Chimes",
        statement: "At 6 o'clock, a clock strikes 6 times. From the first to the last strike, 30 seconds elapse. The pauses between strikes are equal. At 12 o'clock, how much time elapses from the first to the last of the 12 strikes? Assume the strikes are instantaneous.",
        hint: "Between 2 strikes there is only 1 pause. How many pauses are between 6 strikes?",
        solutionShort: "Exactly 66 seconds elapse from the first to the 12th chime.",
        solutionSteps: [
          "Between 6 chimes there are 6 - 1 = 5 equal intervals (pauses).",
          "Each interval lasts: 30 seconds ÷ 5 = 6 seconds.",
          "At 12 o'clock there are 12 chimes, which means 12 - 1 = 11 intervals.",
          "The total time is: 11 intervals × 6 seconds = 66 seconds."
        ],
        takeaway: "The number of intervals between events is one less than the number of events.",
        unit: "seconds"
      },
      10: {
        title: "The Fly Between the Cyclists",
        statement: "Two cyclists are 300 km apart and start cycling toward each other at the same time. Each rides at a constant speed of 50 km/h. At that exact moment, a fly starts flying from the first cyclist toward the second at 100 km/h. The fly flies back and forth between them until the cyclists meet. What total distance does the fly cover? Assume instantaneous turns.",
        hint: "You don't need to calculate each zigzag flight. Find out how long the fly is flying first.",
        solutionShort: "The fly travels a total distance of 300 km.",
        solutionSteps: [
          "The two cyclists approach each other at 50 + 50 = 100 km/h.",
          "The time until they meet is 300 km ÷ 100 km/h = 3 hours.",
          "The fly is in continuous flight throughout those 3 hours at a constant 100 km/h.",
          "Total distance = speed × time = 100 km/h × 3 hours = 300 km."
        ],
        takeaway: "Sometimes it is much easier to find the total time than to sum all the individual legs.",
        unit: "km"
      }
    }
  }
};
