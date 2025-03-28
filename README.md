# Examensarbetet

## LÄS DETTA FÖRST INNAN DU BÖRJAR TESTA ALLT I BROWSERN!

Innan du gör någonting så måste du populera databasen med en användare och produkter och några mockorders.
För det behöver du köra node src/BackupData/CreateProducts.js i backenden i terminalen.
CreateProducts.js skapar en användare med namnet SuperAdmin och lösenordet SuperAdmin.
Servern måste hela tiden vara igång för att det ska funka så kör nodemon server.js i terminalen för att ständigt ha den igång.

### Så här startar du upp backenden:

Kör nodemon server.js i terminalen.

### Så här startar du frontenden:

Öppna ett till fönster med Visual Studio Code öppna programmet i viteproject mappen och sedan kör du npm run dev.

**LÄS DETTA SOM ÄR OVANFÖR INNAN DU BÖRJAR TESTA ALLT I BROWSERN!**

När du har gjort allt detta så kan du registera dig med vilket användarnamn som helst. Per default får den rollen user men vill du ändra det så måste du logga in som SuperAdmin och ange användar IDet och UserRole admin på adminusers sidan som du hittar högt upp i headern i menyn när du är inloggad som admin.
Utöver att ändra användarroller så kan man också ta bort användar genom att ange användaridet på den man ska ta bort.
Man kan också ta bort alla användare. Men då måste man köra CreateProducts.js för annars låser man sig själv ute.

Det går också att ändra ta bort och lägga till nya produkter på AdminProductssidan
Man kan också ta bort ordrar, ta bort alla ordraa, hämta alla ordrar och hämta en viss användares ordrar på AdminProducts.

Som en vanlig User kan man bara göra beställningar och ändra sina beställningar. Man kan ändra lite i sina beställningar på Orderhistorik sidan genom att klicka i gränssnittet och ändra kvantiteten på en vara eller välja en annan produkt.

## Om Projektet:

Grunden till det här arbetet gjordes faktiskt i slutskedet på sommarlovet då jag satt och gjorde det här projektet minus admin sidorna och backenden i react. Så när jag började med det här arbetet så har jag i princip bara kopierat in den css som jag skrev för ett år sedan. Därav har jag inte gjort en figma skiss utan bara gått och tagit det som redan fanns. De enda nya vyerna här är Adminsidorna. Designen på det har varit på inspiration snarare än vad som faktiskt behövs. Det ser snyggt ut men UXn hade kunnat varit bättre.
Jag hade egentligen tänkt att använda mig av en projektboard för det här men det blev inte av då jag satt och experimenterade vilt så fort jag hade tid över under julen och under LIA. Jag var inte ens säker på om jag skulle använda mig av den här versionen förens någon vecka innan vi officielt började. Hade detta projekt genomförts i en grupp så hade jag insisterat på en projektboard för att lättare strukturea upp arbetet. Istället har jag använt mig av privata anteckningar och improviserat fram saker t.ex. så har jag haft idéen att lägga alla bilderna i ett api och sedan lagt CRUD på det så man kan uppdatera bilderna i imagecyclern men det gjorde jag inte. Jag hade också liknande idéer på att göra en nyhetssektion där man ska kunna lägga upp nyheter med hjälp av CRUD också men det blev heller inte av. Jag har också tagit en del inspiration från gruppuppgiften i Typescript kursen på funktionalitet som jag ville få med men inte lyckats med på ett bra sätt. Egentligen borde jag kört en projektboard men det blev inte av helt enkelt.

Det har varit ganska svårt emellanåt åt a skriva om det här projektet från React till Svelte men jag är ändå nöjd över att jag har en fungerande produkt.
En hel del av det här arbetet gjordes under jullovet och i januari och har delvis använts som ett privat experiment som t.ex. For Each loopen med komponenter för att deklarera dem. Egentligen har det absolut inte varit nödvändigt att göra sådär och det har kommit tillbaka och förstört för mig ett antal gånger. Ett annat exempel är varukorgen som uppdateras med actions istället för funktioner. Denna föddes ur tanken behöver jag verkligen skriva tre olika funktioner för att lägga till och ta bort saker ur varukorgen.

Många av filerna här är väldigt stora och jag är ganska missnöjd med det. Jag borde brutit ned adminsidorna i komponenter och deklarerat dem i varsin sida men då det inte var mycket tid kvar på projektet beslöt jag mig för i samråd med Jesper att inte göra det då allt funkade och det kunde orsaka problem som jag inte kunde lösa. Det är också en av anledningarna till att jag inte har någon AdminApi.svelte.ts fil med alla anrop som jag gör till servern. När jag flyttade alla tillståndsdeklarationer till den filen så hade jag 48 olika felmeddelanden. Jag hade nog kunnat lösa allting men jag valde att inte försöka då allt funkade och det är mindre än en vecka till inlämning.

## Frontend:

På frontenden används **Svelte**, **Typescript**, **Vite** och **Svelte SPA routern**.

