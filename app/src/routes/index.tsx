import { useRoutes } from 'react-router-dom';

export const routeData = [
  {
    path: '/',
    label: '',
    element: <div>Home Page</div>,
  },
  {
    path: 'form',
    label: '表单管理',
    element: <div>Form Management</div>,
  },
  {
    path:'process',
    label: '流程管理',
    element: <div>Process Management</div>
  },
  {
    path: 'task-center',
    label: '任务中心',
    element: <div>Task Center</div>
  },
  {
    path: 'monitor',
    label: '流程监控',
    element: <div>Process Monitor</div>
  }
];

export const AppRoutes = () => useRoutes(routeData);
