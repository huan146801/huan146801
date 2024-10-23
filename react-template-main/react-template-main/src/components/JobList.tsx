import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import JobItem from "./JobItem";
import { useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useContext } from 'react';
import { JobContext } from './JobContext';


const JobList = () => {
  const context = useContext(JobContext);

  if (!context) {
    return null;
  }

  const { jobs, toggleCompleted, handleEdit, handleDelete, handleSave, jobIndex, jobName, setJobName } = context;
  
  const [filter, setFilter] = useState<"all" | "completed" | "incomplete">(
    "all"
  );
  const [showSearchInput, setShowSearchInput] = useState(false);
  // const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const [finalJobs, setFinalJobs] = useState(jobs);

  const handleFilter = (filter: "all" | "completed" | "incomplete") => {
    setFilter(filter);
    const searchJobs = jobs.filter((job) =>
      job.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    const filteredJobs = searchJobs.filter((job) => {
      if (filter === "completed") return job.completed;
      if (filter === "incomplete") return !job.completed;
      return job;
    });
    setFinalJobs(filteredJobs);
  };

  const handleSearch = () => {
    const searchedJobs = finalJobs.filter((job) =>
      job.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFinalJobs(searchedJobs);
  };

  return (
    <div>
      <div className="flex justify-center mb-4">
        <label className="mx-2">
          <input
            type="checkbox"
            value="all"
            checked={filter === "all"}
            onChange={() => handleFilter("all")}
            className="mr-1"
          />
          All
        </label>
        <label className="mx-2">
          <input
            type="checkbox"
            value="completed"
            checked={filter === "completed"}
            onChange={() => handleFilter("completed")}
            className="mr-1"
          />
          Completed
        </label>
        <label className="mx-2">
          <input
            type="checkbox"
            value="incomplete"
            checked={filter === "incomplete"}
            onChange={() => handleFilter("incomplete")}
            className="mr-1"
          />
          Incomplete
        </label>
      </div>
      <div>
        <FontAwesomeIcon
          icon={faSearch}
          className="ml-5 mb-2 cursor-pointer"
          onClick={() => setShowSearchInput(!showSearchInput)}
        />
        {showSearchInput && (
          <div className="ml-5">
            <input
              type="text"
              className="mx-2 px-3 py-1 border rounded"
              placeholder="Search jobs..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <button
              className="mx-2 px-3 py-1 border rounded bg-blue-500 text-white"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        )}
      </div>
      <div>
        <ul className="m-5 max-h-96 overflow-y-auto">
          {finalJobs.map((job, index) => (
            <JobItem
              key={index}
              job={job}
              index={index}
              jobIndex={jobIndex}
              jobName={jobName}
              toggleCompleted={toggleCompleted}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              handleSave={handleSave}
              setJobName={setJobName}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default JobList;
