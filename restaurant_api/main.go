package main

import (
		"fmt"
		"io/ioutil"
		"net/http"
		"os"
		"github.com/joho/godotenv"
)

func main() {
		type Locations struct {
				locationName string
				lat          float64
				lon          float64
				fileName     string
		}

		locationList := []Locations{
				{"Belgrave House", 51.49503669003621, -0.14656206805342872, "assets/Belgrave_restaurants.json"},
				{"Sussex House", 50.95495279640914, -0.13450254366253722, "assets/Sussex_restaurants.json"},
				{"1 John Street", 50.823610636478065, -0.13300841299908156, "assets/John_street_restaurants.json"},
		}

		for _, location := range locationList {
				apiCallForRestaurantsByLocation(location.lat, location.lon, location.fileName)
				fmt.Printf("Successfully obtained restaurants at location %s\n", location.fileName)
		}
}

func apiCallForRestaurantsByLocation(lat, lon float64, fileName string) {
		err0 := godotenv.Load("../.env")
		if err0 != nil {
				panic(err0)
		}
		apiKey := os.Getenv("TRAVEL_ADVISOR_API_KEY")

		url := fmt.Sprintf("https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng?latitude=%f&longitude=%f&distance=1&lunit=mi", lat, lon)

		req, err := http.NewRequest("GET", url, nil)
		if err != nil {
				panic(err)
		}

		req.Header.Add("x-rapidapi-host", "travel-advisor.p.rapidapi.com")
		req.Header.Add("x-rapidapi-key", apiKey)

		res, err1 := http.DefaultClient.Do(req)
		if err1 != nil {
				panic(err1)
		}

		defer res.Body.Close()
		body, err2 := ioutil.ReadAll(res.Body)
		if err2 != nil {
				panic(err2)
		}

		err3 := ioutil.WriteFile(fileName, body, 0644)

		if err3 != nil {
				panic(err3)
		}

}