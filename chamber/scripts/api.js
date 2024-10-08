const lon = -90.513;
const lat = 14.641;
const key = '963b595e8ad81f8cba2752f7ab0bd36d';
const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}`;


// get data from api
async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
        const data = await response.json();
        return data;
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

export default apiFetch;