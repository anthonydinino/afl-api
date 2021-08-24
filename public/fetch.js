const getStandings = async () => {
  try {
    const res = await fetch("https://api.squiggle.com.au/?q=standings");
    const body = await res.json();
    return body.standings;
  } catch (error) {
    console.error(error);
  }
};

const getGames = async () => {
  try {
    const res = await fetch(
      "https://api.squiggle.com.au/?q=games;year=2021;complete=!100"
    );
    const body = await res.json();
    return body.games;
  } catch (error) {
    console.error(error);
  }
};

export { getStandings, getGames };
