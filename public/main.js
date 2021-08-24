import { getStandings, getGames } from "./fetch.js";

(async () => {
  //fetch data
  const games = await getGames();
  const standings = await getStandings();

  //display data
  displayStandings(standings);
  displayUpcoming(games);
})();

const displayStandings = (standings) => {
  for (const team of standings) {
    var divTeam = document.createElement("div");
    var divRank = document.createElement("div");
    var divName = document.createElement("div");
    divTeam.className = "standings-team";
    divRank.className = "standings-rank";
    divName.className = "standings-teamname";
    divRank.textContent = `${team.rank}`;
    divName.textContent = `${team.name}`;
    divTeam.append(divRank, divName);
    document.querySelector("#ladder").appendChild(divTeam);
  }
};

const sortGamesAscending = (games) => {
  return games.sort((a, b) => {
    return Date.parse(a.localtime) - Date.parse(b.localtime);
  });
};

const convertDate = (date) => {
  const tempDate = new Date(date).toString().split(" ");
  const newDate = tempDate.splice(0, 3).join(" ");
  const newTime = convertTime(tempDate[1]);
  return newDate + " " + newTime;
};

const convertTime = (time) => {
  time = time.split(":"); // convert to array

  // fetch
  var hours = Number(time[0]);
  var minutes = Number(time[1]);
  var seconds = Number(time[2]);

  // calculate
  var timeValue;

  if (hours > 0 && hours <= 12) {
    timeValue = "" + hours;
  } else if (hours > 12) {
    timeValue = "" + (hours - 12);
  } else if (hours == 0) {
    timeValue = "12";
  }

  timeValue += minutes < 10 ? ":0" + minutes : ":" + minutes; // get minutes
  timeValue += hours >= 12 ? "pm" : "am"; // get AM/PM

  return timeValue;
};

const displayUpcoming = (games) => {
  const sorted = sortGamesAscending(games);
  for (const game of sorted) {
    const divContainer = document.createElement("div");

    divContainer.innerHTML = `
    <div class="upcoming-container">
        <div class="upcoming-roundname">${game.roundname}</div>
        <div class="upcoming-match">
            <div class="upcoming-teams">
            ${game.hteam || "TBD"} VS ${game.ateam || "TBD"}
            </div>
            <div class="upcoming-location">
            ${game.venue}
            </div>
        </div>
        <div class="upcoming-date">${convertDate(game.localtime)}</div>
    </div>
    `;

    document.querySelector("#upcoming").appendChild(divContainer);
  }
};
