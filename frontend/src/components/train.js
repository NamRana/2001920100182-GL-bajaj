import React from 'react';

const TrainTable = ({ trainsData }) => {
  return (
    <div>
      <h2>Train Schedule</h2>
      <table>
        <thead>
          <tr>
            <th>Train Name</th>
            <th>Train Number</th>
            <th>Departure Time</th>
            <th>Seats Available (Sleeper)</th>
            <th>Price (Sleeper)</th>
            <th>Seats Available (AC)</th>
            <th>Price (AC)</th>
          </tr>
        </thead>
        <tbody>
          {trainsData.map((train, index) => (
            <tr key={index}>
              <td>{train.trainName}</td>
              <td>{train.trainNumber}</td>
              <td>{new Date(train.departureTime).toLocaleString()}</td>
              <td>{train.seatsAvailable.sleeper}</td>
              <td>{train.price.sleeper}</td>
              <td>{train.seatsAvailable.AC}</td>
              <td>{train.price.AC}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrainTable;
