const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes/index");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require('../swagger.json');

const app = express();
const port = 8001;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", routes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
