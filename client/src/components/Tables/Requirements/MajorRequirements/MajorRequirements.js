// import React from 'react';
// import Card from 'react-bootstrap/Card';
// import Table from 'react-bootstrap/Table';

// import { cecsCatalog } from './cecsCatalog/cecsCatalog';

// import '../../../../utility/css/table-fixed-height.css';

// const MajorRequirements = () => {
//   return (
//     <>
//       <div className="shadow-sm">
//         <Card>
//           <Card.Body>
//             <Card.Title>CECS Requirements (2020-2021)</Card.Title>
//           </Card.Body>
//         </Card>
//         <div className="table-wrapper">
//           <Table maxHeight="100px" striped hover bordered responsive="sm">
//             <thead>
//               <tr>
//                 <th>Lower Division (Take all of the following)</th>
//                 <th>Units</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cecsCatalog.map((course, idx) => {
//                 if (course.designation === 'Lower Div') {
//                   return (
//                     <tr key={idx}>
//                       <td>
//                         {course.course} - {course.title}
//                       </td>
//                       <td>{course.units}</td>
//                     </tr>
//                   );
//                 } else {
//                   return null;
//                 }
//               })}
//             </tbody>
//             <thead>
//               <tr>
//                 <th>Approved Science (1 Physical, 1 Life; 8 Units Req.)</th>
//                 <th>Units</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <th colSpan="2">
//                   <em>PHYSICAL SCIENCE</em>
//                 </th>
//               </tr>
//               {cecsCatalog.map((course, idx) => {
//                 if (course.designation === 'Physical Science') {
//                   return (
//                     <tr key={idx}>
//                       <td>
//                         {course.course} - {course.title}
//                       </td>
//                       <td>{course.units}</td>
//                     </tr>
//                   );
//                 } else {
//                   return null;
//                 }
//               })}
//               <tr>
//                 <th colSpan="2">
//                   <em>LIFE SCIENCE</em>
//                 </th>
//               </tr>
//               {cecsCatalog.map((course, idx) => {
//                 if (course.designation === 'Life Science') {
//                   return (
//                     <tr key={idx}>
//                       <td>
//                         {course.course} - {course.title}
//                       </td>
//                       <td>{course.units}</td>
//                     </tr>
//                   );
//                 } else {
//                   return null;
//                 }
//               })}
//             </tbody>
//             <thead>
//               <tr>
//                 <th>Upper Division (Take all of the following)</th>
//                 <th>Units</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cecsCatalog.map((course, idx) => {
//                 if (course.designation === 'Upper Div') {
//                   return (
//                     <tr key={idx}>
//                       <td>
//                         {course.course} - {course.title}
//                       </td>
//                       <td>{course.units}</td>
//                     </tr>
//                   );
//                 } else {
//                   return null;
//                 }
//               })}
//             </tbody>
//             <thead>
//               <tr>
//                 <th>Writing Intensive (3 Units Req.)</th>
//                 <th>Units</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cecsCatalog.map((course, idx) => {
//                 if (course.designation === 'Writing Intensive') {
//                   return (
//                     <tr key={idx}>
//                       <td>
//                         {course.course} - {course.title}
//                       </td>
//                       <td>{course.units}</td>
//                     </tr>
//                   );
//                 } else {
//                   return null;
//                 }
//               })}
//             </tbody>
//             <thead>
//               <tr>
//                 <th>Core Elective (6 Units Req.)</th>
//                 <th>Units</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cecsCatalog.map((course, idx) => {
//                 if (course.designation === 'Core Elective') {
//                   return (
//                     <tr key={idx}>
//                       <td>
//                         {course.course} - {course.title}
//                       </td>
//                       <td>{course.units}</td>
//                     </tr>
//                   );
//                 } else {
//                   return null;
//                 }
//               })}
//             </tbody>
//             <thead>
//               <tr>
//                 <th>Applied Elective (3 Units Req.)</th>
//                 <th>Units</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cecsCatalog.map((course, idx) => {
//                 if (course.designation === 'Applied Elective') {
//                   return (
//                     <tr key={idx}>
//                       <td>
//                         {course.course} - {course.title}
//                       </td>
//                       <td>{course.units}</td>
//                     </tr>
//                   );
//                 } else {
//                   return null;
//                 }
//               })}
//             </tbody>
//           </Table>
//         </div>
//       </div>
//     </>
//   );
// };

// export default MajorRequirements;
