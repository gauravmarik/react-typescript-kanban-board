import React, { useState } from 'react'
import './App.css'
import InputTask from './components/InputTask'
import TaskList from './components/TaskList'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { Task } from './model/model'

const App: React.FC = () => {
	// state hooks
	const [task, setTask] = useState<string>('')
	const [tasks, setTasks] = useState<Task[]>([])
	const [CompletedTasks, setCompletedTasks] = useState<Task[]>([])

	console.log(task)

	// handle Submit
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		if (task) {
			setTasks([...tasks, { id: Date.now(), task, isDone: false }])
			setTask('')
		}
	}

	console.log(tasks)

	const onDragEnd = (result: DropResult) => {
		const { source, destination } = result

		console.log(result)

		if (!destination) {
			return
		}

		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return
		}

		let add
		let active = tasks
		let complete = CompletedTasks

		// Source Logic
		if (source.droppableId === 'TasksList') {
			add = active[source.index]
			active.splice(source.index, 1)
		} else {
			add = complete[source.index]
			complete.splice(source.index, 1)
		}

		// Destination Logic
		if (destination.droppableId === 'TasksList') {
			active.splice(destination.index, 0, add)
		} else {
			complete.splice(destination.index, 0, add)
		}

		setCompletedTasks(complete)
		setTasks(active)
	}

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className="App">
				<span className="heading">React/Typescript Kanban Board</span>
				<InputTask task={task} setTask={setTask} handleSubmit={handleSubmit} />
				<TaskList
					tasks={tasks}
					setTasks={setTasks}
					CompletedTasks={CompletedTasks}
					setCompletedTasks={setCompletedTasks}
				/>
			</div>
		</DragDropContext>
	)
}

export default App
