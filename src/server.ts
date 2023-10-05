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
  const participant = await payload.findByID({
    collection: 'participants',
    id: req.params.id,
    depth: 0,
  });

  if (participant.events.length > 0) {
    participant.events.map((event) => {
      if (event.event_id === req.body.event_id) {
        event.is_payed = req.body.is_payed;
        event.attended = req.body.attended;
        event.refund = req.body.refund;
        event.description = req.body.description;
        event.sum = req.body.sum;
        event.payment_date = req.body.payment_date;
        event.payment_method = req.body.payment_method;
      }
      return event;
    });
  }

  const result = await payload.update({
    collection: 'participants',
    id: req.params.id,
    data: participant,
  });

  res.send(JSON.stringify('Request received'));
});

app.get('/api/custom/events/:id', async (req, res) => {
  const event = await payload.findByID({
    collection: 'events',
    id: req.params.id,
    depth: 1,
  });

  let count = 0;
  let paid = 0;
  let refund = 0;

  if (event.participants.length > 0) {
    count = event.participants.length;

    event.participants.forEach((participant) => {
      const current_event = participant.events.find(
        (item) => item.event_id === req.params.id
      );
      if (current_event) {
        if (current_event.is_payed && !current_event.refund) {
          paid++;
        } else if (current_event.refund) {
          refund++;
        }
      }
    });
  }

  res.send(JSON.stringify({ count, paid, refund }));
});

const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    mongoURL: `${process.env.MONGODB_URI}/${process.env.MONGODB_DATABASE}`,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  });

  // Add your own express routes here

  app.listen(3000);
};

start();
