import DeleteTaskButton from "./delete-task-button";
import EditTaskButton from "./edit-task-button";

type TaskProps = {
  task: {
    id: number;
    task: string;
    userId: number;
  };
};

export default function Task({ task }: TaskProps) {
  return (
    <div className="flex justify-between items-center border">
      <h1 className="text-xl">{task?.task}</h1>
      <div className="flex gap-2">
        <EditTaskButton id={task.id} />
        <DeleteTaskButton id={task.id} />
      </div>
    </div>
  );
}

Task.defaultProps = {
  task: "Lorem ipsum dolor sit amet.",
};
