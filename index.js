const express = require("express");
const server = express();
const cors = require("cors");

server.use(cors());

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

server.use(cors(corsOptions));

//JS Object to store informations about the months
//Objeto para armazenar informações de todos os meses
var monthsInfo = [
  { name: "Janeiro", daysAmmt: 31, startWeekDay: "", WeekDays: [] },
  { name: "Fevereiro", daysAmmt: 0, startWeekDay: "", WeekDays: [] },
  { name: "Março", daysAmmt: 31, startWeekDay: "", WeekDays: [] },
  { name: "Abril", daysAmmt: 30, startWeekDay: "", WeekDays: [] },
  { name: "Maio", daysAmmt: 31, startWeekDay: "", WeekDays: [] },
  { name: "Junho", daysAmmt: 30, startWeekDay: "", WeekDays: [] },
  { name: "Julho", daysAmmt: 31, startWeekDay: "", WeekDays: [] },
  { name: "Agosto", daysAmmt: 31, startWeekDay: "", WeekDays: [] },
  { name: "Setembro", daysAmmt: 30, startWeekDay: "", WeekDays: [] },
  { name: "Outrubro", daysAmmt: 31, startWeekDay: "", WeekDays: [] },
  { name: "Novembro", daysAmmt: 30, startWeekDay: "", WeekDays: [] },
  { name: "Dezembro", daysAmmt: 31, startWeekDay: "", WeekDays: [] },
];

//array with the days of the week
//array com os dias da semana
const days = [
  "segunda",
  "terça",
  "quarta",
  "quinta",
  "sexta",
  "sábado",
  "domingo",
];
//Changing array in a json stucture
function jsonStruct(array, monthId) {
  var date = new Date();
  var year = date.getFullYear();

  const jsonStr = array.map((data) => ({
    Id: parseInt(data.split(",")[0]),
    Dias: data.split(",")[0] + `/${monthId + 1}` + `/${year}`,
    Semana: UpperCaseFirstOnly(data.split(",")[1].trim()),
    Entrada: "09:00 AM",
    Saída: "16:00 PM",
  }));

  return jsonStr;
}

//Função para deixar apenas a primeira letra maiúscula
function UpperCaseFirstOnly(word) {
  var wordUp;
  wordUp = word.split("");
  wordUp[0] = wordUp[0].toUpperCase();

  wordUp = wordUp.join("");
  return wordUp;
}

//Setting and mapping each day of the week with the days of the month
//Setando e mapeando cada dia da semana com o dia do mês
function SetDaysMonth(monthsInfo, id, firstday, daysAmmt) {
  monthsInfo[id].startWeekDay = firstday;
  //Informar quantidade de dias caso o mês seja fevereiro
  //Inform days quantity in case the month is february
  if (monthsInfo[id].daysAmmt == 0) {
    monthsInfo[id].daysAmmt = parseInt(daysAmmt, 10);
  }

  var index = days.findIndex((days) => days == firstday);
  for (var j = 1; j <= monthsInfo[id].daysAmmt; j++) {
    if (index <= 6) {
      monthsInfo[id].WeekDays.push(j + ", " + days[index]);
      index++;
    } else {
      index = 0;
      monthsInfo[id].WeekDays.push(j + ", " + days[index]);
      index++;
    }
  }
  return monthsInfo[id];
}

server.get("/", (req, res) => {
  res.send("<h1>Server Runnig!!</h1>");
});

//starting getting
server.get("/calendar/:id", (req, res) => {
  const id = req.params.id;
  const firstday = req.query.firstday;
  let daysAmmt = req.query.days;

  monthsInfo[id].WeekDays = []; //cleaning weekdays setted in a previos get

  //Adding validation to clean the ammount of days if it is passed as a parameter
  if (daysAmmt) {
    monthsInfo[id].daysAmmt = []; //cleaning Days ammount setted in a previous get
  }

  SetDaysMonth(monthsInfo, id, firstday, daysAmmt);

  let jsonStr = jsonStruct(monthsInfo[id].WeekDays, id);

  res.json(jsonStr);
});

server.listen(3333);
