import './App.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'

const apiStatusContainer = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  initail: 'INITAIL',
}

class App extends Component {
  state = {apiStatus: apiStatusContainer.initail, travelList: []}

  getTravelList = async () => {
    this.setState({apiStatus: apiStatusContainer.inProgress})
    const response = await fetch('https://apis.ccbp.in/tg/packages')
    const data = await response.json()
    const fetchData = data.packages.map(eachItem => ({
      id: eachItem.id,
      name: eachItem.name,
      imageUrl: eachItem.image_url,
      description: eachItem.description,
    }))
    this.setState({
      travelList: fetchData,
      apiStatus: apiStatusContainer.success,
    })
  }

  componentDidMount() {
    this.getTravelList()
  }

  renderTravelSuccess = () => {
    const {travelList} = this.state
    return (
      <ul className="travel-list-container">
        {travelList.map(eachItem => (
          <li className="travel-item-container" key={eachItem.id}>
            <img
              src={eachItem.imageUrl}
              alt={eachItem.name}
              className="image"
            />
            <div className="text-container">
              <h1 className="name">{eachItem.name}</h1>
              <p className="description">{eachItem.description}</p>
            </div>
          </li>
        ))}
      </ul>
    )
  }

  renderTravelLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderTravelGuide = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusContainer.success:
        return this.renderTravelSuccess()
      case apiStatusContainer.inProgress:
        return this.renderTravelLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <h1 className="heading">Travel Guide</h1>
        {this.renderTravelGuide()}
      </div>
    )
  }
}

export default App
