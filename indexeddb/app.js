import Dexie from 'https://cdn.jsdelivr.net/npm/dexie@3.2.3/+esm'

let db = new Dexie('todoDB')

db.version(1).stores({
  tasks: '++id,userId,title,completed',
})

db.on('populate', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos')
  const todoList = await response.json()
  await db.tasks.bulkPut(todoList)
})

db.open()

const filteredTasks = await db.tasks
  .where('userId')
  .equals(10)
  .filter((item) => !item.completed)
  .toArray()

console.table(filteredTasks)
