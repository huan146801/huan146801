import { Job, JobProps } from "../types";
import JobItem from "./JobItem";

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
  return (
    <ul className="m-5">
      {jobs.map((job, index) => (
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
  );
};

export default JobList;
