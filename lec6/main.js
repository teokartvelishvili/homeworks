
// 1) make a promise that rejects or resolves 50/50
function fiftyFiftyPromise() {
    return new Promise((resolve, reject) => {
      const random = Math.random(); 
      if (random < 0.5) {
        resolve("Promise resolved!"); 
      } else {
        reject("Promise rejected!"); 
      }
    });
  }
  

  fiftyFiftyPromise()
    .then(result => console.log("50/50 Promise result:", result))
    .catch(error => console.log("50/50 Promise error:", error));
  

  // 2) write a function that get data from: 
  // https://jsonplaceholder.typicode.com/users and return result
  async function getUsersFromJsonPlaceholder() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data from jsonplaceholder:", error);
    }
  }

  getUsersFromJsonPlaceholder()
    .then(data => console.log("Data from jsonplaceholder:", data));
  
  

  // 3) write a function that try to get data from: https://jsonplaceholde.typicode.com 
  // (link is invalid for this task) if request will failed try to retrieve it 5 times 
  async function retryFetchWithLimit(url, retries = 5) {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Fetch failed');
        const data = await response.json();
        return data;
      } catch (error) {
        console.log(`Retrying... (${i + 1}/${retries})`); 
      }
    }
    throw new Error('All retries failed'); 
  }
  

  retryFetchWithLimit('https://jsonplaceholde.typicode.com')
    .then(data => console.log("Retry success:", data))
    .catch(error => console.log("Retry failed after 5 attempts:", error));
  
  

  // 4) write a function that try to get data from this two sources:
  //  https://dummyjson.com/users and https://jsonplaceholder.typicode.com/users
  // and return the only response which has faster response, use fetch or axios method.
  async function fetchFastestData() {
    const urls = [
      'https://dummyjson.com/users',
      'https://jsonplaceholder.typicode.com/users'
    ];
  
    const promises = urls.map(url => fetch(url).then(response => response.json()));
    
    try {
      const fastestResponse = await Promise.race(promises);
      return fastestResponse;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  

  fetchFastestData()
    .then(data => console.log("Fastest response data:", data))
    .catch(error => console.log("Error in fetchFastestData:", error));
  
  
 
  // 5) create a three promise that returns any kind of arrays with difference time.
  // one of one of them should be reject other two should be fulfilled.
  //  v   merged the only fulfilled arrays
  function createArrayPromises() {
    const promise1 = new Promise((resolve) => setTimeout(() => resolve([1, 2, 3]), 1000));
    const promise2 = new Promise((resolve) => setTimeout(() => resolve([4, 5, 6]), 2000));
    const promise3 = new Promise((_, reject) => setTimeout(() => reject('Promise rejected'), 1500));
  

    return Promise.allSettled([promise1, promise2, promise3])
      .then(results => {
      
        const fulfilledPromises = results.filter(result => result.status === 'fulfilled');
        const mergedArrays = fulfilledPromises.flatMap(result => result.value);
        return mergedArrays; 
      });
  }
  

  createArrayPromises()
    .then(result => console.log("Merged arrays from fulfilled promises:", result))
    .catch(error => console.log("Error in createArrayPromises:", error));
  