Jag har valt att använda mig av Typescript då det är branschstandarden och jag håller på och skickar väldigt mycket data mellan frontend och backend och jag behöver statiska typer för det och inte bara på backenden.
Vite var jag inte säker på om jag skulle använda Svelte har sin motsvarighet till Next.js: Sveltekit. Min tidiga prototyper för denna applikation gjordes faktiskt i Sveltekit som kommer med sin egen router och väldigt mycket annat. Routing i Sveltekit är filbaserad och efter många jobbiga timmar för att försöka få det att funka så beslöt jag mig att kasta allt arbete och börja om med Vite. Sveltekit är egentligen ett bättre alternativ för den här applikationen och jag borde egentligen använt den men pga av att jag inte fick det att funka med routingen så blev det Vite. Den initiala konfiguartionen man måste göra med CLI var också ganska utmanande.
Efter mycket om och men så hittde jag Svelte SPA router. Det är en hashbaserad router som faktiskt fanns med som alternativa routers i dokumentationen. Strängt taget så är det nog inte den bästa routern för den här applikationen men den var lätt att få igång och därför använde jag den. Den är egentligen bara byggd för att funka i Svelte 3 och 4 men den funkade i 5 också så varför inte.

### Svelte och reaktivitet

Svelte har jag varit väldigt intresserad av att pröva på att använda under en längre tid. Jag har tidigare byggt en enkel todoapp med Svelte och tänkte varför inte testa på det med något svårare. Mellan dessa två perioder har Svelte gått från version fyra till fem med ett helt nytt reaktivitets system som jag inte hade testat på tidigare och har varit osäker på hur det funkar och hur man bäst tillämpar det.
Tidigare har man kunnat deklarera en variabel som reaktiv om man skrivit till exempel let count = 0 och sedan skriva const increment = () => { count += 1; }; och så funkar det bara om man kopplar ett knapp tryck till funktionen.
Problemet med att pyssla med sån här svart magi är att det blir väldigt svårt att dela reaktiv data mellan .svelte filer och vanliga javascript och typescript filer och de som utvecklar Svelte gjorde en helt ny mekanism med så kallade writeable stores som på ytan verkar fungera som Zuzstand.
Detta är nu deperekerat och man får varningar om man använder gamla syntaxen.

Det som den som läser det här behöver veta om reaktivitetssystemet och Svelte är följande:
$state deklarerar reaktiva variabler men det går inte att skriva i dem direkt utanför komponenten det deklareras i. Istället får man mutera värdet. 
$effect kör sidoeffekter när en komponent monteras.
$derived tar ett värde på en variabel och räknar ut ett nytt värde på variabeln utifrån det. Det finns många fler kommandon med $ men det var dem jag använde. Det här körs på signals som
Till sist så används också .svelte.ts och svelte.js filer. De funkar som funkar som vanliga javascript och typescript filer förutom att man kan använda $state $effect $derived b.la där i om man behöver dela återanvändbar reaktiv logik över en applikationen.
Utöver det så finns det också {each}{/each} block som man deklarerar i htmln man skriv och dessa gör for each loopar som namnet antyder. Sen finns det också {#if}{/if} {:else} och {#if else} block som funkar som vanliga if satser i javascript förutom att man deklarerar dem rakt in i htmln. Css skriver man vanligen i style taggar i .svelte filer. Rent teoretiskt skulle man nog kunna köra vanliga css filer i Svelte men det har jag inte testat. Cssn man skriver är alltså inte global längre utan scopad till den komponenten man skrev den i. Sen finns det också script taggar som man kan sätta till typescript om man skriver lang="ts" där i skriver man alla sina funktioner importer variabler osv.

## Backend:

På backenden används **Node**, **Cors**, **Express**, **Joi**, **Json Web Tokens**, **UUID** och **MongoDB**.

**Node** har använts då jag har haft CORS problem med AWS tidigare som inte har gått att lösa. CORS har jag använt då jag självfallet behöver kommunicera mellan backend och frontend.  
**Express** har använts för att jag var relativt bekväm med det och inte vill krångla med andra alternativ som jag var obekant med. En av dessa var Deno, men det alternativet fall bort ganska tidigt i min process då det är väldigt väldigt nytt och knappast branschstandarden.  
**Web Tokens** har använts då jag behöver spåra rättigheter för användaren plus användarnamn och dylikt.  
**MongoDB** har jag använt som databas då jag blev rekommenderad att använda den efter jag lämnat in min första projektplan. Jag var ändå lite bekväm med MongoDB då jag använde det under min praktik hos Visit Värmland tillsammans med Mongoose.

### Problem med MongoDB och Joi

Mongoose har sina egna valideringscheman som jag faktiskt använde väldigt väldigt länge innan jag fick beskedet innan jag fick beskedet att vissa saker måste vara required. Jag var osäker på hur man skulle fixa detta och det är säkert väldigt enkelt. Så jag gjorde ett stort misstag och installerade Joi för att lösa det problemet. Det blev väldigt väldigt rörigt för mig hur jag skulle kommunicera mellan schemat och valideringen så jag tog beslutet att skriva om alla scheman i joi och avinstallera mongoose. Det var väldigt dumt. Mina anrop stämde och jag tänkte inte på att mongodb lägger på sina egna idn så alla mina fina anrop som stämde bara tok dog och jag fick konstiga fel meddelanden.

### UUID och MongoDB

Där och då beslöt jag mig för att lägga UUIDs på allt för att kunna matcha idna. Det var inte heller så smart. Så jag tog det smarta beslötet att skriva över alla idn från mongodb med uuid med hjälp av map funktionen som tar den data man vill och spottar ut den i en ny array och efter det skickade jag tillbaka datan till mongodb. Det finns väldigt väldigt väldigt mycket på backenden som jag borde gjort annorlunda och som jag är rejält missnöjd med. Men jag är nöjd över att ha fått det att funka.

## Slutsats

Överlag känner jag att lärt mig väldigt mycket av det här projektet.

Till sist vill jag nämna att de bildena som finns i assests fick jag av den Malin som jag gör sidan åt för ca ett år sedan.
