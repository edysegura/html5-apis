import Dexie from 'https://cdn.jsdelivr.net/npm/dexie@3.0.3/dist/dexie.mjs'

let db = new Dexie('todoDB')

db.version(1).stores({
  tasks: '++id,userId,title,completed',
})

db.on('populate', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos')
  const jsonData = await response.json()
  await db.tasks.bulkPut(jsonData)
})

db.open()

const filteredTasks = await db.tasks
  .where('userId')
  .equals(10)
  .filter((item) => !item.completed)
  .toArray()

console.table(filteredTasks)
