const express = require('express');
const { v4: uuidv4, validate: uuidValidate } = require('uuid');

const app = express();
app.use(express.json());

const dataStore = [
  {
    BodyId: '123e4567-e89b-12d3-a456-426614174000',
    BodyIdNumber: '123',
    name: 'John Doe',
  },
  {
    BodyId: '236e4629-e89b-12d3-a456-426614174000',
    BodyIdNumber: '456',
    name: 'Jane Smith',
  },
];

app.post('/api/test/:number', (req, res) => {
  const { number } = req.params;
  const { id } = req.headers;

  if (!uuidValidate(id)) {
    return res.status(400).send({ message: 'Invalid UUID format' });
  }

  const matchedObjects = dataStore.filter((obj) => {
    return obj.BodyId === id && obj.BodyIdNumber === number;
  });

  if (matchedObjects.length === 0) {
    res.status(404).send({ message: 'not found' });
  } else {
    res.send(matchedObjects);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
