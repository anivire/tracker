// import Task from '@/utils/models/Task';

// export const taskSelection = (
//   tasks: Task[],
//   selectedTask: Task | null,
//   direction: 'up' | 'down'
// ): Task | null => {
//   if (!selectedTask || tasks.length === 1) {
//     return tasks[0] || null;
//   }

//   const currentIndex = tasks.findIndex(task => task.id === selectedTask.id);
//   let newIndex = currentIndex;

//   if (direction === 'up' && currentIndex > 0) {
//     newIndex = currentIndex - 1;
//   } else if (direction === 'down' && currentIndex < tasks.length - 1) {
//     newIndex = currentIndex + 1;
//   }

//   return tasks[newIndex] || null;
// };
