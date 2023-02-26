import React from 'react'
import { Task } from '../model/model'
import OneTask from './OneTask'
import { Droppable } from 'react-beautiful-dnd'

interface props {
	tasks: Task[]
	setTasks: React.Dispatch<React.SetStateAction<Array<Task>>>
	CompletedTasks: Task[]
	setCompletedTasks: React.Dispatch<React.SetStateAction<Array<Task>>>
}

const TaskList = ({
	tasks,
	setTasks,
	CompletedTasks,
	setCompletedTasks,
}: props) => {
	return (
		<div className="container">
			<Droppable droppableId="TasksList">
				{(provided, snapshot) => (
					<div
						className={`tasks ${
							snapshot.isDraggingOver ? 'activeDrag' : 'open'
						}`}
						ref={provided.innerRef}
						{...provided.droppableProps}
					>
						<span className="tasks__heading">Open / In Progress</span>
						{tasks?.map((task, index) => (
							<OneTask
								index={index}
								tasks={tasks}
								task={task}
								key={task.id}
								setTasks={setTasks}
							/>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
			<Droppable droppableId="TasksDone">
				{(provided, snapshot) => (
					<div
						ref={provided.innerRef}
						{...provided.droppableProps}
						className={`tasks  ${
							snapshot.isDraggingOver ? 'completeDrag' : 'done'
						}`}
					>
						<span className="tasks__heading">Done</span>
						{CompletedTasks?.map((task, index) => (
							<OneTask
								index={index}
								tasks={CompletedTasks}
								task={task}
								key={task.id}
								setTasks={setCompletedTasks}
							/>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</div>
	)
}

export default TaskList
