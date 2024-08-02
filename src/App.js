import React, { useState } from 'react';
import { Button, TextField, Drawer, MenuItem, Select, Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

const Sidebar = styled(Box)({
  padding: '16px',
  width: '300px',
  backgroundColor: '#f0f0f0',
  height: '100%'
});

const SchemaBox = styled(Box)({
  marginTop: '16px',
  backgroundColor: '#e0e0e0',
  padding: '16px',
  borderRadius: '8px'
});

const App = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [segmentName, setSegmentName] = useState('');
  const [selectedSchema, setSelectedSchema] = useState('');
  const [schemas, setSchemas] = useState([]);
  const [additionalSchemas, setAdditionalSchemas] = useState([
    { label: 'Age', value: 'age' },
    { label: 'City', value: 'city' },
    { label: 'State', value: 'state' }
  ]);
  const [schemaDropdowns, setSchemaDropdowns] = useState([]);

  const handleSaveSegment = () => {
    console.log({
      segment_name: segmentName,
      schema: schemas
    });
  };

  const handleAddSchema = () => {
    if (selectedSchema) {
      setSchemas([...schemas, selectedSchema]);
      setSchemaDropdowns([...schemaDropdowns, { label: selectedSchema.label, value: selectedSchema.value }]);
      setSelectedSchema('');
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={() => setIsDrawerOpen(true)}>
        Save segment
      </Button>
      <Drawer anchor="right" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <Sidebar>
          <Typography variant="h6" sx={{ marginBottom: '16px' }}>Create Segment</Typography>
          <TextField
            fullWidth
            label="Segment Name"
            value={segmentName}
            onChange={(e) => setSegmentName(e.target.value)}
            margin="normal"
            sx={{ marginBottom: '16px' }}
          />
          <Select
            fullWidth
            value={selectedSchema}
            onChange={(e) => setSelectedSchema(e.target.value)}
            displayEmpty
            sx={{ marginBottom: '16px' }}
          >
            <MenuItem value="" disabled>
              Add schema to segment
            </MenuItem>
            <MenuItem value={{ label: 'First Name', value: 'first_name' }}>First Name</MenuItem>
            <MenuItem value={{ label: 'Last Name', value: 'last_name' }}>Last Name</MenuItem>
            <MenuItem value={{ label: 'Gender', value: 'gender' }}>Gender</MenuItem>
          </Select>
          <Button onClick={handleAddSchema} color="primary" variant="outlined" sx={{ marginBottom: '16px' }}>
            + Add new schema
          </Button>
          <SchemaBox>
            {schemaDropdowns.map((schema, index) => (
              <Select
                key={index}
                fullWidth
                value=""
                displayEmpty
                sx={{ marginBottom: '16px' }}
              >
                <MenuItem value="" disabled>
                  {schema.label}
                </MenuItem>
                {additionalSchemas.map((additionalSchema, idx) => (
                  <MenuItem key={idx} value={additionalSchema.value}>{additionalSchema.label}</MenuItem>
                ))}
              </Select>
            ))}
          </SchemaBox>
          <Button
            variant="contained"
            onClick={handleSaveSegment}
            color="primary"
            fullWidth
            sx={{ marginTop: '17px' }}
          >
            Save the segment
          </Button>
        </Sidebar>
      </Drawer>
    </div>
  );
};

export default App;
