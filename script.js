document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initCalendar();
});

/* ===========================
   THEME
=========================== */

function initTheme() {

  const body = document.body;
  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;

  const saved = localStorage.getItem("theme");

  if (saved === "dark") {
    body.classList.add("dark");
    toggle.textContent = "☀️";
  } else {
    toggle.textContent = "🌙";
  }

  toggle.addEventListener("click", () => {

    body.classList.toggle("dark");

    const isDark = body.classList.contains("dark");

    toggle.textContent = isDark ? "☀️" : "🌙";

    localStorage.setItem("theme", isDark ? "dark" : "light");

  });

}


/* ===========================
   CALENDAR
=========================== */

function initCalendar() {

  const list = document.getElementById("club-schedule");
  const addAllBtn = document.getElementById("add-all-calendar");

  if (!list || !addAllBtn) return;

  const events = getNextDates(12);

  events.slice(0, 6).forEach(date => {

    const li = document.createElement("li");

    li.innerHTML = `
      ${formatDate(date)}

      <a class="add-to-calendar"
         href="${singleICS(date)}"
         download>
         <i class="fa-solid fa-calendar-plus"></i> Add
      </a>

      <a class="add-to-calendar"
         target="_blank"
         href="https://www.google.com/maps/search/?api=1&query=Millennium+Centre+75+George+St+Stranraer">
         <i class="fa-solid fa-map-location-dot"></i> Map
      </a>
    `;

    list.appendChild(li);
  });

  addAllBtn.href = buildICS(events);
}


/* ===========================
   DATE RULE
=========================== */

function getNextDates(count) {

  const dates = [];
  const d = new Date();

  d.setHours(18, 0, 0, 0);

  while (dates.length < count) {

    d.setDate(d.getDate() + 1);

    if (d.getDay() === 0) {

      const week = Math.floor((d.getDate() - 1) / 7) + 1;

      if (week === 1 || week === 3) {
        dates.push(new Date(d));
      }

    }
  }

  return dates;

}

function formatDate(d) {

  return d.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long"
  }) + " · 6:00pm";

}


/* ===========================
   ICS BUILDER
=========================== */

function singleICS(date) {
  return buildICS([date]);
}

function buildICS(arr) {

  const events = arr.map(d => {

    const start = d.toISOString()
      .replace(/[-:]/g,"")
      .split(".")[0];

    const end = new Date(d.getTime() + 3 * 3600000)
      .toISOString()
      .replace(/[-:]/g,"")
      .split(".")[0];

    return `
BEGIN:VEVENT
SUMMARY:Wigtownshire Wargamers Club Night
DTSTART:${start}
DTEND:${end}
LOCATION:Millennium Centre, 75 George St, Stranraer
DESCRIPTION:Every first and third Sunday at 6pm
END:VEVENT`;

  }).join("");

  return "data:text/calendar;charset=utf8," +
    encodeURIComponent(`
BEGIN:VCALENDAR
VERSION:2.0
${events}
END:VCALENDAR`);

}
/* ===========================
   MOBILE NAV TOGGLE
=========================== */

document.addEventListener("DOMContentLoaded", () => {

  const burger = document.querySelector(".hamburger");
  const links = document.querySelector(".nav-links");

  if(!burger || !links) return;

  burger.addEventListener("click", () => {
    links.classList.toggle("active");
  });

});
