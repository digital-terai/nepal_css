const Projects =  [
  {
    username: 'Dessie',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ludwiczakpawel/128.jpg',
    name: 'Hydropower Project 1',
    deadline: '2 days later',
    progress: 90,
    color: 'pink',
    uuid: '3782c174-1f2c-4dc4-b75d-0bedf400e023'
  },
  {
    uuid: '899d0e31-b71e-4d95-a8a0-6a8bceb314bd',
    username: 'Jakayla',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/suprb/128.jpg',    
    name: 'Hydropower Project 2',
    deadline: '1 weeks later',
    progress: 70,
    color: 'success'
  },
  {
    uuid: 'a41c6c4a-9cb1-45d1-8c6f-091044ba51ff',
    username: 'Ludwiczakpawel',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ludwiczakpawel/128.jpg',    
    name: 'Hydropower Project 3',
    deadline: '1 Month later',
    progress: 50,
    color: 'info'
  },
  {
    uuid: 'eef93cb1-7766-4413-a5cf-ecbf71fa3674',
    username: 'Damenleeturks',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/damenleeturks/128.jpg',    
    name: 'Hydropower Project 4',
    deadline: '2 Month later',
    progress: 30,
    color: 'teal'
  },
  {
    uuid: '6124d4e8-77ed-4b34-868d-d312bfab5de13',
    username: 'Caspergrl',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/caspergrl/128.jpg',    
    name: 'Hydropower Project 5',
    deadline: 'half year later',
    progress: 15,
    color: 'grey'
  },
  {
    uuid: '6124d4e8-77ed-4b34-868d-d312bfab5de12',
    username: 'Caspergrl',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/caspergrl/128.jpg',    
    name: 'Hydropower Project 6',
    deadline: 'half year later',
    progress: 15,
    color: 'grey'
  },
  {
    uuid: '6124d4e8-77ed-4b34-868d-d312bfab5de11',
    username: 'Caspergrl',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/caspergrl/128.jpg',    
    name: 'Hydropower Project 7',
    deadline: 'half year later',
    progress: 15,
    color: 'grey'
  },
  {
    uuid: '6124d4e8-77ed-4b34-868d-d312bfab5de10',
    username: 'Caspergrl',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/caspergrl/128.jpg',    
    name: 'Hydropower Project 8',
    deadline: 'half year later',
    progress: 15,
    color: 'grey'
  },
  {
    uuid: '6124d4e8-77ed-4b34-868d-d312bfab5de9',
    username: 'Caspergrl',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/caspergrl/128.jpg',    
    name: 'Hydropower Project 9',
    deadline: 'half year later',
    progress: 15,
    color: 'grey'
  },
  {
    uuid: '6124d4e8-77ed-4b34-868d-d312bfab5de8',
    username: 'Caspergrl',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/caspergrl/128.jpg',    
    name: 'Hydropower Project 10',
    deadline: 'half year later',
    progress: 15,
    color: 'grey'
  },
  {
    uuid: '6124d4e8-77ed-4b34-868d-d312bfab5de7',
    username: 'Caspergrl',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/caspergrl/128.jpg',    
    name: 'Hydropower Project 11',
    deadline: 'half year later',
    progress: 15,
    color: 'grey'
  },
  {
    uuid: '6124d4e8-77ed-4b34-868d-d312bfab5de6',
    username: 'Caspergrl',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/caspergrl/128.jpg',    
    name: 'Hydropower Project 12',
    deadline: 'half year later',
    progress: 15,
    color: 'grey'
  },
  {
    uuid: '6124d4e8-77ed-4b34-868d-d312bfab5de5',
    username: 'Caspergrl',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/caspergrl/128.jpg',    
    name: 'Hydropower Project 13',
    deadline: 'half year later',
    progress: 15,
    color: 'grey'
  },
  {
    uuid: '6124d4e8-77ed-4b34-868d-d312bfab5de4',
    username: 'Caspergrl',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/caspergrl/128.jpg',    
    name: 'Hydropower Project 14',
    deadline: 'half year later',
    progress: 15,
    color: 'grey'
  },
  {
    uuid: '6124d4e8-77ed-4b34-868d-d312bfab5de3',
    username: 'Caspergrl',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/caspergrl/128.jpg',    
    name: 'Hydropower Project 15',
    deadline: 'half year later',
    progress: 15,
    color: 'grey'
  },
  {
    uuid: '6124d4e8-77ed-4b34-868d-d312bfab5de2',
    username: 'Caspergrl',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/caspergrl/128.jpg',    
    name: 'Hydropower Project 16',
    deadline: 'half year later',
    progress: 15,
    color: 'grey'
  },

];

const getProject = (limit) => {
  return (limit) ? Projects.slice(0, limit) : Projects;
};


export {
  Projects,
  getProject
};