const express = require('express');
const config = require('config');
const path = require('path');
const mongoose = require('mongoose');

const router = require('./routes/auth.routes');
const link = require('./routes/link.routes');
const redirect = require('./routes/redirect.routes')
const app = express();

app.use(express.json({ extended: true }))
app.use('/api/auth', router);
app.use('/api/link', link);
app.use('/t', redirect)

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = config.get('port') || 5000

async function start() {
  try {
    await mongoose.connect(config.get('mongoUrl'), {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`))
  } catch (e) {
    console.log('Server Error', e.message);
    process.exit()
  }
}


start()
