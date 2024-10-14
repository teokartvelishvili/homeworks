//1) შექმენით ინფუთი რომლის სერჩის დროს რექუესთს 
//გააგზავნით შემდეგ აიპიაიზე:
// https://api.escuelajs.co/api/v1/products?title=wooden 
//როგორც ხედავთ თაითლი არის ქუერი პარამეტრი, დებაუნს ტექნიკით 
//გააკეთეთ ინფუთი რომლის ჩაწერაზეც, დარექუსთდება სწორედ title 
//პარამეტრით.
function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

const searchInput = document.getElementById('searchInput');
const results = document.getElementById('results');

async function searchProducts(query) {
    const response = await fetch(`https://api.escuelajs.co/api/v1/products?title=${query}`);
    const data = await response.json();
    results.innerHTML = '';
    data.forEach(product => {
        const li = document.createElement('li');
        li.textContent = product.title;
        results.appendChild(li);
    });
}

searchInput.addEventListener('input', debounce((e) => {
    const query = e.target.value;
    if (query) {
        searchProducts(query);
    } else {
        results.innerHTML = '';
    }
}, 500));

// 2) წამოიღეთ ინფორმაცია შემდეგი ეიპიაიდან:
//  https://jsonplaceholder.typicode.com/users , 
//  მოსული დატა გაპარსეთ შემდეგნაირად, თითოეულ ობიექტს
//   უნდა ჰქონდეს მხოლოდ 4 ფროფერთი აიდი, სახელი,
//    იუზერნეიმი და იმეილი
async function fetchAndFilterUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();

    const filteredUsers = users.map(user => {
        return {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email
        };
    });

    const userList = document.getElementById('userList');
    filteredUsers.forEach(user => {
        const li = document.createElement('li');
        li.textContent = `${user.name} (${user.username}) - ${user.email}`;
        userList.appendChild(li);
    });
}

fetchAndFilterUsers();

// 3) გაქვთ ორი აიპიაი https://fakestoreapi.com/users
//   და https://jsonplaceholder.typicode.com/users
//    თქვენი მიზანია ორივე ერთდოულად დაარიზოლვოთ 
//    და ისე გამოიტანოთ დომში შესაბამისი ინფორამცია იუზერებზე,
//     ანუ სანამ ორივე აიპიაი პასუხს არ დააბრუნებს მანამდე არაფერი 
//     გამოაჩინოთ დომში.
async function fetchMultipleAPIs() {
    const [fakeUsersResponse, jsonUsersResponse] = await Promise.all([
        fetch('https://fakestoreapi.com/users'),
        fetch('https://jsonplaceholder.typicode.com/users')
    ]);

    const fakeUsers = await fakeUsersResponse.json();
    const jsonUsers = await jsonUsersResponse.json();

    const combinedUsers = [...fakeUsers, ...jsonUsers];
    const combinedUsersList = document.getElementById('combinedUsers');

    combinedUsers.forEach(user => {
        const li = document.createElement('li');
        li.textContent = `${user.name?.firstname || user.name} (${user.username}) - ${user.email}`;
        combinedUsersList.appendChild(li);
    });
}

fetchMultipleAPIs();

// 4) დაწერეთ ფუნცქია რომელიც დაგვილოგავს 
// მაუსის კორდინატებს მას შემდეგ რაც გავაჩერებთ
//  მაუსს, გამოიყენეთ დიბაუნს ტექნიკა
function logMousePosition(e) {
    console.log(`Mouse position: X=${e.clientX}, Y=${e.clientY}`);
}

const debouncedLogMousePosition = debounce(logMousePosition, 300);

document.addEventListener('mousemove', debouncedLogMousePosition);
