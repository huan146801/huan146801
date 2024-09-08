export interface JobProps {
  jobIndex: number | undefined;
  jobName: string;
  toggleCompleted: (index: number) => void;
  handleEdit: (index: number) => void;
  handleDelete: (index: number) => void;
  handleSave: () => void;
  setJobName: (jobName: string) => void;
}

export interface Job {
  name: string;
  completed: boolean;
  createdAt: string;
}
