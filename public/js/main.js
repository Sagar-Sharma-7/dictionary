// defining constant variables
const userWord = document.querySelector("#userWord");
const search = document.querySelector("#search");
const word = document.querySelector("#word");
const speech = document.querySelector("#speech");
const text = document.querySelector("#text");
const def1 = document.querySelector("#def1");
const defination1 = document.querySelector("#defination1");
const eg1 = document.querySelector("#eg1");
const example1 = document.querySelector("#example1");
const offensive = document.querySelector("#offensive");
const errorText = document.querySelectorAll(".errorText");


// text content
def1.innerHTML = "Defination";
eg1.innerHTML = "Example";
word.innerHTML = "dictionary";
speech.innerHTML = "noun";
text.innerHTML = "[ˈdɪkʃəˌneri]";
example1.innerHTML = "an English {it}dictionary{/it}";
defination1.innerHTML = "a reference book that contains words listed in alphabetical order and that gives information about the words' meanings, forms, pronunciations, etc.,a reference book that lists in alphabetical order the words of one language and shows their meanings or translations in a different language,a reference book that lists in alphabetical order words that relate to a particular subject along with their definitions and uses";
offensive.innerHTML = "Offensive: false";



search.addEventListener("click", (e) => {
    e.preventDefault();
    let searchWord = userWord.value;
    if(searchWord == ""){
        alert("First type any word...");
        location.reload();
    }
    let API_URL = `https://www.dictionaryapi.com/api/v3/references/learners/json/${searchWord}?key=9284d4a3-9817-41b9-969e-f83a87fca44a`;
    // use your own api key
// on window load function
(async function(){
    try {
        word.innerHTML = "Loading...";
        speech.innerHTML = "Loading...";
        text.innerHTML = "Loading...";
        example1.innerHTML = "Loading...";
        defination1.innerHTML = "Loading...";
        offensive.innerHTML = "Loading...";


        const fetchData  = await fetch(API_URL);
        const jsonData = await fetchData.json();

        word.innerHTML = jsonData[0].meta.id;
        speech.innerHTML = jsonData[0].fl
        text.innerHTML = `[${jsonData[0].hwi.prs[0].ipa}]`;
        defination1.innerHTML = jsonData[0].shortdef;
        try{
            example1.innerHTML = jsonData[0].def[0].sseq[0][0][1].dt[1][1][0].t;
        }catch(err){
            console.log(err);
            example1.innerHTML = "Not Found"
        }
        offensive.innerHTML = `Offensive: ${jsonData[0].meta.offensive}`;
    } catch (error) {
        console.log(error);
        errorText.forEach((text) => {
            text.innerHTML = "Not Found...";
        });
    } ;
})();
});