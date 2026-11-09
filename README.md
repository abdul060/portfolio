U02 – Portfolio med JavaScript


Det här är min personliga portfolio som jag har vidareutvecklat från uppgift U01. Sidan är byggd med HTML, CSS och JavaScript och är responsiv för både mobil och dator.

I den här uppgiften har jag gjort portfolion mer dynamisk genom att hämta mitt CV från en JSON-fil och mina projekt från GitHubs API. Jag har också lagt till mörkt och ljust läge samt filtrering av projekt.

Länkar

GitHub: https://github.com/abdul060
Publicerad portfolio: https://abdul060.github.io/portfolio/

Reflektion

Datans väg – GitHub API

När en besökare öppnar min projektsida körs funktionen `loadProjects()` i `projects.js`. Funktionen använder `fetch()` för att skicka en HTTP GET-förfrågan till GitHubs API.

API:et skickar tillbaka JSON-data med information om mina publika repositories, bland annat namn, beskrivning, programmeringsspråk och länkar.

Jag kontrollerar först att anropet lyckades med `response.ok`. Sedan använder jag `response.json()` för att omvandla svaret till JavaScript-objekt.

Projekten sparas i arrayen `allProjects`. Därefter använder jag `renderProjects()` och `createProjectCard()` för att skapa projektkort som visas på sidan.

Jag valde den här lösningen eftersom mina projekt kan hämtas automatiskt från GitHub utan att jag behöver skriva in dem direkt i HTML.

Två datakällor

Jag använder både lokala JSON-filer och GitHubs API.

Mitt CV ligger i `cv.json`, där jag själv har skrivit in mina utbildningar och tidigare arbeten. Jag använder också `projects.json` för att lägga till ett extra projekt.

Skillnaden är att jag själv kontrollerar innehållet i mina JSON-filer, medan GitHub är en extern datakälla som kan ändras eller vara tillfälligt otillgänglig.

Båda datakällorna läses med `fetch()` och omvandlas med `response.json()`. Jag valde JSON eftersom det gör det enkelt att hålla informationen separat från HTML-koden.

DOM och händelser

Jag använder JavaScript för att skapa HTML-element dynamiskt i stället för att skriva alla projektkort direkt i HTML.

I `createProjectCard()` använder jag `document.createElement()` för att skapa exempelvis `li`, `h2`, `p` och `a`. Sedan använder jag `append()` för att lägga till elementen på sidan.

Jag använder också `addEventListener()` för att lyssna efter klick på filterknapparna och knappen för mörkt och ljust läge.

Jag valde att använda funktioner för detta eftersom koden blir enklare att återanvända och ändra.

Semantik och tillgänglighet

Jag har försökt använda rätt HTML-element även när innehållet skapas med JavaScript.

Projektkorten ligger i en lista med `ul` och `li`. Projektnamnen använder rubriker och länkarna skapas med `a`.

För interaktiva funktioner använder jag riktiga `button`-element i stället för klickbara `div`-element.

Filterknapparna använder också `aria-pressed` för att visa vilket filter som är aktivt.

Jag har kontrollerat mina HTML-filer med W3C Validator och fått 0 fel. Jag har även testat projektsidan med tangentbord för att kontrollera att länkar och knappar fungerar utan mus.

Mörkt och ljust läge

Jag har byggt temaväxlingen med CSS-variabler och klassen `dark-theme`.

När besökaren klickar på knappen använder JavaScript `classList.toggle()` för att lägga till eller ta bort klassen på HTML-elementet.

Jag använder också `localStorage` för att spara användarens val, så att samma tema behålls när man byter sida eller uppdaterar webbläsaren.

Jag valde CSS-variabler eftersom färgerna då kan ändras på ett ställe. Om jag hade ändrat varje färg direkt med JavaScript skulle koden blivit längre och svårare att underhålla.

Felhantering och laddning

När projektsidan öppnas visas texten "Loading projects..." medan informationen hämtas.

Om GitHub-anropet misslyckas visas ett felmeddelande på sidan i stället för att besökaren bara ser en tom yta.

Jag kontrollerar också om projektlistan är tom och visar då ett meddelande.

Jag valde att visa dessa meddelanden eftersom besökaren ska förstå vad som händer, även om GitHub svarar långsamt eller ett fel uppstår.

Jag har testat felhanteringen genom att tillfälligt använda en felaktig API-adress och kontrollera att felmeddelandet visas.

Styrkor och förbättringar

Jag tycker att en styrka med min portfolio är att jag har återanvänt designen från U01 och samtidigt gjort innehållet mer dynamiskt.

Jag är också nöjd med att projekten hämtas automatiskt och att besökaren kan filtrera dem efter programmeringsspråk.

En sak jag skulle förbättra med mer tid är felhanteringen för de två datakällorna. Just nu kan ett misslyckat GitHub-anrop göra att även det lokala projektet inte visas.

Jag skulle vilja ändra detta så att lokala projekt fortfarande visas även om GitHub inte fungerar.

AI-verktyg

Jag har använt ChatGPT som stöd under utvecklingen av min portfolio.

Jag använde AI för att få hjälp med JavaScript, GitHub API, JSON, CSS och felsökning.

Jag har inte bara kopierat kod utan också testat funktionerna i webbläsaren och ändrat koden för att passa min befintliga design.

Ett exempel är projektkorten, där jag anpassade JavaScript-koden så att den använder CSS-klasserna från min tidigare portfolio.

AI har hjälpt mig att förstå hur funktionerna fungerar, men jag har själv arbetat med att lägga in, testa och anpassa ändringarna.

