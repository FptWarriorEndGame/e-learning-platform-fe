// import { format } from 'date-fns';

// function formatDate(dateString: string) {
//   const date = new Date(dateString) ;
//   return `(${format(date, 'dd MMM yyyy')})`;
// }

// const inputDateString = '2023-05-20T09:24:22.806Z';
// const formattedDate = formatDate(inputDateString);
// console.log(formattedDate); // Output: (20 May 2023)

import dayjs from 'dayjs';
import 'dayjs/locale/en'; // Import the English locale (you can replace 'en' with your desired locale)

export const transformDate = (apiDate: string) => {
  const parsedDate = dayjs(apiDate);
  const formattedDate = parsedDate.format('DD/MM/YYYY HH:mm:ss');
  return formattedDate;
};

export function formatTimeRounded(seconds: number): string {
  // Làm tròn số giây trước khi chia để đảm bảo phút và giây được tính toán chính xác
  const roundedSeconds = Math.round(seconds);
  const minutes = Math.floor(roundedSeconds / 60);
  const remainingSeconds = roundedSeconds % 60;
  // Sử dụng padStart để đảm bảo cả phút và giây đều có ít nhất 2 chữ số
  const paddedMinutes = minutes.toString().padStart(2, '0');
  const paddedSeconds = remainingSeconds.toString().padStart(2, '0');
  return `${paddedMinutes}:${paddedSeconds}`;
}

export const formatTimeAndMinutes = (seconds: number) => {
  const pad = (num: number) => num.toString().padStart(2, '0');
  const minutes = pad(Math.floor(seconds / 60));
  const secondsLeft = pad(Math.floor(seconds % 60));
  return `${minutes}:${secondsLeft}`;
};

export function formatTime(seconds: number) {
  const date = new Date(0);
  date.setSeconds(seconds);
  return date.toISOString().substr(14, 5);
}

export const formatVideoLengthToHours = (seconds: number): string => {
  const hours = seconds / 3600;
  return `${hours.toFixed(1)} hours`;
};

export const  isNotValidEmail = (email: string) => {
  // Regular expression for a simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Test the provided email against the regex
  return !emailRegex.test(email);
}

export function getHeaders() {
  const token = localStorage.getItem('token');
  if (token) {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    };
  } else {
    return {
      'Content-Type': 'application/json'
    };
  }
}

export function getHeadersAdmin() {
  const adminToken = localStorage.getItem('adminToken');
  if (adminToken) {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${adminToken}`
    };
  } else {
    return {
      'Content-Type': 'application/json'
    };
  }
}
