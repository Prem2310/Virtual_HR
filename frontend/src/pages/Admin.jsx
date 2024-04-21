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

        const filesArray = [];
        for (let i = 0; i < allUsersJson.length; i++) {
          const fileOne = allUsersJson.Information[i];
          const csv = await json2csv(fileOne);
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
    <div>
      {allUsers.length > 0 ? (
        allUsers.map((user, index) => (
          <div key={index}>
            <h1>{user.name}</h1>
            <h2>{user.email}</h2>
            <h3>{user.mobileNumber}</h3>
            <h4>{user.role}</h4>
            <input type="file" onChange={handleFileChange} accept=".csv" />
            {files[index] && (
              <div>
                <button
                  onClick={() =>
                    handleDownloadCsv(
                      files[index],
                      `user_${index}.csv`
                    )
                  }
                >
                  Download CSV
                </button>
                <div>
                  <pre>{files[index]}</pre>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <h1>NO user found</h1>
      )}
    </div>
  );
};

export default Admin;
