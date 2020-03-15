const express = require("express");
const server = express();

//JS Object to store informations about the months
//Objeto para armazenar informações de todos os meses
var monthsInfo = [
  { name: "Janeiro", daysAmmt: 31, startWeekDay: "", WeekDays: [] },
  { name: "Fevereiro", daysAmmt: 28, startWeekDay: "", WeekDays: [] },
  { name: "Março", daysAmmt: 31, startWeekDay: "", WeekDays: [] },
  { name: "Abril", daysAmmt: 30, startWeekDay: "", WeekDays: [] },
  { name: "Maio", daysAmmt: 31, startWeekDay: "", WeekDays: [] },
  { name: "Junho", daysAmmt: 30, startWeekDay: "", WeekDays: [] },
  { name: "Julho", daysAmmt: 31, startWeekDay: "", WeekDays: [] },
  { name: "Agosto", daysAmmt: 31, startWeekDay: "", WeekDays: [] },
  { name: "Setembro", daysAmmt: 30, startWeekDay: "", WeekDays: [] },
  { name: "Outrubro", daysAmmt: 31, startWeekDay: "", WeekDays: [] },
  { name: "Novembro", daysAmmt: 30, startWeekDay: "", WeekDays: [] },
  { name: "Dezembro", daysAmmt: 31, startWeekDay: "", WeekDays: [] }
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
  "domingo"
];

//Setting and mapping each day of the week with the days of the month
//Setando e mapeando cada dia da semana com o dia do mês
function SetDaysMonth(monthsInfo, id, firstday) {
  monthsInfo[id].startWeekDay = firstday;
  var index = days.findIndex(days => days == firstday);
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
//starting getting
server.get("/calendar/:id", (req, res) => {
  const id = req.params.id;
  const firstday = req.query.firstday;
  monthsInfo[id].WeekDays = []; //cleaning weekdays setted in a previos get
  SetDaysMonth(monthsInfo, id, firstday);

  res.json(monthsInfo[id]);
});

server.listen(3333);
