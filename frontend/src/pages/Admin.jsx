import { useState, useEffect } from "react";
import { CSVLink } from 'react-csv';

const Admin = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [filesArray, setFilesArray] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/v1/getemployees");
        const allUsersJson = await res.json();
        console.log(allUsersJson);
        setAllUsers(allUsersJson);

        const csvFiles = allUsersJson.map(user => {
          const header = [
            { label: "question", key: "questions" },
            { label: "inputText", key: "inputText" },
          ];

          // Assuming user.Information is an array of objects with question and inputText properties
          const data = user.Information.map(info => ({
            questions: info.question,
            inputText: info.inputText
          }));
          console.log(data);

          return {
            filename: 'file.csv',
            data: data,
            headers: header
          };
        });

        setFilesArray(csvFiles);
      } catch (error) {
        console.log(error);
      }
    };

    getAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
    <div className=" bg-slate-950">


  <button
    className=" hover:bg-blue-00 !important bg-slate-950 text-white font-bold  px-4 py-2 rounded"
    onClick={() => {
      window.location.href = "/";
    }
    }

    >
    Home
  </button>

    <div className="flex flex-wrap gap-4 justify-center bg-slate-900 h-screen">
      {allUsers.length > 0 ? (
        allUsers.map((user, index) => (
          <div key={index} className="w-1/3 h-1/3 bg-white p-4 rounded-md shadow-md">
            <div className="mb-4">
              <h1 className="text-lg font-semibold">Name: {user.name}</h1>
              <h2 className="text-sm text-gray-600">Email: {user.email}</h2>
            </div>
            <div className="mb-4">
              <h3 className="text-sm">Mobile Number: {user.mobileNumber}</h3>
              <h4 className="text-sm">Role: {user.role}</h4>
            </div>
            <div>
              {filesArray.map((file, idx) => (
                <div key={idx}>
                  <CSVLink {...file}>Download me</CSVLink>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <h1 className="text-lg font-semibold text-center w-full">NO user found</h1>
      )}
      
    </div>
      
      </div>
</>
  );
};

export default Admin;
