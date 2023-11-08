import Task from "@/components/task";
import CreateTask from "@/components/create-task";
import { getTask } from "@/actions/tasks.action";

export default async function Home() {
  const tasks = await getTask();

  return (
    <div>
      <div>
        <CreateTask />
      </div>
      <div className="mt-10 flex flex-col gap-5">
        {tasks?.tasks?.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
