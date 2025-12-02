document.addEventListener("DOMContentLoaded",()=>{
  initTheme();
  initCalendar();
});

/* THEME */

function initTheme(){
  const toggle=document.getElementById("theme-toggle");
  const saved=localStorage.getItem("theme");

  if(saved==="dark"){
    document.body.classList.add("dark");
    toggle.textContent="🌙";
  }

  toggle.addEventListener("click",()=>{
    document.body.classList.toggle("dark");
    const state=document.body.classList.contains("dark");

    toggle.textContent=state?"🌙":"☀️";
    localStorage.setItem("theme",state?"dark":"light");
  });
}

/* CALENDAR */

function initCalendar(){

  const list=document.getElementById("club-schedule");
  const addAllBtn=document.getElementById("add-all-calendar");

  const events=getNextDates(12);

  events.slice(0,6).forEach(date=>{
    const li=document.createElement("li");

    li.innerHTML=
    `${formatDate(date)}
     <a class="add-to-calendar" href="${singleICS(date)}" download>
       <i class="fa-solid fa-calendar-plus"></i> Add
     </a>
     <a class="add-to-calendar" href="https://www.google.com/maps/search/?api=1&query=Millennium+Centre+75+George+St+Stranraer"
     target="_blank">
       <i class="fa-solid fa-map-location-dot"></i> Map
     </a>`;

    list.appendChild(li);
  });

  addAllBtn.href=buildICS(events);
}

/* DATE RULE */

function getNextDates(count){
  const arr=[];
  const d=new Date();
  d.setHours(18,0,0,0);

  while(arr.length<count){
    d.setDate(d.getDate()+1);

    if(d.getDay()===0){

      const week=Math.floor((d.getDate()-1)/7)+1;

      if(week===2||week===4){
        arr.push(new Date(d));
      }
    }
  }

  return arr;
}

function formatDate(d){
  return d.toLocaleDateString("en-GB",
  {weekday:"long",day:"numeric",month:"long"})+" · 6:00pm";
}

/* ICS */

function singleICS(date){
  return buildICS([date]);
}

function buildICS(arr){

  const items=arr.map(d=>{
    const start=d.toISOString().replace(/[-:]/g,"").split(".")[0];
    const end=new Date(d.getTime()+3*3600000)
                  .toISOString().replace(/[-:]/g,"")
                  .split(".")[0];

    return `
BEGIN:VEVENT
SUMMARY:Wigtownshire Wargamers Club Night
DTSTART:${start}
DTEND:${end}
LOCATION:Millennium Centre, 75 George St, Stranraer
DESCRIPTION:Every second and fourth Sunday at 6pm
END:VEVENT`;
  }).join("");

  return "data:text/calendar,"+encodeURIComponent(
`BEGIN:VCALENDAR
VERSION:2.0
${items}
END:VCALENDAR`);
}
