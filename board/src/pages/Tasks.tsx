import React, { useEffect, useState } from 'react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  type DropResult,
} from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import toast from 'react-hot-toast';
import type {
  Task as Itask,
  Column as Icolumn,
  Board as Iboard,
} from './Tasks/Model';
import { getTasks, updateTasks } from './Tasks/crudApi';
import { changeTaskStatus } from './Tasks/changeStatusByDrag';

const defaultBoard = {
  [uuid()]: {
    name: 'To do',
    items: [] as Itask[],
  },
  [uuid()]: {
    name: 'In Progress',
    items: [] as Itask[],
  },
  [uuid()]: {
    name: 'Done',
    items: [] as Itask[],
  },
} as unknown as Iboard;

function renderDraggableTasks(items: Itask[]) {
  return items.map((item, index) => {
    return (
      <Draggable key={item.id} draggableId={item.id} index={index}>
        {(provided, snapshot) => {
          return (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={{
                ...provided.draggableProps.style,
              }}
              onClick={() =>
                // handleTaskDetails(item.id)
                console.log(item.id)
              }
              className={`select-none px-3.5 pt-3.5 pb-2.5 mb-2 border border-gray-200 rounded-lg shadow-sm bg-white relative ${
                snapshot.isDragging && 'shadow-md'
              }`}>
              <div className="pb-2">
                <div className="flex item-center justify-between">
                  <h3 className="text-slate-800 font-medium text-sm capitalize">
                    {item.title.slice(0, 22)}
                    {item.title.length > 22 && '...'}
                  </h3>
                  {/* <DropdownMenu
                        taskId={item._id}
                        handleDelete={handleDelete}
                        setRenderChange={setRenderChange}
                      /> */}
                </div>
                <p className="text-xs text-slate-500 leading-4 -tracking-tight">
                  {item?.description.slice(0, 60)}
                  {item?.description.length > 60 && '...'}
                </p>
                <span className="py-1 px-2.5 bg-primary-100 text-primary-600 rounded-md text-xs font-medium mt-1 inline-block">
                  Task-{item?.index}
                </span>
              </div>
            </div>
          );
        }}
      </Draggable>
    );
  });
}

function Tasks() {
  const [tasks, setTasks] = useState(defaultBoard);

  useEffect(() => {
    const onError = (error: Error) => {
      toast.error('Something went wrong');
    };
    const onSuccess = (data: Iboard) => {
      setTasks(data);
    };
    getTasks(onSuccess, onError);
  }, []);

  const invokeUpdateTasks = (data: Iboard) => {
    const onSuccess = (res) => {
      toast.success('Saved');
    };
    const onError = (error: Error) => {
      toast.error('Something went wrong');
    };
    updateTasks(data, onSuccess, onError);
  };

  const onDragEnd = (result: DropResult) => {
    const tasksAfterDrag = changeTaskStatus(result, tasks);
    if (!tasksAfterDrag) return; // no change
    setTasks((currTasks) => ({ ...currTasks, ...tasksAfterDrag }));
    invokeUpdateTasks(tasksAfterDrag);
  };
  const onBeforeCapture = () => {};
  return (
    <div className="w-full">
      <DragDropContext onDragEnd={onDragEnd} onBeforeCapture={onBeforeCapture}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {Object.entries(tasks).map(
            ([columnId, column]: [string, Icolumn], index) => {
              return (
                <div className="col-auto h-[580px]" key={columnId}>
                  <div className="pb-2.5 w-full flex justify-between">
                    <div className="inline-flex items-center space-x-2">
                      <h2 className="text-slate-800 font-medium text-sm uppercase leading-3">
                        {column.name}
                      </h2>
                      <span
                        className={`h-5 md:inline-flex items-center justify-center px-2 mb-[2px] leading-none rounded-full text-xs font-semibold text-gray-500 border border-gray-300 ${
                          column.items.length < 1 && 'invisible'
                        }`}>
                        {column.items?.length}
                      </span>
                    </div>
                  </div>
                  <div>
                    <Droppable droppableId={columnId} key={columnId}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={`min-h-[580px] pt-4 duration-75 transition-colors border-t-2 border-primary-400 ${
                              snapshot.isDraggingOver && 'border-primary-600'
                            }`}>
                            {renderDraggableTasks(column.items)}
                            {provided.placeholder}
                          </div>
                        );
                      }}
                    </Droppable>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </DragDropContext>
    </div>
  );
}

export default Tasks;
