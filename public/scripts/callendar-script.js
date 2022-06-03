//https://codepen.io/nitroduck/pen/pmQoOY

$(document).ready(function() {
    var currentDate = new Date();
    function generateCalendar(d) {
      function monthDays(month, year) {
        var result = [];
        var days = new Date(year, month, 0).getDate();
        for (var i = 1; i <= days; i++) {
          result.push(i);
        }
        return result;
      }
      Date.prototype.monthDays = function() {
        var d = new Date(this.getFullYear(), this.getMonth() + 1, 0);
        return d.getDate();
      };
      var details = {
        // totalDays: monthDays(d.getMonth(), d.getFullYear()),
        totalDays: d.monthDays(),
        weekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      };
      var start = new Date(d.getFullYear(), d.getMonth()).getDay();
      var cal = [];
      var day = 1;
      for (var i = 0; i <= 6; i++) {
        cal.push(['<tr>']);
        for (var j = 0; j < 7; j++) {
          if (i === 0) {
            cal[i].push('<td>' + details.weekDays[j] + '</td>');
          } else if (day > details.totalDays) {
            cal[i].push('<td>&nbsp;</td>');
          } else {
            if (i === 1 && j < start) {
              cal[i].push('<td>&nbsp;</td>');
            } else {
              cal[i].push('<td class="day">' + day++ + '</td>');
            }
          }
        }
        cal[i].push('</tr>');
      }
      cal = cal.reduce(function(a, b) {
        return a.concat(b);
      }, []).join('');
      $('table').append(cal);
      $('#month').text(details.months[d.getMonth()]);
      $('#year').text(d.getFullYear());
      $('td.day').mouseover(function() {
        $(this).addClass('hover');
      }).mouseout(function() {
        $(this).removeClass('hover');
      });
    }
    
    generateCalendar(currentDate);
  });