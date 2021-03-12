import React, { useContext, useEffect } from 'react';
import { myContext } from '../../../../context/Context';

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
        {startTime} - {endTime} ({days})
      </td>
      <td>{location}</td>
    </tr>
  );
};

export default CurrentCourse;
