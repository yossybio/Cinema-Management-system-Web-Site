const axios = require("axios");
const membersServices = require("./BLL/services/membersServices");
const moviesServices = require("./BLL/services/moviesServices");

const getAllMembersFromWS = async () => {
  try {
    const membersURL = "https://jsonplaceholder.typicode.com/users";
    const memberResp = await axios.get(membersURL);
    const membersData = memberResp.data;
    const usersObj = membersData.map((member) => {
      return (userObj = {
        Name: member.name,
        Email: member.email,
        City: member.address.city,
      });
    });

    for (let index = 0; index < usersObj.length; index++) {
      await membersServices.addMember(usersObj[index]);
    }
  } catch (error) {
    console.log(error);
  }
};

const getAllMoviesFromWS = async () => {
  try {
    const moviesURL = "https://api.tvmaze.com/shows";
    const moviesResp = await axios.get(moviesURL);
    const moviesData = moviesResp.data;
    const moviesObj = moviesData.map((movie) => {
      return (movieObj = {
        Name: movie.name,
        Genres: movie.genres,
        Image: movie.url,
        Premiered: movie.premiered,
      });
    });

    for (let index = 0; index < moviesObj.length; index++) {
      await moviesServices.addMovie(moviesObj[index]);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAllMembersFromWS, getAllMoviesFromWS };
