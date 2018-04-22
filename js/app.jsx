import React from 'react';
import ReactDOM from 'react-dom';
import Moment from 'react-moment';



document.addEventListener('DOMContentLoaded', function(){


    const API_KEY = 'a10dac44841f03a4c4144cdae04e02dd';
    

    class Title extends React.Component {
        render() {
            return(
                <div>
                    <h1>Prognoza Pogody</h1>
                    <p><i>Sprawdź temperaturę i warunki pogodowe w Twoim mieście!</i></p>
                </div>
            );
        }
    };

    class Form extends React.Component {
        render() {
            return(
                <form onSubmit = {this.props.getWeather}>
                <input type="text" name = "city" placeholder = "Miasto..."/>
                <input type="text"name = "country" placeholder = "Kraj..."/>
                <button>Sprawdź Pogodę</button>
                </form>
    
            );
        }
    };

    class Weather extends React.Component {
        render() {
            return(
                <div className="weather-details">
                  {this.props.city && this.props.country && <p>Lokalizacja: {this.props.city}, {this.props.country}</p> }
                  {this.props.description && <p>Warunki: {this.props.description}</p>} 
                  {this.props.temperature && <p>Temperatura: {this.props.temperature}°C </p>}
                  {this.props.humidity && <p>Wilgotność: {this.props.humidity} %</p>}
                  {this.props.pressure && <p> Ciśnienie: {this.props.pressure} hPa</p>}
                  {this.props.wind && <p> Wiatr: {this.props.wind} km/h</p>}
                  {this.props.sunrise && <p>Wschód słońca: <Moment unix format="k:mm:ss">{this.props.sunrise}</Moment></p>} 
                  {this.props.sunset && <p>Zachód słońca: <Moment unix format= "k:mm:ss">{this.props.sunset}</Moment></p>}          
                  {this.props.error && <p>{this.props.error}</p>}
                </div>
            );
        }
    };

    

    class App extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
               
                city: undefined,
                country: undefined,
                description: undefined,
                temperature: undefined,
                humidity: undefined,
                pressure: undefined,
                wind: undefined,
                sunrise: undefined,
                sunset: undefined,
                error: undefined

            };
        }

        getWeather = async (e) => {
            e.preventDefault();
            const city = e.target.elements.city.value;
            const country = e.target.elements.country.value;
            const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&lang=pl&appid=${API_KEY}`);

            const data = await api_call.json();
            if(city && country) {
                console.log(data);
                this.setState({
                    
                    city: data.name,
                    country: data.sys.country,
                    description: data.weather[0].description,
                    temperature: data.main.temp,
                    humidity: data.main.humidity,
                    pressure: data.main.pressure,
                    wind: data.wind.speed,
                    sunrise: data.sys.sunrise,
                    sunset: data.sys.sunset,                  
                    error: ''

                });

                
            
            } else {
                this.setState({
                
                 city: undefined,
                 country: undefined,
                 description: undefined,
                 temperature: undefined,
                 humidity: undefined,
                 pressure: undefined,
                 wind: undefined,
                 sunrise: undefined,
                 sunset: undefined,
                 error: 'Wprowadź nazwę miasta i kraj!'

                });

            }
        }


        render() {
            
            return (
                <div>
                    <div className='wrapper'>
                        <div className='main'>
                            <div className='container'>
                                <div className='row'>
                                    <div className='title-container'>
                                        <Title/>
                                    </div>
                                    <div className='row-container'>
                                        <Form getWeather ={this.getWeather}/>
                                            <Weather
                                            city = {this.state.city}
                                            country = {this.state.country}
                                            description = {this.state.description}
                                            temperature = {this.state.temperature}
                                            humidity = {this.state.humidity}
                                            pressure = {this.state.pressure}
                                            wind = {this.state.wind}
                                            sunrise = {this.state.sunrise}
                                            sunset = {this.state.sunset}
                                            error = {this.state.error}
                                         />
                                    </div>
                                    </div>
                                </div>  
                            </div>  
                        </div>
                    </div>
            );
                
        }
    }

    ReactDOM.render(
        <App/>,
        document.getElementById('app')
    );
});   

