const headerDay = document.getElementById('header-day');
const headerDate = document.getElementById('header-date');

var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']


const dt = new Date();
let dayName = days[dt.getDay()];
let date = dt.toLocaleDateString()


headerDay.innerText = dayName;
headerDate.innerText = date;
