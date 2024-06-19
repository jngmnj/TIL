import { addTodo } from '@/lib/actions'
import React from 'react'

const Form = () => {
  return (
    <form action={addTodo} className="flex items-center gap-2">
      <input
        type="text"
        name="title"
        className="flex-grow w-full p-1 text-xl border border-gray-400 rounded-lg"
        placeholder="새로운 할일을 생성하세요."
        autoFocus
      />
      <button type="submit" className="border border-gray-400 p-2 rounded-lg">
        Submit
      </button>
    </form>
  );
}

export default Form