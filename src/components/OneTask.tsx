import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { MdOutlineFileDownloadDone } from 'react-icons/md'
import { Task } from '../model/model'
import { Draggable } from 'react-beautiful-dnd'

type props = {
	index: number
	task: Task
	tasks: Task[]
	setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

const OneTask = ({ index, task, tasks, setTasks }: props) => {
	const [edit, setEdit] = useState<boolean>(false)
	const [editTask, setEditTask] = useState<string>(task.task)

	const inputRef = useRef<HTMLInputElement>(null)
	useEffect(() => {
		inputRef.current?.focus()
	}, [edit])

	const handleEdit = (e: React.FormEvent, id: number) => {
		e.preventDefault()
		setTasks(
			tasks.map((task) => (task.id === id ? { ...task, task: editTask } : task))
		)
		setEdit(false)
	}

	const handleDelete = (id: number) => {
		setTasks(tasks.filter((task) => task.id !== id))
	}

	const handleDone = (id: number) => {
		setTasks(
			tasks.map((task) =>
				task.id === id ? { ...task, isDone: !task.isDone } : task
			)
		)
	}

	return (
		<Draggable draggableId={task.id.toString()} index={index}>
			{(provided, snapshot) => (
				<form
					onSubmit={(e) => handleEdit(e, task.id)}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
					className={`one__task ${snapshot.isDragging ? 'drag' : ''}`}
				>
					{edit ? (
						<input
							value={editTask}
							onChange={(e) => setEditTask(e.target.value)}
							className="one__task--text"
							ref={inputRef}
						/>
					) : task.isDone ? (
						<s className="one__task--text">{task.task}</s>
					) : (
						<span className="one__task--text">{task.task}</span>
					)}
					<div>
						<span
							className="icon"
							onClick={() => {
								if (!edit && !task.isDone) {
									setEdit(!edit)
								}
							}}
						>
							<AiFillEdit />
						</span>
						<span className="icon" onClick={() => handleDelete(task.id)}>
							<AiFillDelete />
						</span>
						<span className="icon" onClick={() => handleDone(task.id)}>
							<MdOutlineFileDownloadDone />
						</span>
					</div>
				</form>
			)}
		</Draggable>
	)
}

export default OneTask
