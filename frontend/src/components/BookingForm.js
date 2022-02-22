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
  const [errors, setErrors] = useState([]);

  const todayFn = () => {
    const date = new Date()
    let year = date.getFullYear().toString();
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();
    if (day.length === 1) day = '0' + day;
    if (month.length === 1) month = '0' + month;
    return `${year}-${month}-${day}`;
  }

  const validDate = (da1, da2) => {
    let today = todayFn();

    let errArr = [];

    // check booking date1 is made in the future
    if (parseInt(da1.slice(0, 4)) < parseInt(today.slice(0, 4))) errArr.push('date1 before year error');
    else if (da1.slice(0, 4) === today.slice(0, 4) && parseInt(da1.slice(5, 7)) < parseInt(today.slice(5, 7))) errArr.push('date1 before month error');
    else if (da1.slice(0, 4) === today.slice(0, 4) && da1.slice(5, 7) === today.slice(5, 7) && da1.slice(8, 10) < today.slice(8, 10)) errArr.push('date1 before month error');

    // check booking date2 is made in the future
    if (parseInt(da2.slice(0, 4)) < parseInt(today.slice(0, 4))) errArr.push('date2 before year error');
    else if (da2.slice(0, 4) === today.slice(0, 4) && parseInt(da2.slice(5, 7)) < parseInt(today.slice(5, 7))) errArr.push('date2 before month error');
    else if (da2.slice(0, 4) === today.slice(0, 4) && da2.slice(5, 7) === today.slice(5, 7) && da2.slice(8, 10) < today.slice(8, 10)) errArr.push('date2 before month error');

    // check date2 >= date1
    if (parseInt(da1.slice(0, 4)) > parseInt(da2.slice(0, 4)) ||
      parseInt(da1.slice(5, 7)) > parseInt(da2.slice(5, 7)) ||
      parseInt(da1.slice(8, 10)) > parseInt(da2.slice(8, 10))) errArr.push('second date should be after the first date.');

    setErrors(errArr);
  }

  const totalDays = () => {
    // **** error to adress later. assumes you cannot rent for more than 1 year.
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
    setBooking(!booking); //not sure if this is doing anything
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
            onChange={async e => {
              setDate1(e.target.value);
              return validDate(e.target.value, date2);
            }}
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
            onChange={e => {
              setDate2(e.target.value);
              return validDate(date1, e.target.value);
            }}
          />
        </div>
        <div>
          <ul>
            {errors.map(error => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
        <div>
          <button className='global-button-style' disabled={errors.length > 0}>
            Book
          </button>
        </div>
      </form>
    </>
  )
}

export default BookingForm;