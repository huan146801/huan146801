import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

function ToDoList() {
  // const [job, setJob] = useState("");
  // const [jobs, setJobs] = useState(() => {
  //   const storageJobs = JSON.parse(localStorage.getItem("jobs"));
  //   return storageJobs ?? [];
  // });
  // const [jobIndex, setJobIndex] = useState(undefined);
  // const [jobName, setJobName] = useState("");
  // //Add job
  // //tao 1 input va 1 button de them job
  // //dung useState tao 1 mang de luu cac job va render ra giao dien
  // //dung localStorage de luu job khi refresh trang

  // const handleSubmit = () => {
  //   const jobInput = job.trim();
  //   if (jobInput === "") {
  //     alert("Job can't be empty!");
  //     return;
  //   }
  //   const createdAt = new Date().toString();
  //   setJobs((prev) => {
  //     const newJob = { name: job, completed: false, createdAt }; // cập nhật newjob dưới dạng obj
  //     const newJobs = [...prev, newJob];

  //     //Save to local storage
  //     const jsonJobs = JSON.stringify(newJobs);
  //     localStorage.setItem("jobs", jsonJobs);
  //     return newJobs;
  //   });
  //   setJob("");
  // };

  // //Delete job
  // //tao 1 icon de khi click thi se xoa job
  // // sử dụng splice để xóa job thông qua index
  // // lưu lại vào local storage
  // const handleDelete = (index) => {
  //   setJobs((prev) => {
  //     const newJobs = [...prev];
  //     newJobs.splice(index, 1);
  //     // Save to local storage
  //     const jsonJobs = JSON.stringify(newJobs);
  //     localStorage.setItem("jobs", jsonJobs);
  //     return newJobs;
  //   });
  // };

  // //Edit job
  // //tạo 1 icon để khi click sẽ hiện ra prompt để sửa job
  // //tạo một biến để lưu giá trị của job mới và lưu lại vào local storage

  // const handleEdit = (index) => {
  //   setJobIndex(index);
  //   setJobName(jobs[index].name);
  //   // setJobs((prev) => {
  //   //   const newJobs = [...prev];
  //   //   newJobs[index].name = prompt("Edit job", jobs[index].name);
  //   //   // Save to local storage
  //   //   const jsonJobs = JSON.stringify(newJobs);
  //   //   localStorage.setItem("jobs", jsonJobs);
  //   //   return newJobs;
  //   // });
  // };

  // const handleSave = () => {
  //   setJobs((prev) => {
  //     const newJobs = [...prev];
  //     newJobs[jobIndex].name = jobName;
  //     // Save to local storage
  //     const jsonJobs = JSON.stringify(newJobs);
  //     localStorage.setItem("jobs", jsonJobs);
  //     return newJobs;
  //   });
  //   setJobIndex("");
  // };

  // const toggleCompleted = (index) => {
  //   setJobs((prev) => {
  //     const newJobs = [...prev];
  //     newJobs[index].completed = !newJobs[index].completed; // Toggle trạng thái completed

  //     // Save to local storage
  //     const jsonJobs = JSON.stringify(newJobs);
  //     localStorage.setItem("jobs", jsonJobs);
  //     return newJobs;
  //   });
  // };

  // return (
  //   <div style={{ padding: "32px" }}>
  //     <h1>To Do List</h1>
  //     <span> To do </span>
  //     <input
  //       value={job}
  //       onChange={(e) => setJob(e.target.value)}
  //       onKeyDown={(e) => {
  //         if (e.key === "Enter") {
  //           handleSubmit();
  //         }
  //       }}
  //     />
  //     <button onClick={handleSubmit}>Add</button>
  //     <ul>
  //       {jobs.map((job, index) => (
  //         <li
  //           key={index}
  //           style={{ textDecoration: job.completed ? "line-through" : "none" }}
  //         >
  //           <input
  //             type="checkbox"
  //             checked={job.completed}
  //             onChange={() => toggleCompleted(index)}
  //           />
  //           {index === jobIndex ? (
  //             <input
  //               value={jobName}
  //               onChange={(e) => setJobName(e.target.value)}
  //               onKeyDown={(e) => {
  //                 if (e.key === "Enter") {
  //                   handleSave();
  //                 }
  //               }}
  //             />
  //           ) : (
  //             job.name
  //           )}
  //           {new Date(job.createdAt).toLocaleString()}{" "}
  //           <FontAwesomeIcon
  //             icon={faPenToSquare}
  //             onClick={() => handleEdit(index)}
  //           />{" "}
  //           <FontAwesomeIcon
  //             icon={faDeleteLeft}
  //             onClick={() => {
  //               handleDelete(index);
  //             }}
  //           />
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );

  const [title, setTitle] = useState('')  
  const [posts, setPosts] = useState([])
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(posts => {
          console.log(posts);
      })
  }, [])
  
  return (
    <div>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <ul>
          {posts.map(post => (
              <li key={post.id}>{post.title}</li>
          ))}
      </ul>
    </div>
  )
  
}

export default ToDoList;
