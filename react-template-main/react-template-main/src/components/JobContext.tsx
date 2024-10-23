// src/JobContext.tsx
import { createContext, useState, ReactNode } from 'react';
import { Job } from '../types';


interface JobContextProps {
  jobs: Job[];
  job: string;
  jobIndex: number | undefined;
  jobName: string;
  setJobs: (jobs: Job[]) => void;
  setJob: (job: string) => void;
  setJobIndex: (jobIndex: number | undefined) => void;
  setJobName: (jobName: string) => void;
  handleSubmit: () => void;
  toggleCompleted: (index: number) => void;
  handleEdit: (index: number) => void;
  handleDelete: (index: number) => void;
  handleSave: () => void;
}

export const JobContext = createContext<JobContextProps | undefined>(undefined);

interface JobProviderProps {
  children: ReactNode;
}

export const JobProvider = ({ children }: JobProviderProps) => {
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
    <JobContext.Provider value={{
      jobs, setJobs, job, setJob, jobIndex, setJobIndex, jobName, setJobName,
      handleSubmit, toggleCompleted, handleEdit, handleDelete, handleSave
    }}>
      {children}
    </JobContext.Provider>
  );
};