import React, { useRef } from 'react'
import './styles.css'

// Types
interface Props {
	task: string
	setTask: React.Dispatch<React.SetStateAction<string>>
	handleSubmit: (e: React.FormEvent) => void
}

const InputTask = ({ task, setTask, handleSubmit }: Props) => {
	const inputRef = useRef<HTMLInputElement>(null)

	return (
		<form
			className="input"
			onSubmit={(e) => {
				handleSubmit(e)
				inputRef.current?.blur()
			}}
		>
			<input
				type="text"
				placeholder="Enter a Task"
				value={task}
				ref={inputRef}
				onChange={(e) => setTask(e.target.value)}
				className="input__box"
			/>
			<button type="submit" className="input_submit">
				Submit
			</button>
		</form>
	)
}

export default InputTask
