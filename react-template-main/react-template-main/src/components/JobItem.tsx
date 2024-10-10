import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { Job, JobProps } from "../types";
import { useRef, useEffect } from "react";

interface JobItemProps extends JobProps {
  job: Job;
  index: number;
}

const JobItem = ({
  job,
  index,
  jobIndex,
  jobName,
  toggleCompleted,
  handleEdit,
  handleDelete,
  handleSave,
  setJobName,
}: JobItemProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  // const handleEditJob = () => {
  //   console.log(inputRef.current);
  //   if (inputRef.current === null) {
  //     return;
  //   } else {
  //     inputRef.current.focus();
  //   }
  // };
  useEffect(() => {
    if (index === jobIndex && inputRef.current) {
      inputRef.current.focus();
    }
  }, [index, jobIndex]);

  const handleEditJob = () => {
    handleEdit(index);
  };

  return (
    <li
      className={`flex items-center ${
        job.completed
          ? "bg-gray-200 line-through decoration-orange-500"
          : "bg-white"
      }`}
    >
      <div className="flex items-center w-full">
        <input
          type="checkbox"
          checked={job.completed}
          onChange={() => toggleCompleted(index)}
          className="w-4 h-4 text-orange-500 border-2 border-orange-500 rounded mr-2"
        />
        {index === jobIndex ? (
          <input
            ref={inputRef}
            value={jobName}
            onChange={(e) => setJobName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSave();
              }
            }}
            className="border p-2 rounded w-[200px]"
          />
        ) : (
          <span className="text-lg mr-2 w-48">{job.name}</span>
        )}
        <span className="mr-2">{new Date(job.createdAt).toLocaleString()}</span>
      </div>
      <div className="flex items-center ml-auto">
        <FontAwesomeIcon
          icon={faPenToSquare}
          onClick={handleEditJob}
          className="text-blue-500 hover:text-blue-700 cursor-pointer mr-2"
        />
        <FontAwesomeIcon
          icon={faDeleteLeft}
          onClick={() => handleDelete(index)}
          className="text-red-500 hover:text-red-700 cursor-pointer"
        />
      </div>
    </li>
  );
};

export default JobItem;
