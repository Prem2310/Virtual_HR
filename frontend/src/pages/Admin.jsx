import { useState, useEffect } from "react";
import { json2csv } from "json-2-csv";

const Admin = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [files, setFiles] = useState([]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const text = event.target.result;
      console.log(text);
      // Process the text if needed
    };
    reader.readAsText(file);
  };

  const handleDownloadCsv = async (csvData, fileName) => {
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
  };

  useEffect(() => {
   const getAllUsers = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/v1/getemployees");
    const allUsersJson = await res.json();
    console.log(allUsersJson);
    setAllUsers(allUsersJson);

    const options = {
      fields: ['question', 'inputText'], // Define the fields you want to include in the CSV
      delimiter: {
        wrap: '"', // Wrap fields with double quotes
        field: ',', // Use comma as the field delimiter
        eol: '\n', // Use newline character as the end-of-line delimiter
      },
    };
    
    const filesArray = [];
    for (let i = 0; i < allUsersJson.length; i++) {
      const fileOne = allUsersJson[i].Information;
      console.log(fileOne);
      const csvData = fileOne.map(entry => ({ question: entry.ques, inputText: entry.answer })); // Adjust field names here
      const csv = await json2csv({ obj: csvData }, options);
      filesArray.push(csv);
    }
    setFiles(filesArray);
  } catch (error) {
    console.log(error);
  }
};


    getAllUsers();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {allUsers.length > 0 ? (
        allUsers.map((user, index) => (
          <div key={index} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 bg-white p-4 rounded-md shadow-md">
            <div className="mb-4">
              <h1 className="text-lg font-semibold">Name: {user.name}</h1>
              <h2 className="text-sm text-gray-600">Email: {user.email}</h2>
            </div>
            <div className="mb-4">
              <h3 className="text-sm">Mobile Number: {user.mobileNumber}</h3>
              <h4 className="text-sm">Role: {user.role}</h4>
            </div>
            <div>
              {/* <input
                type="file"
                onChange={handleFileChange}
                accept=".csv"
                className="mb-2"
              /> */}
              {files[index] && (
                <div>
                  <button
                    onClick={() =>
                      handleDownloadCsv(files[index], `user_${index}.csv`)
                    }
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Download CSV
                  </button>
                  {/* <div className="mt-2">
                    <pre>{files[index]}</pre>
                  </div> */}
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <h1 className="text-lg font-semibold text-center w-full">NO user found</h1>
      )}
    </div>
  );
};

export default Admin;
