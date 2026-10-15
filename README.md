# portfolio
Publicerad sida: {https://effervescent-churros-414d62.netlify.app/}

Reflektion
Från skiss till kod
Jag började med att dela upp skissen i det som återkommer på alla sidor (header med logotyp, navigering och sociala ikoner, samt footer) och det som är unikt per sida. Det återkommande ligger i base.css, och varje sida har en egen fil ( home.css, about.css, tech-stack.css, projects.css, conatct.css). Då behöver en ndring i headern bara göras på ett ställe. Mått som 704px bredd på about och 375px på projektkorten mätte jag i Figma.

Två saker var svåra att översätta den första var posterna under Work Experience i about.html. Min första struktur hade felaktigt nästlade div, så Flexbox kunde inte avgöra vad som var vänster och höger. Jag löste det genom att göra .entry till en flex-rad med två barn, .entry__main (title, företag, ort) och .entry__side (badge, datum). Båda Båda barnen är flex-kolumner. Den andra var gradienttexten i footern och i namnet i hero. CSS kan inte ge text en gradient med color, så jag använde background: linear-gradient(...) tillsammans med color: transparent och background-clip: text (.gradient-footer-text, .hero__name), jag har fått hjälp av Claude och min bror för att göra detta.

Semantik

Jag valde header, nav, main och footer för sidans delar, så att skärmläsare kan hoppa mellan landmärken. Menyn, de sociala ikonerna, posterna och teknikikonerna är ul/li, eftersom de är grupper av likadana objekt. På About-sidan är rubrikhierarkin h1 (About Me), h2 (Work Experience, Education) och h3 (varje jobbtitel). Datumen ligger i time med datetime, och menyknappen är en riktig button, så den går att nå med tangentbord utan extra kod. Varje section har en rubrik.

Jag landade i div på några ställen. .entry__main och .entry__side är rena layoutgrupper utan eget innehållsvärde, så div är rimligt där. Profilbildens .hero__photo hade kunnat vara en figure. Projektkorten på Projects-sidan (.card-container, .card-header, .card-body-holder) är det största misstaget: varje kort är ett fristående innehåll och borde vara en article i en ul. Kontaktsidans e-postadress ligger i en h2, men den är inte en rubrik och borde vara en länk med mailto:.

Layout

Jag använde Flexbox där innehållet ligger längs en axel. .site-header__inner lägger logotypen till vänster och navigeringen till höger med justify-content: space-between. .entry och .entry__meta ordnar poster och metainformation. body är en flex-kolumn med main { flex: 1 }, så att footern hamnar längst ner även på korta sidor. Projektkorten ordnas med flex-wrap och column-gap/row-gap på .hero i projects.css. 

Grid använde jag för .tech-list, eftersom ikonerna ska ligga i rader och kolumner samtidigt: fyra kolumner på mobil och sex på desktop (repeat(4, 1fr) och repeat(6, 1fr)). Med mer tid hade jag även gjort projektkorten till Grid. De är lika breda och ska ligga i kolumner, vilket Grid beskriver mer direkt än flex-wrap. 

Brytpunkterna ligger vid 600 px och 992 px i base.css. 600 px kommer från skissen, där mobillayouten är 600 px bred, och där fälls navigeringen ihop till en kolumn med hamburgarknapp. 992 px valde jag för att navigeringen med sina 54 px mellanrum inte ryms bredvid logotypen i mellanlägen, så teckenstorlek och avstånd minskar där. I tech-stack.css använder jag min-width: 48em (mobile first), men resten av filerna är skrivna desktop först med max-width. Det är inkonsekvent, och det borde ha varit mobile first genomgående.

Användbarhet 
Jag känner igen konsekvens (samma header och footer överallt), tydlig visuell hierarki (42 px rubriker mot 12 px metatext) och gott om luft mellan sektionerna. Posterna under Work Experience grupperas med avskiljande linjer. Det följer närhetsprincipen, eftersom det som hör ihop ligger nära varandra. Ikonerna ligger alltid bredvid sin text, och länkarna i korten är understrukna så att man ser att de går att klicka på. 

Jag hade gjort annorlunda: kontrasten i den små grå texten är för låg, och e-postadressen på Contact-sidan är inte klickbar. Jag hade också lagt till ett formulär eller en mailto-länk.

Tillgänglighet

Bilder har alt: porträttet beskriver innehållet, och dekorativa ikoner (sociala ikoner, byggnads-, plats- och kalenderikoner) har tom alt="", eftersom texten bredvid säger samma sak. Logotypen har aria-label. Menyknappen har aria-expanded och aria-controls, och klassen .visually-hidden döljer text visuellt men inte för skärmläsare. Alla interaktiva element är riktiga länkar och knappar, och jag har inte tagit bort webbläsarens fokusmarkering.

Jag har själv testat tillgänglighet med validator.w3.org och visade inga problem med tillgänglighet jag också testat att tabba genom sidorna och inga problem uppstog. 

Styrkor och brister 

Det som blev bra är strukturen i base.css plus en fil per sida, och Work Experience-posterna, som följer skissen. Brister: många färger är hårdkodade ( #42446E, #666666) trots att jag har CSS-variabler i :root, mått är i px, och projektkorten är div i stället för article. Med mer tid skulle jag skriva om CSS:en mobile first, flytta färgerna till variabler, bygga korten som article i en Grid och göra menyn funktionell. Vad jag har märkt också är att mobile version i figma är en Screenshoot så man kunde inte ta de verkliga storlekar färger och platser på allt. 

AI-verktyg

Jag har använt Claude för att få en grundstruktur för HTML i vissa platser, jag har också frågat om förklaring och felsökning på vissa platser som ex Flexbox-strukturen i About och grid i Tech Stack. Alla mått och färger är från Figma.
