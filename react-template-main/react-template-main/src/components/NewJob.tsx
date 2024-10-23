import { JobContext } from './JobContext';
import { useContext } from 'react';


const NewJob = () => {
  const context = useContext(JobContext);

  if (!context) {
    return null;
  }

  const { job, setJob, handleSubmit } = context;
  return (
    <div className="flex items-center m-5">
      <input
        className="border border-gray-400 p-1 mr-2"
        value={job}
        onChange={(e) => setJob(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmit();
          }
        }}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded"
        onClick={handleSubmit}
      >
        Add
      </button>
    </div>
  );
};

export default NewJob;