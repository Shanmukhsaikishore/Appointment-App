import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    appointmentList: [],
    title: '',
    date: '',
    activeStarred: false,
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  activeStar = () => {
    this.setState(prevState => ({activeStarred: !prevState.activeStarred}))
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    if (title === '' || date === '') return
    const newAppointment = {
      id: uuidv4(),
      title,
      date: format(new Date(date), 'dd MMMM yyyy, EEEE'),
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      date: '',
    }))
  }

  isStarClicked = uid => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachItem => {
        if (eachItem.id === uid) {
          const newItem = {...eachItem, isStarred: !eachItem.isStarred}
          return newItem
        }
        return eachItem
      }),
    }))
  }

  render() {
    const {appointmentList, title, date, activeStarred} = this.state
    const className = activeStarred ? 'star-clicked' : ''
    const filteredList = activeStarred
      ? appointmentList.filter(eachItem => eachItem.isStarred === true)
      : appointmentList
    return (
      <div className="bg-container">
        <div className="card-container">
          <div className="top-section">
            <div className="input-container">
              <h1 className="main-heading">Add Appointment</h1>
              <form className="form-container" onSubmit={this.onAddAppointment}>
                <label htmlFor="Title" className="title">
                  TITLE
                </label>
                <input
                  id="Title"
                  type="text"
                  value={title}
                  className="input-text"
                  placeholder="Title"
                  onChange={this.onChangeTitle}
                />
                <label htmlFor="Date" className="title">
                  DATE
                </label>
                <input
                  id="Date"
                  type="date"
                  value={date}
                  placeholder="dd/mm/yyyy"
                  className="input-date"
                  onChange={this.onChangeDate}
                />

                <button type="submit" className="submit-button">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="image"
            />
          </div>
          <hr className="seperator" />
          <div className="heading-container">
            <h1 className="sub-heading">Appointments</h1>
            <button
              type="button"
              className={`starred ${className}`}
              onClick={this.activeStar}
            >
              Starred
            </button>
          </div>
          <ul className="list-container">
            {filteredList.map(eachItem => (
              <AppointmentItem
                key={eachItem.id}
                appointmentDetails={eachItem}
                isStarClicked={this.isStarClicked}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
