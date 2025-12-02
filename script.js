document.addEventListener("DOMContentLoaded",()=>{
  initTheme();
  initCalendar();
});

/* ===========================
   THEME TOGGLE
=========================== */

function initTheme(){

  const toggle=document.getElementById("theme-toggle");
  const body=document.body;

  if(!toggle) return;

  const saved=localStorage.getItem("theme");

  if(saved==="dark"){
    body.classList.add("dark");
    toggle.textContent="☀️";
  } else {
    toggle.textContent="🌙";
  }

  toggle.addEventListener("click",()=>{
    body.classList.toggle("dark");

    const isDark=body.classList.contains("dark");
    toggle.textContent = isDark ? "☀️":"🌙";

    localStorage.setItem("theme",isDark?"dark":"light");
  });
}

/* ===========================
   CALENDAR
=========================== */

function initCalendar(){

  const list=document.getElementById("club-schedule");
  const allBtn=document.getElementById("add-all-calendar");

  if(!list||!allBtn) return;

  const events=getNextDates(12);

  events.slice(0,6).forEach(d=>{

    const li=document.createElement("li");

    li.innerHTML=`
      ${formatDate(d)}
      <a class="add-to-calendar" href="${singleICS(d)}" download>
        <i class="fa-solid fa-calendar-plus"></i> Add
      </a>

      <a class="add-to-calendar"
        href="https://www.google.com/maps/search/?api=1&query=Millennium+Centre+75+George+St+Stranraer"
        target="_blank">

        <i class="fa-solid fa-map-location-dot"></i> Map
      </a>
    `;

    list.appendChild(li);
  });

  allBtn.href=buildICS(events);
}

/* ===========================
   DATES
=========================== */

function getNextDates(count){

  const out=[];
  const d=new Date();
  d.setHours(18,0,0,0);

  while(out.length<count){

    d.setDate(d.getDate()+1);

    if(d.getDay()===0){

      const wk=Math.floor((d.getDate()-1)/7)+1;

      if(wk===2||wk===4){
        out.push(new Date(d));
      }
    }
  }

  return out;
}

function formatDate(d){
  return d.toLocaleDateString("en-GB",{
    weekday:"long",
    day:"numeric",
    month:"long"
  })+" · 6:00pm";
}

/* ===========================
   ICS
=========================== */

function singleICS(date){
  return buildICS([date]);
}

function buildICS(arr){

  const bodies=arr.map(d=>{

    const start=d.toISOString().replace(/[-:]/g,"").split(".")[0];
    const end=new Date(d.getTime()+3*3600000)
              .toISOString().replace(/[-:]/g,"")
              .split(".")[0];

    return `
BEGIN:VEVENT
SUMMARY:Wigtownshire Wargamers Club Night
DTSTART:${start}
DTEND:${end}
DESCRIPTION:Gaming group session
LOCATION:Millennium Centre, 75 George St, Stranraer
END:VEVENT`;
  }).join("");

  return "data:text/calendar;charset=utf8,"+
    encodeURIComponent(`
BEGIN:VCALENDAR
VERSION:2.0
${bodies}
END:VCALENDAR`);
}

/* ===========================
   HERO PARALLAX SYSTEM
=========================== */

window.addEventListener("scroll",()=>{

  const hero=document.querySelector(".hero");
  if(!hero) return;

  const max=hero.offsetHeight;
  const prog=Math.min(window.scrollY/max,1);

  document.querySelectorAll(".hero-dice").forEach((dice,i)=>{

    const dir=i===0?-1:1;

    const x=dir*(90*(1-prog));      // slight inward drift
    const y=prog*360;              // falling motion
    const rot=(1-prog)*900*dir;    // spinning
    const scale=1 - prog*0.35;
    const alpha=Math.max(0,1 - prog*1.3);

    dice.style.opacity=alpha;
    dice.style.transform=`
      translate(${x}px, ${y}px)
      rotate(${rot}deg)
      scale(${scale})
    `;
  });
});
