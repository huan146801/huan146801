import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Job, JobProps } from "../types";
import JobItem from "./JobItem";
import { useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface JobListProps extends JobProps {
  jobs: Job[];
}

const JobList = ({
  jobs,
  jobIndex,
  jobName,
  toggleCompleted,
  handleEdit,
  handleDelete,
  handleSave,
  setJobName,
}: JobListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState<"all" | "completed" | "incomplete">(
    "all"
  );
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const jobsPerPage = 15;
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(jobs.length / jobsPerPage); i++) {
    pageNumbers.push(i);
  }
  const filteredJobs = currentJobs.filter((job) => {
    if (filter === "completed") return job.completed;
    if (filter === "incomplete") return !job.completed;
    return job;
  });

  const searchedJobs = jobs.filter((job) =>
    job.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleSearch = () => {
    setIsSearchClicked(true);
  };

  const renderPageNumbers = () => {
    const pageElements = [];
    const totalPages = pageNumbers.length;

    // Hiển thị tất cả các trang nếu tổng số trang <= 5
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageElements.push(
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`mx-1 px-3 py-1 border rounded ${
              currentPage === i
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-500"
            }`}
          >
            {i}
          </button>
        );
      }
    } else {
      // Hiển thị trang đầu, trang cuối và trang hiện tại với dấu ...
      if (currentPage === 1) {
        //TH currentPage la trang dau tien
        pageElements.push(
          <button
            key={1}
            onClick={() => setCurrentPage(1)}
            className="mx-1 px-3 py-1 border rounded bg-blue-500 text-white"
          >
            1
          </button>
        );
        pageElements.push(
          <button
            key={2}
            onClick={() => setCurrentPage(2)}
            className="mx-1 px-3 py-1 border rounded bg-white text-blue-500"
          >
            2
          </button>
        );
        if (totalPages > 2) {
          pageElements.push(
            <span className="mx-1">
              ...
            </span>
          );
          pageElements.push(
            <button
              key={totalPages}
              onClick={() => setCurrentPage(totalPages)}
              className="mx-1 px-3 py-1 border rounded bg-white text-blue-500"
            >
              {totalPages}
            </button>
          );
        }
      } else if (currentPage === totalPages) {
        //TH currentPage la trang cuoi cung
        if (totalPages > 2) {
          pageElements.push(
            <button
              key={1}
              onClick={() => setCurrentPage(1)}
              className="mx-1 px-3 py-1 border rounded bg-white text-blue-500"
            >
              1
            </button>
          );
          pageElements.push(
            <span className="mx-1">
              ...
            </span>
          );
        }
        pageElements.push(
          <button
            key={totalPages - 1}
            onClick={() => setCurrentPage(totalPages - 1)}
            className="mx-1 px-3 py-1 border rounded bg-white text-blue-500"
          >
            {totalPages - 1}
          </button>
        );
        pageElements.push(
          <button
            key={totalPages}
            onClick={() => setCurrentPage(totalPages)}
            className="mx-1 px-3 py-1 border rounded bg-blue-500 text-white"
          >
            {totalPages}
          </button>
        );
      } else {
        //Cac TH con lai
        pageElements.push(
          <button
            key={1}
            onClick={() => setCurrentPage(1)}
            className="mx-1 px-3 py-1 border rounded bg-white text-blue-500"
          >
            1
          </button>
        );
        if (currentPage > 3) {
          pageElements.push(
            <span className="mx-1">
              ...
            </span>
          );
        }
        if (currentPage > 2) {
          pageElements.push(
            <button
              key={currentPage - 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="mx-1 px-3 py-1 border rounded bg-white text-blue-500"
            >
              {currentPage - 1}
            </button>
          );
        }
        pageElements.push(
          <button
            key={currentPage}
            onClick={() => setCurrentPage(currentPage)}
            className="mx-1 px-3 py-1 border rounded bg-blue-500 text-white"
          >
            {currentPage}
          </button>
        );
        if (currentPage < totalPages - 1) {
          pageElements.push(
            <button
              key={currentPage + 1}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="mx-1 px-3 py-1 border rounded bg-white text-blue-500"
            >
              {currentPage + 1}
            </button>
          );
        }
        if (currentPage < totalPages - 2) {
          pageElements.push(
            <span className="mx-1">
              ...
            </span>
          );
        }
        pageElements.push(
          <button
            key={totalPages}
            onClick={() => setCurrentPage(totalPages)}
            className="mx-1 px-3 py-1 border rounded bg-white text-blue-500"
          >
            {totalPages}
          </button>
        );
      }
    }

    return pageElements;
  };

  return (
    <div>
      <div className="flex justify-center mb-4">
        <label className="mx-2">
          <input
            type="checkbox"
            value="all"
            checked={filter === "all"}
            onChange={() => setFilter("all")}
            className="mr-1"
          />
          All
        </label>
        <label className="mx-2">
          <input
            type="checkbox"
            value="completed"
            checked={filter === "completed"}
            onChange={() => setFilter("completed")}
            className="mr-1"
          />
          Completed
        </label>
        <label className="mx-2">
          <input
            type="checkbox"
            value="incomplete"
            checked={filter === "incomplete"}
            onChange={() => setFilter("incomplete")}
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
          {(isSearchClicked ? searchedJobs : filteredJobs).length > 0 ? (
            (isSearchClicked ? searchedJobs : filteredJobs).map(
              (job, index) => (
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
              )
            )
          ) : (
            <li className="text-center text-gray-500">No job found</li>
          )}
        </ul>
        {pageNumbers.length > 1 && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="mx-1 px-3 py-1 border rounded bg-white text-blue-500 disabled:opacity-50"
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {renderPageNumbers()}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, pageNumbers.length))
              }
              className="mx-1 px-3 py-1 border rounded bg-white text-blue-500 disabled:opacity-50"
              disabled={currentPage === pageNumbers.length}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobList;
