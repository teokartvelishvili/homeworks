//1) Check if a string starts with an uppercase letter.

function startsWithUppercase(str) {
    return /^[A-Z]/.test(str);
}
console.log(startsWithUppercase("Hello")); 
console.log(startsWithUppercase("hello")); 


//2) Test if a string is a valid date in DD/MM/YYYY format
function isValidDate(dateStr) {
    return /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/
    .test(dateStr);
}
console.log(isValidDate("12/10/2024")); 
console.log(isValidDate("31/04/2023")); 



//3) Validate a GE phone number in the format 598-12-34-56
function isValidGEPhoneNumber(phoneStr) {
    return /^598-\d{2}-\d{2}-\d{2}$/.test(phoneStr);
}
console.log(isValidGEPhoneNumber("598-12-34-56")); 
console.log(isValidGEPhoneNumber("599-12-34-56")); 



//4) Validate the emails that ends with @example.com
function isValidExampleEmail(emailStr) {
    return /^[a-zA-Z0-9._%+-]+@example\.com$/.test(emailStr);
}
console.log(isValidExampleEmail("user@example.com")); 
console.log(isValidExampleEmail("user@gmail.com")); 


//5) Save the random horoscop data like 10 into
// localstorage and when user enter the website, 
//display different horoscop to difference day.
// like  first day first horoscop, second day second horoscop and etc.

const horoscopes = [
    "You will have a great day.",
    "Something unexpected will happen.",
    "You will meet someone new.",
    "Today is a perfect day for learning.",
    "Challenges will help you grow.",
    "A big surprise is coming your way.",
    "Trust your instincts.",
    "A new opportunity is on the horizon.",
    "Your hard work will pay off.",
    "Take time to relax."
];

function getHoroscope() {
    const today = new Date().getDate();
    let horoscopeIndex = localStorage.getItem("horoscopeIndex");

    if (!horoscopeIndex || Number(horoscopeIndex) !== today) {
        localStorage.setItem("horoscopeIndex", today);
        localStorage.setItem("horoscopeOfDay", horoscopes[today % horoscopes.length]);
    }
    
    return localStorage.getItem("horoscopeOfDay");
}

console.log(getHoroscope());


//6) Make a form with three inputs name, 
//email and phone number, when user try to enter
// each of this field you should save this info 
//into localstorage. if you typing info and refresh
// the page, the info that you wrote should not be deleted.

const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');


window.onload = () => {
    nameInput.value = localStorage.getItem('name') || '';
    emailInput.value = localStorage.getItem('email') || '';
    phoneInput.value = localStorage.getItem('phone') || '';
    

    const savedLanguage = localStorage.getItem("language") || "en";
    setLanguage(savedLanguage);
};


function saveToLocalStorage() {
    localStorage.setItem('name', nameInput.value);
    localStorage.setItem('email', emailInput.value);
    localStorage.setItem('phone', phoneInput.value);
}

nameInput.addEventListener('input', saveToLocalStorage);
emailInput.addEventListener('input', saveToLocalStorage);
phoneInput.addEventListener('input', saveToLocalStorage);



//7) Create a two button En Ka and the random text below,
// if you choose, en the random text should be translated
// into english, when you click ka it should be translated 
//into georgian language. use localstorage to save this info. 


const randomText = document.getElementById("randomText");
const enBtn = document.getElementById("enBtn");
const kaBtn = document.getElementById("kaBtn");

const texts = {
    en: "text in English.",
    ka: "ტექსტი ქართულად."
};

function setLanguage(lang) {
    localStorage.setItem("language", lang);
    randomText.textContent = texts[lang];
}

enBtn.addEventListener("click", () => setLanguage("en"));
kaBtn.addEventListener("click", () => setLanguage("ka"));