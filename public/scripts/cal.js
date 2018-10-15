$(document).ready(function () {

    $('#calendar').fullCalendar({
    themeSystem: 'bootstrap4',
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      defaultDate: '2018-03-12',
      navLinks: true,
      selectable: true,
      selectHelper: true,
      select: function (start, end, event) {
        $('.modal').modal('show');
        $('.modal').find('#starts-at').val(start.format('MM/DD/YYYY h:ss A'));
        $('.modal').find('#ends-at').val(end.format('MM/DD/YYYY h:ss A'));
      },
      editable: true,
      eventLimit: true,
      eventClick: function (event, jsEvent, view) {
        var title = event.title;
        $('.modal').modal('show');
        $('.modal').find('#title').val(event.title);
        $('.modal').find('#starts-at').val(event.start.format('MM/DD/YYYY h:ss A'));
        if (event.end) {
          $('.modal').find('#ends-at').val(event.end.format('MM/DD/YYYY h:ss A'));
        }

        $('.modal').find("#modify-event").one('click', function (e) {
          e.preventDefault()
          var modify_title = $('#title').val();
          event.title = modify_title;
          if (event.start) {
            event.start = (typeof event.start === 'string') ? event.start : event.start.format(
              'MM/DD/YYYY h:ss A');
          }
          if (event.end) {
            event.end = (typeof event.end === 'string') ? event.end : event.end.format(
              'MM/DD/YYYY h:ss A');
          }
          $('#calendar').fullCalendar('updateEvent', event, true); // stick? = true
          $('#calendar').fullCalendar('unselect');
          $('.modal').find('input').val('');
          $('.modal').modal('hide');
        });

        $('.modal').find('#delete-event').on('click', function () {
          $('#calendar').fullCalendar('removeEvents', event._id);
          $('.modal').find('input').val('');
          $('.modal').modal('hide');
        });
      },
      events: [{
          title: 'All Day Event',
          start: '2018-03-01'
        },
        {
          title: 'Long Event',
          start: '2018-03-07',
          end: '2018-03-10'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2018-03-09T16:00:00'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2018-03-16T16:00:00'
        },
        {
          title: 'Conference',
          start: '2018-03-11',
          end: '2018-03-13'
        },
        {
          title: 'Meeting',
          start: '2018-03-12T10:30:00',
          end: '2018-03-12T12:30:00'
        },
        {
          title: 'Lunch',
          start: '2018-03-12T12:00:00'
        },
        {
          title: 'Meeting',
          start: '2018-03-12T14:30:00'
        },
        {
          title: 'Happy Hour',
          start: '2018-03-12T17:30:00'
        },
        {
          title: 'Dinner',
          start: '2018-03-12T20:00:00'
        },
        {
          title: 'Birthday Party',
          start: '2018-03-13T07:00:00'
        },
        {
          title: 'Click for Google',
          url: 'http://google.com/',
          start: '2018-03-28'
        }
      ]
    });
    $("#starts-at, #ends-at").datetimepicker();
    $('#save-event').on('click', function () {
      var title = $('#title').val();
      if (title) {
        var eventData = {
          title: title,
          start: $('#starts-at').val(),
          end: $('#ends-at').val()
        };
        $('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
      }
      $('#calendar').fullCalendar('unselect');
      $('.modal').find('input').val('');
      $('.modal').modal('hide');
    });
  });