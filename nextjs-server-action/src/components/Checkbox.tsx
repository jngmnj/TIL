'use client';
import React, { useTransition, useOptimistic } from 'react'
import { Todo } from './TodoList';
import { updateTodo } from '@/lib/actions';

const Checkbox = ({todo}: {todo: Todo}) => {
    const [optimisticTodo, addOptimisticTodo] = useOptimistic(todo, 
        (state: Todo, completed: boolean) => ({ ...state, completed})
    )

    // const [isPending, startTransition] = useTransition();
    // isPending은 데이터를 수정중에 true가 됨
    
  return (
    <input 
        type='checkbox'
        checked={optimisticTodo.completed}
        id="completed"
        name="completed"
        // disabled={isPending}
        onChange={async () => {
            addOptimisticTodo(!todo.completed)
            await updateTodo(todo)
            // startTransition(() => updateTodo(todo));
        }}
        className='min-w-[2rem] min-h-[2rem]'
    />
  )
}

export default Checkbox