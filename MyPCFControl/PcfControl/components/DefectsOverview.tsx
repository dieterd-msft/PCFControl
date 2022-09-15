import * as React from 'react';
import { Defect } from './Defect';
import { nanoid } from 'nanoid';

export interface Defect {
    id: string
    x: number
    y: number
    completed: boolean
}

export const DefectsOverview = () => {
    const [defects, setDefects] = React.useState<Defect[]>([{ id: "todo-1", x: 5, y: 5, completed: false }, { id: "todo-2", x: 5, y: 30, completed: false }]);
    const [updateCounter, forceUpdate] = React.useReducer(x => x + 1, 0);

    const onDefectCompleted = React.useCallback((id: string) => {
        const item = defects.find((i) => i.id === id);
        if (item) {
            item.completed = !item.completed;
        }
        console.log("Item clicked!");
        forceUpdate();
    }, [defects, forceUpdate]);

    const onAddDefect = React.useCallback((event: React.MouseEvent) => {
        let rect = event.currentTarget.getBoundingClientRect();
        let x = event.pageX - rect.left;
        let y = event.pageY - rect.top;

        const newDefect = { id: "defect-" + nanoid(), x: x,y:y, completed: false };
        defects.push(newDefect);
        console.log("Item added!");
        forceUpdate();
    }, [defects, forceUpdate]);

    return <div style={{ height: '100vh', width: '100vh' }} >
        <svg style={{ height: '100vh', width: '100vh' }} >
        <image href='innen.png' onClick={onAddDefect}></image>
        {defects.map((item: Defect, index: number) => {
            return <Defect
                key={item.id}
                id={item.id}
                x={item.x}
                y={item.y}
                completed={item.completed}
                onDefectCompleted={onDefectCompleted}
            />
        })}</svg>
    </div>;
};