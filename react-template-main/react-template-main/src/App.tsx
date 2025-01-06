import JobList from "./components/JobList";
import NewJob from "./components/NewJob";
import { JobProvider } from "./components/JobContext";

function App() {
  return (
    <JobProvider>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="flex w-full h-full gap-4 p-4 bg-white rounded-2xl shadow-lg">
          <div className="flex-1 bg-black rounded-lg"></div>{" "}
          {/* Cột bên trái */}
          <div className="flex-1 border rounded-2xl bg-white w-[700px] ">
            <h1 className="text-black text-5xl font-bold m-5">To Do List</h1>
            <NewJob />
            <JobList key ={Math.random()} />
          </div>
          <div className="flex-1 rounded-lg bg-[url('https://media.istockphoto.com/id/517188688/vi/anh/phong-c%E1%BA%A3nh-n%C3%BAi-non.jpg?s=612x612&w=0&k=20&c=WWWaejSo6EWGZMZSK7QK6LCfwd0rL2KB3ImCX2VkW4A=')] object-fill ">
            <img className="object-fill" />
          </div>{" "}
          {/* Cột bên phải */}
        </div>
      </div>
    </JobProvider>
  );
}

export default App;
