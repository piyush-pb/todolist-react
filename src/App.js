import React, { useState } from 'react';
import './App.css';
import StylishPage from './components/StylishPage';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import DeleteIcon from '@mui/icons-material/Delete';

function App() {
  
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [input, setInput] = useState('');
  const [category, setCategory] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('');
  const [label, setLabel] = useState('');
  const [sortCriteria, setSortCriteria] = useState('urgency');

  const addTask = () => {
    if (input.trim()) {
      setTasks([
        ...tasks,
        {
          task: input,
          category: category,
          deadline: deadline,
          priority: priority,
          label: label,
        },
      ]);
      setInput('');
      setCategory('');
      setDeadline('');
      setPriority('');
      setLabel('');
    }
  };

  const deleteTask = (index) => {
    const completedTask = tasks[index];
    setCompletedTasks([...completedTasks, completedTask]);

    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const sortTasks = (tasks) => {
    return tasks.sort((a, b) => {
      switch (sortCriteria) {
        case 'urgency':
          return new Date(a.deadline) - new Date(b.deadline);
        case 'importance':
          const priorityOrder = { High: 1, Medium: 2, Low: 3 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        case 'project':
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });
  };

  const calculateCompletionPercentage = () => {
    const totalTasks = tasks.length + completedTasks.length;
    return totalTasks === 0 ? 0 : Math.round((completedTasks.length / totalTasks) * 100);
  };

  const preparePieChartData = () => {
    const completed = completedTasks.length;
    const remaining = tasks.length;
    return [
      { name: 'Completed', value: completed },
      { name: 'Remaining', value: remaining },
    ];
  };

  return (
    <><div className="App">
      <StylishPage />
    </div><Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            To-Do List
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
            <TextField
              label="Enter a new task"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              variant="outlined"
              sx={{ flexGrow: 1, marginRight: 1 }} />
            <TextField
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              variant="outlined"
              sx={{ marginRight: 1 }} />
            <TextField
              label="Deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ marginRight: 1 }} />
            <FormControl variant="outlined" sx={{ minWidth: 120, marginRight: 1 }}>
              <InputLabel id="priority-label">Priority</InputLabel>
              <Select
                labelId="priority-label"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                label="Priority"
              >
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              variant="outlined"
              sx={{ marginRight: 1 }} />
            <Button variant="contained" onClick={addTask}>
              Add Task
            </Button>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
            <FormControl variant="outlined" sx={{ minWidth: 180, marginBottom: 2 }}>
              <InputLabel id="sort-criteria-label">Sort by</InputLabel>
              <Select
                labelId="sort-criteria-label"
                value={sortCriteria}
                onChange={(e) => setSortCriteria(e.target.value)}
                label="Sort by"
              >
                <MenuItem value="urgency">Urgency</MenuItem>
                <MenuItem value="importance">Importance</MenuItem>
                <MenuItem value="project">Project</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
            <Box position="relative" display="inline-flex" sx={{ marginRight: 1 }}>
              <CircularProgress variant="determinate" value={calculateCompletionPercentage()} />
              <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography variant="caption" component="div" color="text.secondary">
                  {`${calculateCompletionPercentage()}%`}
                </Typography>
              </Box>
            </Box>

            <Typography variant="h6" component="div" gutterBottom>
              Task Completion
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
            <PieChart width={400} height={200}>
              <Pie
                data={preparePieChartData()}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                <Cell key="completed" fill="#82ca9d" />
                <Cell key="remaining" fill="#8884d8" />
              </Pie>
              <Tooltip />
            </PieChart>
          </Box>
          <List>
            {sortTasks(tasks).map((task, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={task.task}
                  secondary={`Category: ${task.category}, Deadline: ${task.deadline}, Priority: ${task.priority}, Label: ${task.label}`} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={() => deleteTask(index)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Box>
      </Container></>
  )
  
}

export default App;
