import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

function ToDoList() {
  const [job, setJob] = useState("");
  const [jobs, setJobs] = useState(() => {
    const storageJobs = JSON.parse(localStorage.getItem("jobs"));
    return storageJobs ?? [];
  });

  //Add job
  //tao 1 input va 1 button de them job
  //dung useState tao 1 mang de luu cac job va render ra giao dien
  //dung localStorage de luu job khi refresh trang

  const handleSubmit = () => {
    setJobs((prev) => {
      const newJobs = [...prev, job];

      //Save to local storage
      const jsonJobs = JSON.stringify(newJobs);
      localStorage.setItem("jobs", jsonJobs);
      return newJobs;
    });
    setJob("");
  };

  //Delete job
  //tao 1 icon de khi click thi se xoa job
  // sử dụng splice để xóa job thông qua index
  // lưu lại vào local storage
  const handleDelete = () => {
    setJobs((prev) => {
      const newJobs = [...prev];
      newJobs.splice(prev.index, 1);
      // Save to local storage
      const jsonJobs = JSON.stringify(newJobs);
      localStorage.setItem("jobs", jsonJobs);
      return newJobs;
    });
  };

  //Edit job
  //tạo 1 icon để khi click sẽ hiện ra prompt để sửa job
  //tạo một biến để lưu giá trị của job mới và lưu lại vào local storage

  const handleEdit = (index) => {
    setJobs((prev) => {
      const newJobs = [...prev];
      newJobs[index] = prompt("Edit job", jobs[index]);
      // Save to local storage
      const jsonJobs = JSON.stringify(newJobs);
      localStorage.setItem("jobs", jsonJobs);
      return newJobs;
    });
  };

  return (
    <div style={{ padding: 32 }}>
      <h1>To Do List</h1>
      <span> To do </span>
      <input value={job} onChange={(e) => setJob(e.target.value)} />
      <button onClick={handleSubmit}>Add</button>
      <ul>
        {jobs.map((job, index) => (
          <li key={index}>
            {job}{" "}
            <FontAwesomeIcon
              icon={faPenToSquare}
              onClick={() => handleEdit(index)}
            />{" "}
            <FontAwesomeIcon icon={faDeleteLeft} onClick={handleDelete} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
