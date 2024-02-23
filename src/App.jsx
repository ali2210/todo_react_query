import { useState } from 'react'
import './App.css'
import { QueryClient, QueryClientProvider, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Box, Button, InputLabel, TextField } from '@mui/material';
import DnsIcon from '@mui/icons-material/Dns';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import axios from 'axios';



// query client 
const queryClient = new QueryClient(); 


function App() {
  

  // query client provider
  return (
    <QueryClientProvider client={queryClient}>
      <Fetchtodo></Fetchtodo>
    </QueryClientProvider>
  )
}



// fetchtodo function handle query & mutation
function Fetchtodo(){

  const queryClient = useQueryClient();

  const query = useQuery({ queryKey: ['todoapp'], queryFn: ()=>fetch('https://crudcrud.com/api/f66b2e4f83fc4025b4476e859b8191b9/create').then((resp)=> resp.json())})

  const mutation = useMutation({
    mutationFn : (todo) => {
      return axios.post('https://crudcrud.com/api/f66b2e4f83fc4025b4476e859b8191b9/create', todo)
    },
    onSuccess : () =>{
      queryClient.invalidateQueries({ queryKey : ['todoapp']})
    },
  });

  const [viewActive, setViewActive] = useState(false);
  const [task, setTask] = useState(false);

  const handleDataView = () => {
    
    if (!viewActive){
      
      setViewActive(true);
    
    }else{

      setViewActive(false);
    }
    
  }

  const handleTask = () => {

      if (!task){
        
        setTask(true);
      
      }else{

        setTask(false);
      }
  }

  const create_task = (event) =>{

      const task = event.target.elements.task.value;
      console.log("task ==", task);

      mutation.mutate({ "data" : task.toString(), "id" : "0"}); 
      event.preventDefault();
  }


  return(

      <Box sx={{color : 'black', width : 720, height : 250}}>
        <Button variant='outlined' onClick={handleDataView} sx={{border : 0, color : 'green', position : 'relative', top : '5.2pc', left : '1pc'}}>
          <DnsIcon></DnsIcon>
        </Button>
        <Box visibility={viewActive == false ? 'hidden' : 'visible'} sx={{position : 'relative', top : '9pc'}}>
          {JSON.stringify(query.data)}
        </Box>
        <Box>
          <Button variant='outlined' onClick={handleTask} sx={{position : 'relative', top : '-3pc', left : '-5pc', border : 0, color : 'green' }}>
            <AddIcon></AddIcon>
          </Button>
        </Box>
        <Box visibility={task == false ? 'hidden' : 'visible'} sx={{position : 'relative', top : '5pc', width : 300}}>
          <form onSubmit={create_task}>
            <InputLabel sx={{color : 'white'}}> Task </InputLabel>
            <TextField id="task" type='text' variant="filled" placeholder='get up early in the morning '  sx={{input : {color : 'black',  fontSize : 'medium'}, width : '20pc', position : 'relative', left : '12pc'}} />
            <Button variant='outlined' type='submit' sx={{position : 'relative', top : '2pc', left : '11pc', color : 'darkgreen', border : 0}}>
                <CheckCircleOutlineIcon></CheckCircleOutlineIcon>
            </Button>
          </form>
        </Box>
      </Box>      
  )

}

export default App
