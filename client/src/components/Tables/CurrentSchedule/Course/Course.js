import React from 'react';
import formatTime from '../../../../utility/formatTime/formatTime';

const CurrentCourse = ({
  number,
  dept,
  title,
  section,
  units,
  startTime,
  endTime,
  days,
  location,
}) => {
  return (
    <tr>
      <td>
        {dept} {number} - {title}
      </td>
      <td>{section}</td>
      <td>{units}</td>
      <td>
        {formatTime(startTime)} - {formatTime(endTime)} ({days.join('/')})
      </td>
      <td>{location}</td>
    </tr>
  );
};

export default CurrentCourse;
