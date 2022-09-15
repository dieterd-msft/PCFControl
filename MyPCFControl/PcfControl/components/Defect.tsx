import * as React from 'react';

export interface DefectProps {
  id:string
  x: number
  y: number
  completed: boolean
  onDefectCompleted?: (id: string) => void
}


export const Defect = React.memo((props: DefectProps) => {
  return <>
  <circle cy={props.y} cx={props.x} r="5" fill={props.completed ? 'green' : 'red'} onClick={() => props.onDefectCompleted && props.onDefectCompleted(props.id)}></circle> 
  </>;
});
Defect.displayName = 'DefectItem';