// import moment from 'moment';

const createDate = date => {
  return moment(date, 'MM/DD/YYYY').format('MM/DD/YYYY')
}

const events = [
  {
    title: 'Stage',
    start: '10/22/2018',
    end: '10/27/2018',
  },
  {
    title: 'Stage',
    start: '02/25/2019',
    end: '03/02/2019',
  },
  {
    title: 'Stage',
    start: '04/22/2019',
    end: '04/27/2019',
  },
]
