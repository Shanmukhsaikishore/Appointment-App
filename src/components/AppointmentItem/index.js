import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, isStarClicked} = props
  const {id, title, date, isStarred} = appointmentDetails
  const imgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const starClick = () => {
    isStarClicked(id)
  }

  return (
    <li className="list-item">
      <div className="list-top-container">
        <p className="heading">{title}</p>
        <button
          type="button"
          className="star-button"
          data-testid="star"
          onClick={starClick}
        >
          <img src={imgUrl} alt="star" className="star-image" />
        </button>
      </div>
      <p className="para">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
