import React, { useState } from "react";
import Pagination from "./Pagination";

export default function Employees() {
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(employees.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const startIdx = (page - 1) * itemsPerPage;
  const currentEmployees = employees.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div>
      <h1>Employees</h1>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.firstName}</td>
              <td>{emp.lastName}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalItems={totalPages}
        currentPage={page}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

const employees = [
    { id: 1, firstName: 'Isabella', lastName: 'Rodriguez' },
    { id: 2, firstName: 'James', lastName: 'Smith' },
    { id: 3, firstName: 'Sofía', lastName: 'García' },
    { id: 4, firstName: 'Michael', lastName: 'Williams' },
    { id: 5, firstName: 'Valentina', lastName: 'Martinez' },
    { id: 6, firstName: 'David', lastName: 'Brown' },
    { id: 7, firstName: 'Camila', lastName: 'Lopez' },
    { id: 8, firstName: 'John', lastName: 'Jones' },
    { id: 9, firstName: 'Mateo', lastName: 'Hernandez' },
    { id: 10, firstName: 'Jennifer', lastName: 'Davis' },
    { id: 11, firstName: 'Daniel', lastName: 'Gonzalez' },
    { id: 12, firstName: 'Mary', lastName: 'Miller' },
    { id: 13, firstName: 'Santiago', lastName: 'Perez' },
    { id: 14, firstName: 'Patricia', lastName: 'Wilson' },
    { id: 15, firstName: 'Alejandro', lastName: 'Sanchez' },
    { id: 16, firstName: 'Linda', lastName: 'Moore' },
    { id: 17, firstName: 'Diego', lastName: 'Ramirez' },
    { id: 18, firstName: 'Susan', lastName: 'Taylor' },
    { id: 19, firstName: 'Javier', lastName: 'Torres' },
    { id: 20, firstName: 'Jessica', lastName: 'Anderson' },
    { id: 21, firstName: 'Carlos', lastName: 'Flores' },
    { id: 22, firstName: 'Sarah', lastName: 'Thomas' },
    { id: 23, firstName: 'Ricardo', lastName: 'Rivera' },
    { id: 24, firstName: 'Karen', lastName: 'Jackson' },
    { id: 25, firstName: 'Lucía', lastName: 'Gomez' },
    { id: 26, firstName: 'Robert', lastName: 'White' },
    { id: 27, firstName: 'Ana', lastName: 'Diaz' },
    { id: 28, firstName: 'William', lastName: 'Harris' },
    { id: 29, firstName: 'Elena', lastName: 'Cruz' },
    { id: 30, firstName: 'Joseph', lastName: 'Martin' }
];