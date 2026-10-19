🧩 Matematica Distractivă
Probleme mici. Descoperiri mari.

O aplicație web educațională pentru copii de 7–14 ani, care transformă matematica și logica în provocări vizuale și interactive. Explorează, încearcă, cere un indiciu și descoperă explicația pas cu pas.

🚀 Deschide aplicația · 🐛 Raportează o problemă
Despre proiect
Matematica Distractivă încurajează învățarea prin explorare: copiii pot manipula obiecte virtuale, verifica răspunsuri și urmări soluții explicate vizual. Proiectul a fost realizat cu ajutorul Google AI Studio și include 10 provocări de matematică recreativă, cu interfață în română și engleză.

Poate fi folosit individual, împreună cu părinții sau ca punct de plecare pentru activități la clasă. Vârstele recomandate sunt orientative.
✨ Funcționalități
- 10 activități interactive, de la observație și logică la paritate, geometrie și mișcare.
- Română și engleză, cu româna ca limbă implicită și selector RO / EN.
- Ilustrații SVG și animații care ajută la înțelegerea problemelor.
- Indicii și soluții pas cu pas, accesibile atunci când copilul are nevoie.
- Filtre după vârstă, categorie și dificultate.
- Progres salvat local, cu evidență separată pentru probleme rezolvate și soluții consultate.
- Interfață adaptabilă pentru telefon, tabletă și desktop.
- Fără cont necesar pentru utilizarea activităților.
🎯 Cele 10 provocări
#	Provocare	Vârsta recomandată	Ce exersăm
1	Mărul care rămâne în coș	7–9 ani	Gândire laterală
2	Pisicile din cele patru colțuri	7–10 ani	Observație și numărare
3	Zece scaune și patru pereți	8–11 ani	Geometrie și logică
4	Punctele care rămân în perechi	9–12 ani	Paritate
5	Triunghiul magic	9–12 ani	Aritmetică și strategie
6	Lupul, capra și varza	9–13 ani	Planificare și reguli
7	Trei grămezi, trei mutări	10–13 ani	Operații și planificare
8	Trenurile înainte de întâlnire	11–14 ani	Viteză și distanță
9	Bătăile ceasului	10–14 ani	Timp și intervale
10	Musca dintre bicicliști	12–14 ani	Alegerea unei strategii eficiente


🧭 Cum se folosește
1. Deschide aplicația și alege limba.
2. Explorează provocările sau folosește filtrele.
3. Deschide o problemă și citește regulile.
4. Încearcă activitatea interactivă sau introdu răspunsul, în funcție de problemă.
5. Folosește un indiciu dacă te-ai blocat.
6. Apasă Soluție pentru explicația detaliată și demonstrația vizuală.
Consultarea unei soluții este înregistrată separat de rezolvarea problemei.
🛠️ Tehnologii
Tehnologie	Rol
React 19	Interfață și componente interactive
TypeScript	Tipuri și organizarea logicii
Vite 8	Server de dezvoltare și build
Tailwind CSS 4	Stilizare și layout responsive
Motion	Animații
Lucide React	Pictograme
SVG	Ilustrații și diagrame
localStorage	Salvarea limbii și progresului în browser


💻 Rulare locală
Cerințe
- Node.js compatibil cu Vite 8; recomandat Node.js 22.12+ din seria 22 LTS.
- npm și Git.
Instalare și pornire
git clone https://github.com/msg4u/Matematica-disctractiva.git
cd Matematica-disctractiva
npm install
npm run dev
Deschide adresa afișată în terminal, în mod implicit http://localhost:3000. Dacă portul este ocupat, Vite poate selecta altul.
Comenzi disponibile
Comandă	Descriere
npm run dev	Pornește serverul de dezvoltare pe portul 3000
npm run build	Generează aplicația pentru producție în dist/
npm run preview	Servește local build-ul pentru previzualizare
npm run lint	Verifică tipurile TypeScript prin tsc --noEmit
npm run clean	Șterge dist/ și server.js; utilizează rm, deci necesită un shell compatibil


Pentru verificarea unui build:
npm run lint
npm run build
npm run preview
Comanda lint verifică tipurile; nu reprezintă o suită de teste automate sau o verificare ESLint.
Configurare
Repository-ul include .env.example, cu variabilele GEMINI_API_KEY și APP_URL pentru integrarea cu mediul AI Studio. Acestea nu trebuie confundate cu o cerință de a introduce o cheie API pentru a accesa site-ul public.

Nu publica chei API în repository și nu le include în codul livrat browserului. Pentru eventuale funcționalități AI viitoare, păstrează apelurile autentificate pe server.
📁 Organizarea codului
Cale	Conținut
src/App.tsx	Navigare, filtre, limbă și progres
src/components/	Antet, carduri, filtre, vedere de problemă și panou de soluție
src/components/activities/	Componentele interactive pentru cele 10 provocări
src/data/problems.ts	Metadatele problemelor și filtrarea după vârstă
src/translations/index.ts	Conținutul și textele în română și engleză
src/types/index.ts	Tipuri TypeScript
src/utils/sound.ts	Utilitare pentru sunet
src/index.css	Stiluri globale
vite.config.ts	Configurarea Vite


Pentru a extinde colecția, actualizează metadatele, traducerile, componenta activității și rendererul. Verifică și navigarea din App.tsx, care folosește în prezent limita de 10 probleme.
💾 Progresul utilizatorului
Limba și progresul sunt salvate în browser prin localStorage, folosind cheile:
- matematica_distractiva_lang
- matematica_distractiva_progress
Progresul nu se sincronizează între dispozitive sau browsere. Ștergerea datelor site-ului elimină și progresul local. Dacă stocarea locală nu este disponibilă, aplicația gestionează această situație fără a bloca interfața.
🤝 Contribuții
Sunt binevenite corecturi matematice, îmbunătățiri ale explicațiilor și traducerilor, ajustări de accesibilitate și activități educaționale noi.
1. Deschide un issue pentru a descrie problema sau propunerea.
2. Creează un fork și un branch pentru modificare.
3. Verifică ambele limbi și afișarea pe mobil și desktop.
4. Rulează verificarea TypeScript și build-ul.
5. Trimite un pull request cu descrierea schimbării și, pentru modificări vizuale, capturi de ecran.
Pentru bug-uri, include pașii de reproducere, comportamentul așteptat și browserul folosit. Nu include date personale ale copiilor.
📚 Conținut educațional
Colecția este inspirată de probleme clasice de matematică recreativă și de documentul „Matematica distractivă” (2004), folosit ca material de inspirație în conceperea proiectului. Această mențiune nu reprezintă o declarație privind licența documentului-sursă.
📄 Licență
Codul original al proiectului este disponibil sub licența MIT.

Copyright (c) 2026 Raul Portan.

Componentele și fișierele preluate de la terți își păstrează licențele și notificările originale, inclusiv antetele Apache-2.0 existente. Licența MIT nu se aplică automat documentului-sursă folosit ca inspirație sau altor materiale ale terților.
