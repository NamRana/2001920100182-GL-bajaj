const express = require("express");
const axios = require("axios");
const router = new express.Router();

// Registering our company with the John Doe Railway Server
// const registerCompany = async () => {
//   try {
//     const response = await axios.post("http://20.244.56.144/train/register", {
//       companyName: "Train UP",
//       ownerName: "NamRana",
//       rollNo: "182",
//       ownerEmail: "namanrana@abc.edu",
//       accessCode: "JnNPGs",
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error registering company:", error.message);
//     throw error;
//   }
// };

// Obtain the authorization token for your company
const getAuthToken = async () => {
  try {
    // const credentials = await registerCompany();
    // console.log(credentials);
    const response = await axios.post("http://20.244.56.144/train/auth", {
        companyName: 'Train UP',
        clientID: 'ba0207e9-2bd9-4892-aee2-49cd3ed295bb',
        clientSecret: 'gVXQtZptcLZIVmyp',
        ownerName: 'NamRana',
        ownerEmail: 'namanrana@abc.edu',
        rollNo: '182'
    });
    return response.data.access_token;
  } catch (error) {
    console.error("Error obtaining authorization token:", error.message);
    throw error;
  }
};

// Fetch train data from the John Doe Railway Server
const fetchTrainData = async () => {
  try {
    const authToken = await getAuthToken();
    const response = await axios.get("http://20.244.56.144/train/trains", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching train data:", error.message);
    throw error;
  }
};

// Process train data and return the response
const processTrainData = async () => {
  try {
    const trainData = await fetchTrainData();
    const currentTime = new Date();
    const next12Hours = new Date(currentTime.getTime() + 12 * 60 * 60 * 1000);

    const filteredTrains = trainData.filter((train) => {
      const departureTime = new Date();
      departureTime.setHours(train.departureTime.Hours);
      departureTime.setMinutes(train.departureTime.Minutes);
      departureTime.setSeconds(train.departureTime.Seconds);
      return departureTime > currentTime && departureTime <= next12Hours;
    });

    const processedTrains = filteredTrains.map((train) => {
      const departureTime = new Date();
      departureTime.setHours(train.departureTime.Hours);
      departureTime.setMinutes(train.departureTime.Minutes);
      departureTime.setSeconds(train.departureTime.Seconds);
      const delayInMinutes = train.delayedBy || 0;
      departureTime.setMinutes(departureTime.getMinutes() + delayInMinutes);

      return {
        trainName: train.trainName,
        trainNumber: train.trainNumber,
        departureTime: departureTime,
        seatsAvailable: train.seatsAvailable,
        price: train.price,
      };
    });

    const sortedTrains = processedTrains.sort((a, b) => {
      if (a.price.sleeper !== b.price.sleeper) {
        return a.price.sleeper - b.price.sleeper;
      } else if (a.seatsAvailable.sleeper !== b.seatsAvailable.sleeper) {
        return b.seatsAvailable.sleeper - a.seatsAvailable.sleeper;
      } else {
        // Sort by departure time in descending order
        const departureTimeA = a.departureTime.getTime();
        const departureTimeB = b.departureTime.getTime();
        return departureTimeB - departureTimeA;
      }
    });

    return sortedTrains;
  } catch (error) {
    console.error("Error processing train data:", error.message);
    throw error;
  }
};

// Define the GET /trains API endpoint
router.get("/trains", async (req, res) => {
  try {
    const trains = await processTrainData();
    res.json(trains);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
