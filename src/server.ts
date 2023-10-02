import express from 'express';
import payload from 'payload';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin');
});

app.put('/api/custom/participants/:id', async (req, res) => {
  //console.log('request body', req.body);
  // console.log('id', req.params.id);

  const participant = await payload.findByID({
    collection: 'participants',
    id: req.params.id,
    depth: 0,
  });

  if(participant.events.length > 0) {
    participant.events.map((event) => {
      if(event.event_id === req.body.event_id) {
        event.is_payed = req.body.is_payed;
        event.attended = req.body.attended;
        event.description = req.body.description;
        event.sum = req.body.sum;
      }
      return event;
    })
  }
  console.log('participant', participant);
  
  const result = await payload.update({
    collection: 'participants',
    id: req.params.id,
    data: participant,
  });

  res.send(JSON.stringify('Request received'));
});

const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    mongoURL: `${process.env.MONGODB_URI}/${process.env.MONGODB_DATABASE}`,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })

  // Add your own express routes here

  app.listen(3000);
}

start();
