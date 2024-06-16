import {Component} from "react"
import './App.css';
import { TiWeatherPartlySunny } from "react-icons/ti";
import { TiLocationOutline } from "react-icons/ti";
import { TiWeatherWindyCloudy } from "react-icons/ti";
import { WiHumidity } from "react-icons/wi";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import { FaTemperatureArrowDown } from "react-icons/fa6";
import { FaTemperatureArrowUp } from "react-icons/fa6";


class App extends Component {
  state={weather:"",errormsg:"",time:[],inputValue:"Hyderabad",text:"",isdark:false}


  gettime=async(data)=> {
    const key="W7P8STJI47GO"
    try {
      const time=await fetch(`http://api.timezonedb.com/v2.1/get-time-zone?key=${key}&format=json&by=position&lat=${data.coord.lat}&lng=${data.coord.lon}`)
    const res=await time.json()
    this.setState({time:[res.cityName,res.countryName,res.formatted]})
    } catch (error) {
      this.setState({errormsg:error})
    }
  }
  

  getdatafromapi= async()=> {
    const appid="fa469b89c2fd55fc3401f0a8f2f7af5f"
    const {inputValue}=this.state
    try {
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${appid}`
    const response = await fetch(url)
    const data = await response.json()
    this.setState({text:data.weather.description})
    this.setState({weather:[data.main.temp,data.main.temp_max,data.main.temp_min,data.main.humidity,data.wind.speed]}, ()=>this.gettime(data))

    }catch (e) {
      this.setState({errormsg:e})
    }
    this.setState({inputValue:""})
  }

  componentDidMount() {
    this.getdatafromapi()
  }

  cahngeinput=(event)=> {
    this.setState({inputValue:event.target.value})
    
  }
  modeChange=()=> {
    this.setState(prev=> ({isdark:!prev.isdark}))
  }


  render() {
    const {weather,time,inputValue,isdark}=this.state
    let num = weather[0]
    let roundedNum = Math.round(num-273.15);
    const darkmode=isdark ? "dark" : ""
    const white=isdark ? "whitetext" : ""
    

    return (
<>
<div className={`main-container ${white}`}>
<div className= {`container ${darkmode}`}>
          <div className="header">
            <h1 className="header-text">Current weather <span><button className="btn" onClick={this.modeChange}> {isdark ? <MdDarkMode style={{height:"20px",width:"20px"}} /> : <MdOutlineDarkMode style={{height:"20px",width:"20px"}}/>}</button></span></h1>
            <h1 className="header-text">Time</h1>
          </div>
          <hr className="line"/>
    <div className="search-container">
              <div className="search-input">
              <input type="search" placeholder="Enter City Name" className="search-box" onChange={this.cahngeinput} value={inputValue}/>
              <button type="button" className="btn" onClick={this.getdatafromapi}>
              <img src="https://img.freepik.com/premium-vector/search-map-vector-illustration-style_717774-29623.jpg?w=740" alt="img" height="20px" width="20px" />
              </button>
              </div>
      <p><span><TiLocationOutline/></span>{time[0]},{time[1]}</p>
      <p>{time[2]}</p>
    </div>
                  <div className="cloud">
                        <TiWeatherPartlySunny style={{ width: '150px', height: '150px',margin: "5px" }} />
                        <h1 className="degree">{roundedNum}°</h1>
                    </div>

     <div className="bottom-container">
      <div className="line-cloumn">
                  <div className="left-con">
            <div className="para"><FaTemperatureArrowUp /><p>Temp Max</p></div> 
            <p>{weather[1]}</p>
                  </div>
                  <hr className="line"/>         
        </div>

        <div className="line-cloumn">
                  <div className="left-con">
            <div className="para"> <TiWeatherWindyCloudy /><p>wind speed</p></div> 
            <p>{weather[4]}</p>
                  </div>
                  <hr className="line"/>         
        </div>
        <div className="line-cloumn">
                  <div className="left-con">
            <div className="para"><WiHumidity style={{height:"20px",width:"20px"}}/><p>Humidity</p></div> 
            <p>{weather[3]}</p>
                  </div>
                  <hr className="line"/>         
        </div>
        <div className="line-cloumn">
                  <div className="left-con">
            <div className="para"><FaTemperatureArrowDown /><p>Temp Min</p></div> 
            <p>{weather[2]}</p>
                  </div>
                  <hr className="line"/>         
        </div>
      </div>               
    </div>
</div>
</>
    )
  }
}

export default App