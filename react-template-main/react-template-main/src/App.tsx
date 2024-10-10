import { useState } from "react";
import JobList from "./components/JobList";
import NewJob from "./components/NewJob";
import { Job } from "./types";

function App() {
  const [job, setJob] = useState("");
  const [jobs, setJobs] = useState<Job[]>(() => {
    const storageJobs = localStorage.getItem("jobs");
    return storageJobs ? JSON.parse(storageJobs) : [];
  });
  const [jobIndex, setJobIndex] = useState<number | undefined>(undefined);
  const [jobName, setJobName] = useState("");
  //Add job
  //tao 1 input va 1 button de them job
  //dung useState tao 1 mang de luu cac job va render ra giao dien
  //dung localStorage de luu job khi refresh trang

  const handleSubmit = () => {
    const jobInput = job.trim();
    if (jobInput === "") {
      alert("Job can't be empty!");
      return;
    }
    const createdAt = new Date().toString();
    setJobs((prev) => {
      const newJob = { name: jobInput, completed: false, createdAt }; // cập nhật newjob dưới dạng obj
      console.log(newJob.name);
      const newJobs = [...prev, newJob];

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
  const handleDelete = (index: number) => {
    setJobs((prev: Job[]) => {
      const newJobs = [...prev];
      newJobs.splice(index, 1);
      // Save to local storage
      const jsonJobs = JSON.stringify(newJobs);
      localStorage.setItem("jobs", jsonJobs);
      return newJobs;
    });
  };

  //Edit job
  //tạo 1 icon để khi click sẽ hiện ra prompt để sửa job
  //tạo một biến để lưu giá trị của job mới và lưu lại vào local storage

  const handleEdit = (index: number) => {
    setJobIndex(index);
    setJobName(jobs[index].name);
    
  };

  const handleSave = () => {
    if (jobIndex === undefined) return;

    setJobs((prev: Job[]) => {
      const newJobs = [...prev];
      newJobs[jobIndex].name = jobName;
      // Save to local storage
      const jsonJobs = JSON.stringify(newJobs);
      localStorage.setItem("jobs", jsonJobs);
      return newJobs;
    });
    setJobIndex(undefined);
  };

  const toggleCompleted = (index: number) => {
    setJobs((prev) => {
      const newJobs = [...prev];
      newJobs[index].completed = !newJobs[index].completed; // Toggle trạng thái completed
      // Save to local storage
      const jsonJobs = JSON.stringify(newJobs);
      localStorage.setItem("jobs", jsonJobs);
      return newJobs;
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex w-full h-full gap-4 p-4 bg-white rounded-2xl shadow-lg">
        <div className="flex-1 bg-black rounded-lg"></div> {/* Cột bên trái */}
        <div className="flex-1 border rounded-2xl bg-white w-[700px] ">
          <h1 className="text-black text-5xl font-bold m-5">To Do List</h1>
          <NewJob job={job} setJob={setJob} handleSubmit={handleSubmit} />
          <JobList
            jobs={jobs}
            jobIndex={jobIndex}
            jobName={jobName}
            toggleCompleted={toggleCompleted}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleSave={handleSave}
            setJobName={setJobName}
          />
        </div>
        <div className="flex-1 rounded-lg bg-[url('https://media.istockphoto.com/id/517188688/vi/anh/phong-c%E1%BA%A3nh-n%C3%BAi-non.jpg?s=612x612&w=0&k=20&c=WWWaejSo6EWGZMZSK7QK6LCfwd0rL2KB3ImCX2VkW4A=')] object-fill ">
          <img className="object-fill" />
        </div>{" "}
        {/* Cột bên phải */}
      </div>
    </div>
  );
}




export default App;