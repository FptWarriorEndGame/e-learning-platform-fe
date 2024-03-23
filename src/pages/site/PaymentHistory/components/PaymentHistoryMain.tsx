import React from 'react';

function Table() {
  function getStatusColor(status: string) {
    switch (status) {
      case 'SUCCESS':
        return 'bg-green-100';
      case 'UNSUCCESS':
        return 'bg-red-200';
      case 'PENDING':
        return 'bg-gray-200';
      default:
        return '';
    }
  }
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      course: 'HTML AND CSS',
      status: 'SUCCESS',
      date: '20-10-2022'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      course: 'HTML AND CSS',
      status: 'UNSUCCESS',
      date: '20-10-2022'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      course: 'HTML AND CSS',
      status: 'PENDING',
      date: '20-10-2022'
    }
  ];

  return (
    <div className='w-full overflow-auto ml-6'>
      <table className='divide-y divide-gray-200 w-full '>
        <thead className='bg-gray-50'>
          <tr>
            <th className='px-6 py-3 text-left font-medium text-gray-500  tracking-wider text-2xl'>Name</th>
            <th className='px-6 py-3 text-left font-medium text-gray-500  tracking-wider text-2xl'>Course</th>
            <th className='px-6 py-3 text-left font-medium text-gray-500  tracking-wider text-2xl'>Age</th>
            <th className='px-6 py-3 text-left font-medium text-gray-500  tracking-wider text-2xl'>Address</th>
            <th className='px-6 py-3 text-left font-medium text-gray-500  tracking-wider text-2xl'>Status</th>
            <th className='px-6 py-3 text-left font-medium text-gray-500  tracking-wider text-2xl'>Date</th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {data.map((row) => (
            <tr key={row.key}>
              <td className='px-6 py-4 whitespace-nowrap'>{row.name}</td>
              <td className='px-6 py-4 whitespace-nowrap'>{row.course}</td>
              <td className='px-6 py-4 whitespace-nowrap'>{row.age}</td>
              <td className={`px-6 py-4 whitespace-normal ${getStatusColor(row.status)}`}>{row.status}</td>
              <td className='px-6 py-4 whitespace-nowrap'>{row.address}</td>
              <td className='px-6 py-4 whitespace-nowrap'>{row.date}</td>
            </tr>
          ))}
        </tbody>
      </table>{' '}
    </div>
  );
}

export default Table;
