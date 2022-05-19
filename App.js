import { StyleSheet, View, ImageBackground, TextInput, Text, Image } from "react-native"
import { useState } from "react"
import { FontAwesome } from "@expo/vector-icons"
//////////////////////////////////////////////////////////
export default function App() {
  const [city, setCity] = useState("")
  const [weather, setWeather] = useState([])
  const [firstData, setFirstData] = useState([])
  const [secondtData, setSecondData] = useState([])

  const apiKey = "017a37052fe5ae8904d95badf9f4770c"

  const weatherApi = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)

      const data = await response.json()

      if (city) {
        setWeather(data.weather[0])
        setFirstData(data)
        setSecondData(data.main)
      } else {
        alert("write a city in the search section")
      }
    } catch (message) {
      alert(message)
      console.log(message)
    }
  }

  let image = { uri: `https://source.unsplash.com/1600x900/?${firstData.name}` }

  return (
    <>
      <View style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <View style={styles.inputContainer}>
            <TextInput onChangeText={setCity} style={styles.textInput} placeholder="city" />

            <FontAwesome name="search" size={29} color="white" onPress={weatherApi} style={styles.icon} />
          </View>
          {city ? (
            <View style={styles.info}>
              <Image source={{ uri: `http://openweathermap.org/img/wn/${weather.icon}@2x.png` }} />
              <Text style={styles.name}>{firstData.name} </Text>
              <Text style={styles.plus}>{weather.main}</Text>
              <Text style={styles.plus}>temp: {secondtData.temp}°C</Text>
              <Text style={styles.plus}>Humidity: {secondtData.humidity}%</Text>
            </View>
          ) : null}
        </ImageBackground>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    marginTop: 0,
    width: "80%",
    borderColor: "#0B3270",
    borderWidth: 1,
    paddingLeft: 15,
    borderRadius: 25,
    height: 40,
    backgroundColor: "white",
  },
  inputContainer: {
    backgroundColor: "red",
    height: 0,
    marginBottom: 0,
    paddingBottom: 0,
    display: "flex",
    flexDirection: "row",
    // flex: 0.7,
    justifyContent: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  icon: {
    height: 35,
    borderRadius: 5,
    width: 35,
  },
  name: {
    marginTop: 30,
    fontSize: 50,
    fontWeight: "600",
    color: "#fff",
  },
  info: {
    backgroundColor: "black",
    height: 230,
    marginTop: 50,
    marginLeft: 40,
    paddingLeft: 40,
    width: 300,
    opacity: 0.8,
  },
  plus: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
  },
})
