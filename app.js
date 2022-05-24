import express from "express";
const app = express();

app.use((req, res, next) => {
    console.log("Метод", req.method, "Адрес", req.url, "Код", res.statusCode);
    next();
});
app.use(express.static("public"));

app.use(express.json());


app.post("/klaviatura", (req, res) => {
 
  let data = {
    status: "error",
    message: "",
  };
  res.statusCode = 400;


  if (req.header("Content-Type") != "application/json") {
    
    data.message = "Неверный тип данных";
    res.send(data);
    return;
  }
  else if (req.body.switches == undefined) {
    
    data.message = "Не хватает данных";
    res.send(data);
    return;
  }
  else if (typeof(req.body.glow) !== "boolean") {

    
    data.message = "Не хватает данных";

    res.send(data);
    return;
  }
  
  let otvet = {
    status: "ok",
    switches: req.body.switches,
    glow: req.body.glow
  }

  if (req.body.gravirovka != undefined){
    otvet["gravirovka"] = req.body.gravirovka;
  }

  if (req.body.klavishi != undefined && Number(req.body.klavishi) != undefined){
    otvet["klavishi"] = req.body.klavishi;
  }
  else {
    
    data.message = "Неверные данные в форме";

    res.send(data);
    return;
  }

  res.statusCode = 200;
  res.send(otvet);
});

let port = 5500;
app.listen(port, () => console.log(`Server started at port ${port}`));
