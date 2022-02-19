import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addBooking, updateBooking } from '../store/bookingsReducer';

function BookingForm(props) {

  const history = useHistory();

  let dispatch = useDispatch();
  const sessionUserId = useSelector(state => state.session.user.id);

  const [booking, setBooking] = useState(false);
  const [date1, setDate1] = useState(props.bookingStart);
  const [date2, setDate2] = useState(props.bookingEnd);

  const todayFn = () => {
    const date = new Date()
    let year = date.getFullYear().toString();
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();
    if (day.length === 1) day = '0' + day;
    if (month.length === 1) month = '0' + month;
    return `${year}-${month}-${day}`;
  }

  const totalDays = () => {
    // assumes you cannot rent for more than 1 year.
    // assumes you cannot rent in the past.
    // assuems if both same day, it is 1 day long.

    let d1 = date1 || todayFn();
    let d2 = date2 || todayFn()

    let month1 = parseInt(d1.slice(5, 7));
    let month2 = parseInt(d2.slice(5, 7));

    const feb = () => {
      let year = d1.slice(0, 4);
      if (month1 > month2) {
        year = d2.slice(5, 7);
      }
      if (year % 400 === 0) return 29
      else if (year % 100 === 0) return 28
      else if (year % 4 === 0) return 29
      else return 28;
    }

    let monthDays = [31, feb(), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    let count = 0;

    let day1 = parseInt(d1.slice(8, 10));
    let day2 = parseInt(d2.slice(8, 10));

    if (month1 === month2) {
      if (day1 > day2) {
        for (let i = 0; i < 12; i++) {
          if (i + 1 !== month1) count += monthDays[i];
        }
        count += day2;
        count += monthDays[month1 - 1] - day1 + 1
      }
      else count += day2 - day1 + 1;
    } else if (month1 < month2) {
      for (let i = month1; i < month2 - 1; i++) {
        count += monthDays[i];
      }
      count += day2;
      count += monthDays[month1 - 1] - day1 + 1;
    } else {
      for (let i = month1; i < 12; i++) {
        count += monthDays[i];
      }
      for (let i = 0; i < month2 - 1; i++) {
        count += monthDays[i];
      }
      count += day2;
      count += monthDays[month1 - 1] - day1 + 1
    }

    return count;
  }

  const submitDates = async e => {
    e.preventDefault();
    let timespan = `${date1 || todayFn()}X${date2 || todayFn()}X${totalDays()}`;
    let locationId = props.params.id
    let data = {
      userId: sessionUserId,
      locationId,
      timespan,
    }
    await dispatch(addBooking(data));
    setBooking(false);
    history.push('/')
  }

  const editDates = async e => {
    e.preventDefault();
    let userId = sessionUserId;
    let locationId = props.bookingLocation;
    let timespan = `${date1 || todayFn()}X${date2 || todayFn()}X${totalDays()}`;
    let data = {
      userId,
      locationId,
      timespan,
    }
    console.log('data is', data);
    console.log('props.bookingId is', props.bookingId);
    await dispatch(updateBooking(props.bookingId, data));
  }

  return (
    <>
      <form onSubmit={e => {
        if (props.bookingStart) return editDates(e);
        else return submitDates(e);
      }}
        className='location-page-booking-form'
      >
        <div className='location-page-form-div'>
          <label>
            start date
          </label>
          <input
            type='date'
            value={date1 || todayFn()}
            onChange={e => setDate1(e.target.value)}
          />
        </div>
        <br />
        <div className='location-page-form-div'>
          <label>
            end date
          </label>
          <input
            type='date'
            value={date2 || todayFn()}
            onChange={e => setDate2(e.target.value)}
          />
        </div>
        <div>
          <button className='global-button-style'>
            Book
          </button>
        </div>
      </form>
    </>
  )
}

export default BookingForm;